import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Real-Time Database storage directory
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbLoginsPath = path.join(dataDir, 'realtime_logins.json');
const dbUsersPath = path.join(dataDir, 'realtime_users.json');
const dbMarksPath = path.join(dataDir, 'realtime_marks.json');

if (!fs.existsSync(dbLoginsPath)) {
  fs.writeFileSync(dbLoginsPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(dbUsersPath)) {
  fs.writeFileSync(dbUsersPath, JSON.stringify([], null, 2));
}
if (!fs.existsSync(dbMarksPath)) {
  fs.writeFileSync(dbMarksPath, JSON.stringify({ meta: { lastUpdated: new Date().toISOString() }, marks: {} }, null, 2));
}

// 1. Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'CBIT CampX-Plus MCA Performance Ecosystem',
    institution: 'Chaitanya Bharathi Institute of Technology (Autonomous)',
    department: 'MCA',
    regulation: 'R-25 Autonomous Syllabus (25MCC Series)',
    realtimeDb: 'Connected (Zero-Cost Local Real-Time Storage)',
    timestamp: new Date().toISOString()
  });
});

// 2. Real-Time Database: Store Login Event
app.post('/api/realtime/login', (req, res) => {
  try {
    const loginEvent = req.body;
    let existing = [];
    if (fs.existsSync(dbLoginsPath)) {
      try {
        existing = JSON.parse(fs.readFileSync(dbLoginsPath, 'utf8'));
      } catch (err) {
        existing = [];
      }
    }
    existing.unshift({
      ...loginEvent,
      serverReceivedAt: new Date().toISOString()
    });

    const trimmed = existing.slice(0, 200);
    fs.writeFileSync(dbLoginsPath, JSON.stringify(trimmed, null, 2));

    res.json({
      success: true,
      message: 'Login successfully written to CBIT Real-Time Database',
      loginId: loginEvent.id,
      totalLoginsRecorded: trimmed.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. Real-Time Database: Store New User Account Registration
app.post('/api/realtime/register', (req, res) => {
  try {
    const newUser = req.body;
    let existingUsers = [];
    if (fs.existsSync(dbUsersPath)) {
      try {
        existingUsers = JSON.parse(fs.readFileSync(dbUsersPath, 'utf8'));
      } catch (err) {
        existingUsers = [];
      }
    }
    existingUsers.unshift({
      ...newUser,
      serverRegisteredAt: new Date().toISOString()
    });

    fs.writeFileSync(dbUsersPath, JSON.stringify(existingUsers, null, 2));

    res.json({
      success: true,
      message: 'New user account successfully accepted and registered in Real-Time Database',
      userId: newUser.id,
      totalRegistered: existingUsers.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Retrieve All Logins
app.get('/api/realtime/logins', (req, res) => {
  try {
    if (fs.existsSync(dbLoginsPath)) {
      const logs = JSON.parse(fs.readFileSync(dbLoginsPath, 'utf8'));
      return res.json({ success: true, count: logs.length, logins: logs });
    }
    res.json({ success: true, count: 0, logins: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Retrieve All Registered Users
app.get('/api/realtime/users', (req, res) => {
  try {
    if (fs.existsSync(dbUsersPath)) {
      const users = JSON.parse(fs.readFileSync(dbUsersPath, 'utf8'));
      return res.json({ success: true, count: users.length, users });
    }
    res.json({ success: true, count: 0, users: [] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Real-Time Marks Sync: Save marks updated by any faculty member
app.post('/api/realtime/marks', (req, res) => {
  try {
    const { marksData, updatedBy, facultyTitle, courseCode, updateSource } = req.body;
    const meta = {
      updatedBy: updatedBy || 'Faculty Member',
      facultyTitle: facultyTitle || 'Sir',
      courseCode: courseCode || 'R25 Course',
      updateSource: updateSource || 'Web Portal',
      serverTimestamp: new Date().toISOString()
    };

    const payload = {
      meta,
      marks: marksData || {}
    };

    fs.writeFileSync(dbMarksPath, JSON.stringify(payload, null, 2));

    res.json({
      success: true,
      message: `Marks successfully synchronized with central server by ${meta.updatedBy}`,
      meta
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 7. Real-Time Marks Sync: Retrieve current synchronized marks
app.get('/api/realtime/marks', (req, res) => {
  try {
    if (fs.existsSync(dbMarksPath)) {
      const data = JSON.parse(fs.readFileSync(dbMarksPath, 'utf8'));
      return res.json({ success: true, meta: data.meta, marks: data.marks });
    }
    res.json({ success: true, meta: { serverTimestamp: new Date().toISOString() }, marks: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 8. Password Reset / Generation via Email (Protected by Faculty Security PIN)
app.post('/api/realtime/reset-password', (req, res) => {
  try {
    const { email, generatedPassword, role, facultyStaffPin } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const isFaculty = cleanEmail.includes('cbit.ac.in') || role === 'faculty';

    if (isFaculty) {
      const authorizedPins = ['CBIT-FAC-2025', '1601-FAC', 'MCA-FAC-2025'];
      if (!facultyStaffPin || !authorizedPins.includes(facultyStaffPin.trim().toUpperCase())) {
        return res.status(403).json({
          success: false,
          error: 'Faculty Staff Security PIN is required and invalid. Unauthorized lecturer password mutation blocked.'
        });
      }
    }

    let existingUsers = [];
    if (fs.existsSync(dbUsersPath)) {
      try {
        existingUsers = JSON.parse(fs.readFileSync(dbUsersPath, 'utf8'));
      } catch (e) {
        existingUsers = [];
      }
    }

    // Update in users database or add if new user-mentioned email
    const idx = existingUsers.findIndex(u => u.email?.toLowerCase() === cleanEmail);
    if (idx !== -1) {
      existingUsers[idx].password = generatedPassword;
      existingUsers[idx].passwordResetAt = new Date().toISOString();
    } else {
      existingUsers.push({
        email: cleanEmail,
        password: generatedPassword,
        role: role || (isFaculty ? 'faculty' : 'student'),
        passwordResetAt: new Date().toISOString(),
        createdAt: new Date().toISOString()
      });
    }
    fs.writeFileSync(dbUsersPath, JSON.stringify(existingUsers, null, 2));

    res.json({
      success: true,
      message: `Security credentials updated for ${cleanEmail}`,
      email: cleanEmail
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve frontend build if available
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Resilient port listener with automatic Windows port fallback
const PORTS_TO_TRY = [
  process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  5001,
  3000,
  8080,
  8000
];

function startServer(portIndex = 0) {
  if (portIndex >= PORTS_TO_TRY.length) {
    console.error('[CBIT CampX-Plus] Failed to bind to any candidate port.');
    process.exit(1);
  }

  const candidatePort = PORTS_TO_TRY[portIndex];
  const server = app.listen(candidatePort, '0.0.0.0', () => {
    console.log(`\n==================================================`);
    console.log(`  🎓 CBIT CampX+ MCA R-25 Autonomous Portal`);
    console.log(`  🌐 Web App Active: http://localhost:${candidatePort}`);
    console.log(`  📡 Alternative URL: http://127.0.0.1:${candidatePort}`);
    console.log(`  🗄️ Real-Time DB:  ${dataDir}`);
    console.log(`==================================================\n`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE' || err.code === 'EACCES') {
      console.warn(`[Port ${candidatePort} unavailable (${err.code}). Trying port ${PORTS_TO_TRY[portIndex + 1]}...]`);
      startServer(portIndex + 1);
    } else {
      console.error('[Server Error]:', err);
    }
  });
}

startServer(0);
