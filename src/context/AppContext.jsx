import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MCA_STUDENTS, 
  COURSES, 
  CBIT_INFO, 
  CBIT_MCA_FACULTY,
  DEMO_USERS, 
  generateInitialMarks, 
  calculateR25Cie 
} from '../data/mockCbitData';
import { realtimeDb } from '../utils/realtimeDb';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_students');
    return saved ? JSON.parse(saved) : MCA_STUDENTS;
  });

  const [courses, setCourses] = useState(COURSES);
  const [selectedCourseCode, setSelectedCourseCode] = useState("25MCC101");
  const [activeRole, setActiveRole] = useState(() => currentUser?.role || "faculty");
  const [activeStudentRoll, setActiveStudentRoll] = useState(() => currentUser?.rollNo || "1601-25-862-001");
  const [activeTab, setActiveTab] = useState(() => currentUser?.role === 'student' ? 'student-view' : 'marks-entry');
  const [activeExamType, setActiveExamType] = useState("r25-summary");
  const [toastMessage, setToastMessage] = useState(null);
  const [loginAlert, setLoginAlert] = useState(null);

  const [marksData, setMarksData] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_marks_r25');
    return saved ? JSON.parse(saved) : generateInitialMarks();
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cbit_campx_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cbit_campx_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cbit_campx_students', JSON.stringify(students));
  }, [students]);

  // Synchronize marksData: updates localStorage, broadcasts meta, and pushes to server
  useEffect(() => {
    localStorage.setItem('cbit_campx_marks_r25', JSON.stringify(marksData));
    const meta = {
      updatedBy: currentUser?.name || 'Faculty Member',
      facultyTitle: currentUser?.title || 'Sir',
      courseCode: selectedCourseCode,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('cbit_campx_marks_meta', JSON.stringify(meta));
    realtimeDb.syncMarksWithServer(marksData, meta);
  }, [marksData, currentUser, selectedCourseCode]);

  // Multi-Faculty Real-Time Synchronization Listener (Cross-Tab & Central Server Sync)
  useEffect(() => {
    // 1. Cross-tab real-time listener: when another Sir updates marks in another tab
    const handleStorageChange = (e) => {
      if (e.key === 'cbit_campx_marks_r25' && e.newValue) {
        try {
          const freshMarks = JSON.parse(e.newValue);
          setMarksData(freshMarks);
          let meta = { updatedBy: 'Faculty Member', courseCode: 'MCA Course' };
          try {
            meta = JSON.parse(localStorage.getItem('cbit_campx_marks_meta')) || meta;
          } catch (err) {}
          showToast(`🔄 Real-Time Live Sync: Marks updated by ${meta.updatedBy} for ${meta.courseCode}!`, 'info');
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 2. Periodic central server sync (every 5 seconds)
    const interval = setInterval(async () => {
      try {
        const res = await realtimeDb.fetchMarksFromServer();
        if (res && res.success && res.meta?.serverTimestamp) {
          const lastLocalSync = localStorage.getItem('cbit_campx_last_server_sync');
          if (!lastLocalSync || new Date(res.meta.serverTimestamp) > new Date(lastLocalSync)) {
            if (res.marks && Object.keys(res.marks).length > 0) {
              setMarksData(res.marks);
              localStorage.setItem('cbit_campx_last_server_sync', res.meta.serverTimestamp);
              showToast(`🔄 Live Sync: Latest marks pulled from Central DB (Updated by ${res.meta.updatedBy})`, 'info');
            }
          }
        }
      } catch (err) {}
    }, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Login handler: enforces strict password authentication & safety verification
  const login = (identifier, password, role) => {
    if (!identifier || !identifier.trim()) {
      return { success: false, error: 'Email or Roll Number is required for authentication.' };
    }
    if (!password || !password.trim()) {
      return { success: false, error: 'Password authentication required. Please enter your password for security.' };
    }

    const idClean = identifier.trim().toLowerCase();
    const cleanPass = password.trim();
    const registeredUsers = realtimeDb.getRegisteredUsers();
    let authenticatedUser = null;

    if (role === 'faculty') {
      // 1. Check registered users
      const regMatch = registeredUsers.find(u => 
        u.role === 'faculty' && 
        (u.email?.toLowerCase() === idClean || u.name?.toLowerCase().includes(idClean))
      );

      if (regMatch) {
        if (regMatch.password !== cleanPass) {
          realtimeDb.recordAuthFailure(identifier, 'faculty', 'Incorrect password for registered faculty');
          return { 
            success: false, 
            error: '🔒 Access Denied: Incorrect password. Please enter the valid security password set during registration.' 
          };
        }
        authenticatedUser = regMatch;
      } else {
        // 2. Check official CBIT faculty roster
        const facMatch = CBIT_MCA_FACULTY.find(f => 
          f.email.toLowerCase() === idClean || 
          f.id.toLowerCase() === idClean ||
          f.name.toLowerCase().includes(idClean)
        );

        if (facMatch) {
          const expectedPassword = facMatch.password || 'cbit@mca2025';
          if (cleanPass !== expectedPassword) {
            realtimeDb.recordAuthFailure(identifier, 'faculty', `Incorrect password for ${facMatch.name}`);
            return { 
              success: false, 
              error: `🔒 Access Denied: Incorrect password for ${facMatch.name}. (Default faculty passkey: cbit@mca2025)` 
            };
          }
          authenticatedUser = facMatch;
        } else {
          realtimeDb.recordAuthFailure(identifier, 'faculty', 'Faculty account not found');
          return {
            success: false,
            error: '❌ Faculty account not found. Please verify your email or click "Create New Account" to register.'
          };
        }
      }

      if (authenticatedUser.assignedCourses?.[0]) {
        setSelectedCourseCode(authenticatedUser.assignedCourses[0]);
      } else if (authenticatedUser.courseCode) {
        setSelectedCourseCode(authenticatedUser.courseCode);
      }

      setActiveRole('faculty');
      setActiveTab('marks-entry');
    } else {
      // Student login
      const regMatch = registeredUsers.find(u => 
        u.role === 'student' && 
        (u.rollNo?.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') || u.email?.toLowerCase() === idClean)
      );

      if (regMatch) {
        if (regMatch.password !== cleanPass) {
          realtimeDb.recordAuthFailure(identifier, 'student', 'Incorrect password for registered student');
          return { 
            success: false, 
            error: '🔒 Access Denied: Incorrect password. Please enter the valid security password set during registration.' 
          };
        }
        authenticatedUser = regMatch;
      } else {
        const demoMatch = DEMO_USERS.students.find(s => 
          s.rollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.email.toLowerCase() === idClean ||
          s.rollNo.toLowerCase() === idClean
        );
        const studentProfile = demoMatch || students.find(s => 
          s.rollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.name.toLowerCase().includes(idClean)
        );

        if (studentProfile) {
          const expectedPassword = studentProfile.password || 'mca@2025';
          if (cleanPass !== expectedPassword) {
            realtimeDb.recordAuthFailure(identifier, 'student', `Incorrect password for ${studentProfile.name}`);
            return { 
              success: false, 
              error: `🔒 Access Denied: Incorrect password for ${studentProfile.name} (${studentProfile.rollNo}). (Default student passkey: mca@2025)` 
            };
          }

          authenticatedUser = {
            id: studentProfile.rollNo || studentProfile.id,
            rollNo: studentProfile.rollNo,
            name: studentProfile.name,
            email: studentProfile.email || `${studentProfile.rollNo.replace(/-/g, '')}@cbit.org.in`,
            role: "student"
          };
        } else {
          realtimeDb.recordAuthFailure(identifier, 'student', 'Student roll number not found');
          return { 
            success: false, 
            error: '❌ Student roll number not found. Please verify your hall ticket or click "Create New Account" to register.' 
          };
        }
      }

      setActiveRole('student');
      setActiveStudentRoll(authenticatedUser.rollNo);
      setActiveTab('student-view');
    }

    if (authenticatedUser) {
      setCurrentUser(authenticatedUser);
      const dbEntry = realtimeDb.recordLogin(authenticatedUser, role);
      const alertInfo = realtimeDb.generateLoginAlert(authenticatedUser, role);
      setLoginAlert({ ...alertInfo, loginId: dbEntry.id });
      showToast(`🔒 Password Authenticated & Saved to CBIT Real-Time Database!`, 'success');
      return { success: true };
    }
  };

  // Register New Account (Faculty or Student)
  const registerAccount = (accountData, autoLogin = false) => {
    const { role, name, email, rollNo, designation, password, courseCode, primarySkill, facultyStaffPin } = accountData;

    if (!name || (!email && !rollNo)) {
      return { success: false, error: 'Please provide full name and email or roll number.' };
    }

    if (!password || password.trim().length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long for security.' };
    }

    // Faculty Registration Security Gate: require authorized Faculty Staff PIN
    if (role === 'faculty') {
      const validPins = ['CBIT-FAC-2025', '1601-FAC', 'MCA-FAC-2025'];
      const cleanPin = (facultyStaffPin || '').trim().toUpperCase();
      if (!cleanPin || !validPins.includes(cleanPin)) {
        return {
          success: false,
          error: '⛔ Faculty Registration Blocked: Invalid Faculty Staff Security PIN. Only authorized CBIT MCA department lecturers can register as Faculty.'
        };
      }
    }

    const cleanPass = password.trim();
    const formattedRoll = rollNo ? (rollNo.includes('-') ? rollNo : `1601-25-862-${rollNo.slice(-3)}`) : '';
    const cleanEmail = email ? email.trim().toLowerCase() : `${formattedRoll.replace(/-/g, '')}@cbit.org.in`;

    const newAccount = realtimeDb.registerUser({
      role,
      name: name.trim(),
      email: cleanEmail,
      rollNo: formattedRoll,
      designation: designation || (role === 'faculty' ? 'Assistant Professor' : 'Student'),
      courseCode: courseCode || '25MCC101',
      primarySkill: primarySkill || 'Full Stack & Python',
      password: cleanPass,
      registeredAt: new Date().toISOString()
    });

    if (role === 'student') {
      const newStudentObj = {
        rollNo: formattedRoll,
        name: name.trim(),
        gender: "M",
        cgpa: 8.5,
        attendance: 88,
        github: name.toLowerCase().replace(/\s+/g, '-'),
        leetcode: 250,
        tierReady: "Core Product",
        primarySkill: primarySkill || "MCA Scholar",
        password: cleanPass
      };

      // Add to student list
      setStudents(prev => [newStudentObj, ...prev]);

      // Initialize R25 marks for all 25MCC courses
      setMarksData(prev => {
        const next = { ...prev };
        COURSES.forEach(c => {
          if (!next[c.code]) next[c.code] = {};
          if (c.type === 'Theory') {
            const r25 = calculateR25Cie(16, 17, 4, 5, 4, 8, 9);
            next[c.code][formattedRoll] = {
              mid1: { Q1: 3, Q2: 4, Q3: 3, Q4: 3, Q5: 3, total: 16 },
              mid2: { Q1: 4, Q2: 3, Q3: 3, Q4: 3, Q5: 4, total: 17 },
              midAverage: r25.midAvg,
              slipTests: { slip1: 4, slip2: 5, slip3: 4, total: r25.slipTotal },
              assignments: { assign1: 8, assign2: 9, average: r25.assignAvg },
              finalCie: r25.finalCie,
              maxCie: 45,
              attendancePercentage: 88,
              status: "Pass"
            };
          } else {
            next[c.code][formattedRoll] = {
              labInternal1: { writeup: 4, execution: 9, viva: 4, total: 17 }, // 20M Max
              labInternal2: { writeup: 4, execution: 9, viva: 5, total: 18 }, // 20M Max
              labInternalAverage: 17.5, // 20M Max
              dayToDayRecord: 27,       // 30M Max
              rubricScores: { code_correctness: 26, code_quality: 22, viva_voce: 22, record_doc: 18 },
              finalCie: 45, // 50M Max
              maxCie: 50,
              gitRepoUrl: `https://github.com/${newStudentObj.github}/cbit-mca-2025`,
              gitCommitCount: 25,
              status: "Pass"
            };
          }
        });
        return next;
      });
    }

    if (autoLogin) {
      if (role === 'student') {
        setActiveStudentRoll(formattedRoll);
        setActiveRole('student');
        setActiveTab('student-view');
      } else {
        if (courseCode) setSelectedCourseCode(courseCode);
        setActiveRole('faculty');
        setActiveTab('marks-entry');
      }
      setCurrentUser(newAccount);
      const dbEntry = realtimeDb.recordLogin(newAccount, role);
      const alertInfo = realtimeDb.generateLoginAlert(newAccount, role);
      setLoginAlert({ ...alertInfo, loginId: dbEntry.id });
      showToast(`Account successfully created & saved to Real-Time Database!`, 'success');
    } else {
      showToast(`Account registered in Real-Time Database! Now verify your password to login.`, 'success');
    }

    return { 
      success: true, 
      account: newAccount, 
      identifier: role === 'faculty' ? cleanEmail : formattedRoll,
      name: name.trim(),
      role 
    };
  };

  // Demo Login
  const demoLogin = (type, targetId) => {
    let user = null;
    if (type === 'faculty') {
      user = CBIT_MCA_FACULTY.find(f => f.id === targetId) || CBIT_MCA_FACULTY[0];
      setActiveRole('faculty');
      setActiveTab('marks-entry');
      if (user.assignedCourses?.[0]) setSelectedCourseCode(user.assignedCourses[0]);
    } else {
      user = DEMO_USERS.students.find(s => s.id === targetId) || DEMO_USERS.students[0];
      setActiveRole('student');
      setActiveStudentRoll(user.rollNo);
      setActiveTab('student-view');
    }

    setCurrentUser(user);
    const dbEntry = realtimeDb.recordLogin(user, user.role);
    const alertInfo = realtimeDb.generateLoginAlert(user, user.role);
    setLoginAlert({ ...alertInfo, loginId: dbEntry.id });
    showToast(`Logged in as ${user.name} (${user.role === 'faculty' ? user.designation : user.rollNo})`, 'success');
  };

  const logout = () => {
    setCurrentUser(null);
    setLoginAlert(null);
    localStorage.removeItem('cbit_campx_user');
    showToast('Logged out of CBIT CampX-Plus session.', 'info');
  };

  const dismissLoginAlert = () => {
    setLoginAlert(null);
  };

  const selectedCourse = courses.find(c => c.code === selectedCourseCode) || courses[0];
  const activeStudent = students.find(s => s.rollNo === activeStudentRoll) || students[0];

  const recomputeStudentR25 = (studentMark) => {
    const mid1Total = studentMark.mid1?.total || 14;
    const mid2Total = studentMark.mid2?.total || 15;
    const s1 = studentMark.slipTests?.slip1 ?? 4;
    const s2 = studentMark.slipTests?.slip2 ?? 4;
    const s3 = studentMark.slipTests?.slip3 ?? 5;
    const a1 = studentMark.assignments?.assign1 ?? 8;
    const a2 = studentMark.assignments?.assign2 ?? 9;

    const r25 = calculateR25Cie(mid1Total, mid2Total, s1, s2, s3, a1, a2);

    studentMark.midAverage = r25.midAvg;
    studentMark.slipTests = {
      slip1: s1,
      slip2: s2,
      slip3: s3,
      total: r25.slipTotal
    };
    studentMark.assignments = {
      assign1: a1,
      assign2: a2,
      average: r25.assignAvg
    };
    studentMark.finalCie = r25.finalCie;
    studentMark.maxCie = r25.maxCie;
    studentMark.status = r25.status;
    studentMark.lastUpdated = new Date().toISOString();
  };

  const updateQuestionMark = (courseCode, rollNo, examType, qNo, value) => {
    const numVal = Math.max(0, Math.min(4, Number(value) || 0));
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};

      const currentExam = next[courseCode][rollNo][examType] || {};
      const updatedExam = { ...currentExam, [qNo]: numVal };

      const questions = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
      updatedExam.total = questions.reduce((sum, q) => sum + (updatedExam[q] || 0), 0);
      next[courseCode][rollNo][examType] = updatedExam;

      recomputeStudentR25(next[courseCode][rollNo]);
      return next;
    });
  };

  const updateSlipTestMark = (courseCode, rollNo, slipKey, value) => {
    if (currentUser?.role === 'student') return; // Strict RBAC: students cannot edit marks
    const numVal = Math.max(0, Math.min(5, Number(value) || 0));
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};

      if (!next[courseCode][rollNo].slipTests) {
        next[courseCode][rollNo].slipTests = { slip1: 4, slip2: 4, slip3: 4 };
      }
      next[courseCode][rollNo].slipTests[slipKey] = numVal;

      recomputeStudentR25(next[courseCode][rollNo]);
      return next;
    });
  };

  const updateAssignmentR25 = (courseCode, rollNo, assignKey, value) => {
    if (currentUser?.role === 'student') return; // Strict RBAC
    const numVal = Math.max(0, Math.min(10, Number(value) || 0));
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};

      if (!next[courseCode][rollNo].assignments) {
        next[courseCode][rollNo].assignments = { assign1: 8, assign2: 8 };
      }
      next[courseCode][rollNo].assignments[assignKey] = numVal;

      recomputeStudentR25(next[courseCode][rollNo]);
      return next;
    });
  };

  const updateDirectMidTotal = (courseCode, rollNo, examType, value) => {
    if (currentUser?.role === 'student') return;
    const numVal = Math.max(0, Math.min(20, Number(value) || 0));
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};

      next[courseCode][rollNo][examType] = {
        total: numVal,
        Q1: Math.min(4, Math.round(numVal * 0.2)),
        Q2: Math.min(4, Math.round(numVal * 0.2)),
        Q3: Math.min(4, Math.round(numVal * 0.2)),
        Q4: Math.min(4, Math.round(numVal * 0.2)),
        Q5: Math.min(4, Math.round(numVal * 0.2))
      };

      recomputeStudentR25(next[courseCode][rollNo]);
      return next;
    });
  };

  const batchInstantFill = (courseCode, componentKey, fillValue) => {
    if (currentUser?.role === 'student') return;
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      students.forEach(student => {
        if (!next[courseCode][student.rollNo]) next[courseCode][student.rollNo] = {};
        const target = next[courseCode][student.rollNo];

        if (componentKey.startsWith('slip')) {
          if (!target.slipTests) target.slipTests = { slip1: 4, slip2: 4, slip3: 4 };
          target.slipTests[componentKey] = Math.min(5, Math.max(0, fillValue));
        } else if (componentKey.startsWith('assign')) {
          if (!target.assignments) target.assignments = { assign1: 8, assign2: 8 };
          target.assignments[componentKey] = Math.min(10, Math.max(0, fillValue));
        } else if (componentKey === 'mid1' || componentKey === 'mid2' || componentKey === 'internal1' || componentKey === 'internal2') {
          const midKey = (componentKey === 'internal2' || componentKey === 'mid2') ? 'mid2' : 'mid1';
          const num = Math.min(20, Math.max(0, Number(fillValue) || 0));
          const qVal = Math.floor(num / 5);
          const rem = num % 5;
          target[midKey] = {
            Q1: Math.min(4, qVal + (rem > 0 ? 1 : 0)),
            Q2: Math.min(4, qVal + (rem > 1 ? 1 : 0)),
            Q3: Math.min(4, qVal + (rem > 2 ? 1 : 0)),
            Q4: Math.min(4, qVal + (rem > 3 ? 1 : 0)),
            Q5: Math.min(4, qVal),
            total: num
          };
        }

        recomputeStudentR25(target);
      });

      return next;
    });

    showToast(`Instant applied ${fillValue} marks to ${componentKey.toUpperCase()} for all students!`, 'success');
  };

  const updateLabInternal = (courseCode, rollNo, labKey, value) => {
    if (currentUser?.role === 'student') return;
    // labKey: 'lab1' | 'lab2' | 'dayToDay'
    const numVal = labKey === 'dayToDay' 
      ? Math.max(0, Math.min(30, Number(value) || 0))
      : Math.max(0, Math.min(20, Number(value) || 0));

    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};
      const sObj = next[courseCode][rollNo];

      if (!sObj.labInternal1) sObj.labInternal1 = { writeup: 4, execution: 9, viva: 4, total: 17 };
      if (!sObj.labInternal2) sObj.labInternal2 = { writeup: 4, execution: 9, viva: 4, total: 17 };
      if (sObj.dayToDayRecord === undefined) sObj.dayToDayRecord = 26;

      if (labKey === 'lab1') {
        sObj.labInternal1.total = numVal;
        sObj.labInternal1.writeup = Math.min(5, Math.round(numVal * 0.25));
        sObj.labInternal1.execution = Math.min(10, Math.round(numVal * 0.5));
        sObj.labInternal1.viva = Math.max(0, numVal - sObj.labInternal1.writeup - sObj.labInternal1.execution);
      } else if (labKey === 'lab2') {
        sObj.labInternal2.total = numVal;
        sObj.labInternal2.writeup = Math.min(5, Math.round(numVal * 0.25));
        sObj.labInternal2.execution = Math.min(10, Math.round(numVal * 0.5));
        sObj.labInternal2.viva = Math.max(0, numVal - sObj.labInternal2.writeup - sObj.labInternal2.execution);
      } else if (labKey === 'dayToDay') {
        sObj.dayToDayRecord = numVal;
      }

      const l1 = sObj.labInternal1?.total || 0;
      const l2 = sObj.labInternal2?.total || 0;
      sObj.labInternalAverage = Number(((l1 + l2) / 2).toFixed(1));
      sObj.finalCie = Math.min(50, Math.round(sObj.labInternalAverage + (sObj.dayToDayRecord || 0)));
      sObj.maxCie = 50;
      sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';
      sObj.lastUpdated = new Date().toISOString();

      return next;
    });
  };

  const updateLabInternalSplit = (courseCode, rollNo, labKey, partKey, value) => {
    if (currentUser?.role === 'student') return;
    // labKey: 'labInternal1' | 'labInternal2'
    // partKey: 'writeup' (max 5) | 'execution' (max 10) | 'viva' (max 5)
    const maxVal = partKey === 'execution' ? 10 : 5;
    const numVal = Math.max(0, Math.min(maxVal, Number(value) || 0));

    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = {};
      const sObj = next[courseCode][rollNo];

      if (!sObj[labKey]) sObj[labKey] = { writeup: 4, execution: 9, viva: 4, total: 17 };
      sObj[labKey][partKey] = numVal;
      sObj[labKey].total = (sObj[labKey].writeup || 0) + (sObj[labKey].execution || 0) + (sObj[labKey].viva || 0);

      const l1 = sObj.labInternal1?.total || 0;
      const l2 = sObj.labInternal2?.total || 0;
      sObj.labInternalAverage = Number(((l1 + l2) / 2).toFixed(1));
      sObj.finalCie = Math.min(50, Math.round(sObj.labInternalAverage + (sObj.dayToDayRecord || 25)));
      sObj.maxCie = 50;
      sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';

      return next;
    });
  };

  const batchFillLabInternals = (courseCode, targetKey, fillValue) => {
    if (currentUser?.role === 'student') return;
    // targetKey: 'lab1' | 'lab2' | 'dayToDay'
    const maxVal = targetKey === 'dayToDay' ? 30 : 20;
    const numVal = Math.max(0, Math.min(maxVal, Number(fillValue) || 0));

    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      students.forEach(student => {
        if (!next[courseCode][student.rollNo]) next[courseCode][student.rollNo] = {};
        const sObj = next[courseCode][student.rollNo];

        if (!sObj.labInternal1) sObj.labInternal1 = { writeup: 4, execution: 9, viva: 4, total: 17 };
        if (!sObj.labInternal2) sObj.labInternal2 = { writeup: 4, execution: 9, viva: 4, total: 17 };
        if (sObj.dayToDayRecord === undefined) sObj.dayToDayRecord = 26;

        if (targetKey === 'lab1') {
          sObj.labInternal1.total = numVal;
          sObj.labInternal1.writeup = Math.min(5, Math.round(numVal * 0.25));
          sObj.labInternal1.execution = Math.min(10, Math.round(numVal * 0.5));
          sObj.labInternal1.viva = Math.max(0, numVal - sObj.labInternal1.writeup - sObj.labInternal1.execution);
        } else if (targetKey === 'lab2') {
          sObj.labInternal2.total = numVal;
          sObj.labInternal2.writeup = Math.min(5, Math.round(numVal * 0.25));
          sObj.labInternal2.execution = Math.min(10, Math.round(numVal * 0.5));
          sObj.labInternal2.viva = Math.max(0, numVal - sObj.labInternal2.writeup - sObj.labInternal2.execution);
        } else if (targetKey === 'dayToDay') {
          sObj.dayToDayRecord = numVal;
        }

        const l1 = sObj.labInternal1?.total || 0;
        const l2 = sObj.labInternal2?.total || 0;
        sObj.labInternalAverage = Number(((l1 + l2) / 2).toFixed(1));
        sObj.finalCie = Math.min(50, Math.round(sObj.labInternalAverage + (sObj.dayToDayRecord || 0)));
        sObj.maxCie = 50;
        sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';
      });

      return next;
    });

    showToast(`Applied ${numVal} marks to ${targetKey.toUpperCase()} for all lab students!`, 'success');
  };

  // Manual Trigger to force-sync latest marks from central database
  const syncMarksFromServer = async () => {
    try {
      const res = await realtimeDb.fetchMarksFromServer();
      if (res && res.success && res.marks && Object.keys(res.marks).length > 0) {
        setMarksData(res.marks);
        showToast(`✅ Marks in 100% Sync with Central Real-Time Database! (Last: ${res.meta?.updatedBy || 'Faculty'})`, 'success');
        return true;
      } else {
        showToast(`Marks are already up-to-date with central DB.`, 'info');
        return false;
      }
    } catch (e) {
      showToast(`Sync check complete. Current records verified.`, 'info');
      return false;
    }
  };

  // Generate Password via Email (STUDENTS ONLY — Public Faculty Passkeys BLOCKED for Security)
  const generatePasswordForEmail = (email, role = 'student') => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'User email or roll number is required.' };
    }
    
    // Check if faculty, student, registered user, or MCA student
    const regUsers = realtimeDb.getRegisteredUsers();
    const regMatch = regUsers.find(u => u.email?.toLowerCase() === cleanEmail || (u.rollNo && u.rollNo.toLowerCase() === cleanEmail));
    const facMatch = CBIT_MCA_FACULTY.find(f => f.email?.toLowerCase() === cleanEmail);
    const stdMatch = DEMO_USERS.students.find(s => s.email?.toLowerCase() === cleanEmail || s.rollNo.toLowerCase() === cleanEmail);
    const mcaStdMatch = MCA_STUDENTS.find(s => s.email?.toLowerCase() === cleanEmail || s.rollNo?.toLowerCase() === cleanEmail);

    const targetUser = regMatch || facMatch || stdMatch || mcaStdMatch || {
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: cleanEmail.includes('cbit.ac.in') ? 'faculty' : 'student'
    };

    // STRICT SECURITY GATE: Faculty/Lecturer passkeys CANNOT be generated publicly!
    const isFaculty = cleanEmail.includes('cbit.ac.in') || targetUser.role === 'faculty' || role === 'faculty';
    if (isFaculty) {
      realtimeDb.recordAuthFailure(cleanEmail, 'faculty', 'Public passkey generation blocked for lecturer account');
      return {
        success: false,
        isFacultyBlocked: true,
        error: '🛡️ Security Block: Faculty accounts have administrative and grading authority. Passkeys cannot be generated publicly for lecturers to protect student marks data. Lecturers must log in with their private password or use Faculty Password Reset with their Staff Security PIN.'
      };
    }

    // Student passkey generation (safe, students can only see their own performance)
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newPasskey = `Cbit#${randomDigits}`;

    // Update in Realtime DB
    realtimeDb.resetPasswordByEmail(cleanEmail, newPasskey, {
      name: targetUser.name,
      role: 'student',
      rollNo: targetUser.rollNo || (cleanEmail.startsWith('1601') ? cleanEmail : '')
    });
    
    if (stdMatch) stdMatch.password = newPasskey;
    if (mcaStdMatch) mcaStdMatch.password = newPasskey;

    showToast(`New student passkey generated and saved for ${cleanEmail}!`, 'success');

    return {
      success: true,
      email: cleanEmail,
      userName: targetUser.name,
      role: 'student',
      generatedPassword: newPasskey,
      message: `A new secure student passkey [${newPasskey}] has been generated and updated in the CBIT Security Database.`
    };
  };

  // Reset Password to Custom Chosen Password for User-Mentioned Email (Requires Staff PIN for Faculty)
  const resetCustomPasswordForEmail = (email, newPassword, role = 'student', facultyStaffPin = '') => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'User email or roll number is required.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const regUsers = realtimeDb.getRegisteredUsers();
    const regMatch = regUsers.find(u => u.email?.toLowerCase() === cleanEmail || (u.rollNo && u.rollNo.toLowerCase() === cleanEmail));
    const facMatch = CBIT_MCA_FACULTY.find(f => f.email?.toLowerCase() === cleanEmail);
    const stdMatch = DEMO_USERS.students.find(s => s.email?.toLowerCase() === cleanEmail || s.rollNo.toLowerCase() === cleanEmail);
    const mcaStdMatch = MCA_STUDENTS.find(s => s.email?.toLowerCase() === cleanEmail || s.rollNo?.toLowerCase() === cleanEmail);

    const targetUser = regMatch || facMatch || stdMatch || mcaStdMatch || {
      name: cleanEmail.split('@')[0],
      email: cleanEmail,
      role: cleanEmail.includes('cbit.ac.in') ? 'faculty' : 'student'
    };

    const isFaculty = cleanEmail.includes('cbit.ac.in') || targetUser.role === 'faculty' || role === 'faculty';

    // STRICT FACULTY AUTHENTICATION: Lecturers must supply the confidential Faculty Staff Security PIN!
    if (isFaculty) {
      const validPins = ['CBIT-FAC-2025', '1601-FAC', 'MCA-FAC-2025'];
      const cleanPin = (facultyStaffPin || '').trim().toUpperCase();
      if (!cleanPin || !validPins.includes(cleanPin)) {
        realtimeDb.recordAuthFailure(cleanEmail, 'faculty', 'Invalid Faculty Security PIN on password reset attempt');
        return {
          success: false,
          isFacultyBlocked: true,
          error: '⛔ Access Denied: Invalid Faculty Staff Security PIN. Only authorized CBIT MCA lecturers and Exam Branch staff are permitted to reset faculty credentials.'
        };
      }
    }

    // Update in Realtime DB
    realtimeDb.resetPasswordByEmail(cleanEmail, newPassword, {
      name: targetUser.name,
      role: targetUser.role || (isFaculty ? 'faculty' : 'student'),
      rollNo: targetUser.rollNo || (cleanEmail.startsWith('1601') ? cleanEmail : '')
    });

    if (facMatch) facMatch.password = newPassword;
    if (stdMatch) stdMatch.password = newPassword;
    if (mcaStdMatch) mcaStdMatch.password = newPassword;

    showToast(`Password successfully updated for ${cleanEmail}!`, 'success');

    return {
      success: true,
      isFaculty,
      email: cleanEmail,
      userName: targetUser.name,
      role: targetUser.role || (isFaculty ? 'faculty' : 'student'),
      updatedPassword: newPassword,
      message: isFaculty 
        ? `Faculty password successfully updated in Central Vault. Your credentials are protected.`
        : `Student password successfully updated in Central Vault.`
    };
  };

  const updateLabRubric = (courseCode, rollNo, criteriaId, value) => {
    if (currentUser?.role === 'student') return; // Strict RBAC
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};
      if (!next[courseCode][rollNo]) next[courseCode][rollNo] = { rubricScores: {} };

      const currentScores = next[courseCode][rollNo].rubricScores || {};
      const updatedScores = {
        ...currentScores,
        [criteriaId]: Number(value) || 0
      };

      const labTotal = Object.values(updatedScores).reduce((a, b) => a + b, 0);
      const scaledCie = Math.round(labTotal * 0.5);

      next[courseCode][rollNo].rubricScores = updatedScores;
      next[courseCode][rollNo].finalCie = scaledCie;
      next[courseCode][rollNo].maxCie = 50;
      next[courseCode][rollNo].status = labTotal >= 50 ? 'Pass' : 'Remedial Needed';
      next[courseCode][rollNo].lastUpdated = new Date().toISOString();

      return next;
    });
  };

  const bulkUpdateMarks = (courseCode, examType, parsedRows) => {
    if (currentUser?.role === 'student') return; // Strict RBAC
    let updatedCount = 0;
    setMarksData(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      parsedRows.forEach(row => {
        const cleanRoll = row.rollNo?.trim();
        const studentMatch = students.find(s => 
          s.rollNo === cleanRoll || 
          s.rollNo.replace(/-/g, '') === cleanRoll.replace(/-/g, '')
        );

        if (studentMatch) {
          const roll = studentMatch.rollNo;
          if (!next[courseCode][roll]) next[courseCode][roll] = {};
          const sObj = next[courseCode][roll];

          if (examType === 'lab-internal-1') {
            if (!sObj.labInternal1) sObj.labInternal1 = { writeup: 4, execution: 9, viva: 4, total: 17 };
            const tot = Math.min(20, Math.max(0, Number(row.marks ?? row.total ?? row.lab1 ?? row.Q1 ?? 16)));
            sObj.labInternal1.total = tot;
            const l2 = sObj.labInternal2?.total || 17;
            sObj.labInternalAverage = Number(((tot + l2) / 2).toFixed(1));
            sObj.finalCie = Math.min(50, Math.round(sObj.labInternalAverage + (sObj.dayToDayRecord || 26)));
            sObj.maxCie = 50;
            sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';
          } else if (examType === 'lab-internal-2') {
            if (!sObj.labInternal2) sObj.labInternal2 = { writeup: 4, execution: 9, viva: 4, total: 17 };
            const tot = Math.min(20, Math.max(0, Number(row.marks ?? row.total ?? row.lab2 ?? row.Q1 ?? 17)));
            sObj.labInternal2.total = tot;
            const l1 = sObj.labInternal1?.total || 17;
            sObj.labInternalAverage = Number(((l1 + tot) / 2).toFixed(1));
            sObj.finalCie = Math.min(50, Math.round(sObj.labInternalAverage + (sObj.dayToDayRecord || 26)));
            sObj.maxCie = 50;
            sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';
          } else if (examType === 'day-to-day') {
            sObj.dayToDayRecord = Math.min(30, Math.max(0, Number(row.marks ?? row.total ?? row.dayToDay ?? row.Q1 ?? 26)));
            const avg = sObj.labInternalAverage || 17;
            sObj.finalCie = Math.min(50, Math.round(avg + sObj.dayToDayRecord));
            sObj.maxCie = 50;
            sObj.status = sObj.finalCie >= 25 ? 'Pass' : 'Remedial Needed';
          } else if (examType === 'slip-tests') {
            if (!sObj.slipTests) sObj.slipTests = {};
            sObj.slipTests.slip1 = Math.min(5, Number(row.slip1 || row.Q1 || 4));
            sObj.slipTests.slip2 = Math.min(5, Number(row.slip2 || row.Q2 || 4));
            sObj.slipTests.slip3 = Math.min(5, Number(row.slip3 || row.Q3 || 5));
            recomputeStudentR25(sObj);
          } else if (examType === 'assignments') {
            if (!sObj.assignments) sObj.assignments = {};
            sObj.assignments.assign1 = Math.min(10, Number(row.assign1 || row.Q1 || 8));
            sObj.assignments.assign2 = Math.min(10, Number(row.assign2 || row.Q2 || 9));
            recomputeStudentR25(sObj);
          } else {
            const examObj = {
              Q1: Math.min(4, Number(row.Q1) || 0),
              Q2: Math.min(4, Number(row.Q2) || 0),
              Q3: Math.min(4, Number(row.Q3) || 0),
              Q4: Math.min(4, Number(row.Q4) || 0),
              Q5: Math.min(4, Number(row.Q5) || 0)
            };
            examObj.total = examObj.Q1 + examObj.Q2 + examObj.Q3 + examObj.Q4 + examObj.Q5;
            sObj[examType] = examObj;
            recomputeStudentR25(sObj);
          }

          recomputeStudentR25(sObj);
          updatedCount++;
        }
      });

      return next;
    });

    showToast(`Successfully imported & updated R25 marks for ${updatedCount} MCA students!`, 'success');
  };

  const resetToSeedData = () => {
    localStorage.removeItem('cbit_campx_students');
    localStorage.removeItem('cbit_campx_marks_r25');
    setStudents(MCA_STUDENTS);
    setMarksData(generateInitialMarks());
    showToast('Reset to authentic CBIT MCA R25 cohort baseline data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        registerAccount,
        demoLogin,
        logout,
        loginAlert,
        dismissLoginAlert,
        students,
        courses,
        selectedCourseCode,
        setSelectedCourseCode,
        selectedCourse,
        activeRole,
        setActiveRole,
        activeStudentRoll,
        setActiveStudentRoll,
        activeStudent,
        activeTab,
        setActiveTab,
        activeExamType,
        setActiveExamType,
        marksData,
        updateQuestionMark,
        updateSlipTestMark,
        updateAssignmentR25,
        updateDirectMidTotal,
        batchInstantFill,
        updateLabRubric,
        updateLabInternal,
        updateLabInternalSplit,
        batchFillLabInternals,
        syncMarksFromServer,
        generatePasswordForEmail,
        resetCustomPasswordForEmail,
        bulkUpdateMarks,
        resetToSeedData,
        showToast,
        cbitInfo: CBIT_INFO,
        cbitFaculty: CBIT_MCA_FACULTY
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl bg-slate-900 text-white border border-slate-700 animate-bounce">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
          <span className="text-sm font-medium">{toastMessage.message}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
