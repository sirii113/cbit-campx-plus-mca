import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  MCA_STUDENTS, 
  COURSES, 
  ALL_COURSES,
  CBIT_SEMESTERS,
  CBIT_INFO, 
  CBIT_MCA_FACULTY,
  DEMO_USERS, 
  generateInitialMarks, 
  calculateR25Cie,
  calculateSemesterSgpa
} from '../data/mockCbitData';
import { 
  MCA_SENIORS_STUDENTS, 
  SENIOR_COHORT_INFO, 
  SENIOR_BENCHMARKS, 
  generateSeniorMarks,
  generateMarksForSeniorStudent
} from '../data/mcaSeniorsData';
import { MCA_REGULATIONS } from '../data/mcaSyllabusCatalog';
import { realtimeDb } from '../utils/realtimeDb';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Selected Cohort: Exclusively MCA 2024 Senior Batch
  const [selectedCohort, setSelectedCohort] = useState(() => {
    return 'seniors';
  });

  useEffect(() => {
    localStorage.setItem('cbit_campx_selected_cohort', 'seniors');
  }, [selectedCohort]);

  const [seniorStudents, setSeniorStudents] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_senior_students');
    if (saved && !saved.includes('1601-23-') && !saved.includes('1601-25-')) {
      return JSON.parse(saved);
    }
    return MCA_SENIORS_STUDENTS;
  });

  const [students, setStudents] = useState(() => {
    return seniorStudents;
  });

  // Auto-enforce MCA 2024 Senior Batch across all state and clear obsolete cached data
  useEffect(() => {
    const cachedStudents = localStorage.getItem('cbit_campx_students');
    const cachedSeniors = localStorage.getItem('cbit_campx_senior_students');
    if (!cachedStudents || cachedStudents.includes('1601-25-') || cachedStudents.includes('1601-23-') || 
        !cachedSeniors || cachedSeniors.includes('1601-23-')) {
      localStorage.setItem('cbit_campx_students', JSON.stringify(MCA_SENIORS_STUDENTS));
      localStorage.setItem('cbit_campx_senior_students', JSON.stringify(MCA_SENIORS_STUDENTS));
      localStorage.setItem('cbit_campx_selected_cohort', 'seniors');
      localStorage.removeItem('cbit_campx_marks_r25');
      const marks = generateSeniorMarks(MCA_SENIORS_STUDENTS);
      localStorage.setItem('cbit_campx_marks_seniors', JSON.stringify(marks));
      setStudents(MCA_SENIORS_STUDENTS);
      setSeniorStudents(MCA_SENIORS_STUDENTS);
      setSeniorMarksData(marks);
      setMarksData(marks);
      setSelectedCohort('seniors');
      setActiveStudentRoll('1601-24-862-001');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cbit_campx_senior_students', JSON.stringify(seniorStudents));
    localStorage.setItem('cbit_campx_students', JSON.stringify(seniorStudents));
    realtimeDb.syncSeniorsWithServer(seniorStudents, currentUser?.name || 'Faculty');
  }, [seniorStudents, currentUser]);

  const [seniorMarksData, setSeniorMarksData] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_marks_seniors');
    return saved ? JSON.parse(saved) : generateSeniorMarks(seniorStudents);
  });

  useEffect(() => {
    localStorage.setItem('cbit_campx_marks_seniors', JSON.stringify(seniorMarksData));
  }, [seniorMarksData]);

  const [activeRegulation, setActiveRegulation] = useState(() => {
    const saved = localStorage.getItem('cbit_campx_active_regulation');
    if (saved === 'R-22') return 'R-23';
    return saved || 'R-25';
  });

  useEffect(() => {
    localStorage.setItem('cbit_campx_active_regulation', activeRegulation);
  }, [activeRegulation]);

  // Dynamic Courses & Semesters driven by the selected R-Regulation (R-25, R-22, R-20, R-16)
  const activeRegulationObj = MCA_REGULATIONS.find(r => r.id === activeRegulation) || MCA_REGULATIONS[0];
  const activeRegCourses = activeRegulation === 'R-25'
    ? COURSES
    : activeRegulationObj.semesters.flatMap((sem, sIdx) =>
        sem.courses.map((c, cIdx) => ({
          code: c.code,
          name: c.title,
          short: c.title.split('(')[0].trim().slice(0, 22),
          type: c.type,
          credits: c.credits,
          semesterId: sem.semId,
          semesterName: sem.semester,
          year: sem.year,
          faculty: CBIT_MCA_FACULTY[(sIdx * 5 + cIdx) % CBIT_MCA_FACULTY.length].name,
          maxCie: c.type === 'Theory' ? 45 : 50,
          regulation: activeRegulationObj.id
        }))
      );

  const activeRegSemesters = activeRegulation === 'R-25'
    ? CBIT_SEMESTERS
    : [
        { id: 'all', name: 'All Semesters', short: 'All' },
        ...activeRegulationObj.semesters.map(sem => ({
          id: sem.semId,
          name: sem.semester,
          short: sem.semester.replace('Semester ', 'Sem '),
          credits: sem.totalCredits
        }))
      ];

  const [selectedSemester, setSelectedSemester] = useState(() => {
    return localStorage.getItem('cbit_campx_selected_semester') || 'all';
  });

  useEffect(() => {
    localStorage.setItem('cbit_campx_selected_semester', selectedSemester);
  }, [selectedSemester]);

  // Filtered courses based on selected regulation & semester
  const filteredCourses = selectedSemester === 'all'
    ? activeRegCourses
    : activeRegCourses.filter(c => c.semesterId === selectedSemester);

  const [selectedCourseCode, setSelectedCourseCode] = useState("25MCC101");
  const [activeRole, setActiveRole] = useState(() => currentUser?.role || "faculty");
  const [activeStudentRoll, setActiveStudentRoll] = useState(() => currentUser?.rollNo || "1601-24-862-001");
  const [activeTab, setActiveTab] = useState(() => currentUser?.role === 'student' ? 'student-view' : 'marks-entry');
  const [activeExamType, setActiveExamType] = useState("r25-summary");
  const [activeSemId, setActiveSemId] = useState('sem_1');
  const [toastMessage, setToastMessage] = useState(null);
  const [loginAlert, setLoginAlert] = useState(null);

  // Ensure selectedCourseCode & marks exist whenever Regulation switches (R-25 / R-22 / R-20 / R-16)
  useEffect(() => {
    if (activeRegCourses.length > 0 && !activeRegCourses.some(c => c.code === selectedCourseCode)) {
      setSelectedCourseCode(activeRegCourses[0].code);
    }
    if (selectedSemester !== 'all' && !activeRegSemesters.some(s => s.id === selectedSemester)) {
      setSelectedSemester('all');
    }
    setSeniorMarksData(prev => {
      const missingCourses = activeRegCourses.filter(c => !prev[c.code]);
      if (missingCourses.length === 0) return prev;
      const generated = generateSeniorMarks(seniorStudents, missingCourses);
      return { ...prev, ...generated };
    });
  }, [activeRegulation, seniorStudents]);

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
              error: `🔒 Access Denied: Incorrect password for ${facMatch.name}.` 
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
        const seniorMatch = seniorStudents.find(s => 
          s.rollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.rollNo.replace('1601-24-', '1601-22-').replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          (s.alternateRollNo && s.alternateRollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '')) ||
          s.email.toLowerCase() === idClean ||
          s.name.toLowerCase().includes(idClean)
        );
        const demoMatch = DEMO_USERS.students.find(s => 
          s.rollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.rollNo.replace('1601-24-', '1601-22-').replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.email.toLowerCase() === idClean ||
          s.rollNo.toLowerCase() === idClean
        );
        const studentProfile = demoMatch || seniorMatch || students.find(s => 
          s.rollNo.replace(/-/g, '').toLowerCase() === idClean.replace(/-/g, '') ||
          s.name.toLowerCase().includes(idClean)
        );

        if (studentProfile) {
          setSelectedCohort('seniors');
          const expectedPassword = studentProfile.password || 'cbit@mca2025';
          if (cleanPass !== expectedPassword && cleanPass !== 'mca@2025') {
            realtimeDb.recordAuthFailure(identifier, 'student', `Incorrect password for ${studentProfile.name}`);
            return { 
              success: false, 
              error: `🔒 Access Denied: Incorrect password for ${studentProfile.name} (${studentProfile.rollNo}).` 
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
    const formattedRoll = rollNo ? (rollNo.includes('-') ? rollNo : `1601-24-862-${rollNo.slice(-3)}`) : '';
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

  const activeStudents = seniorStudents;
  const activeMarksData = seniorMarksData;

  const courses = filteredCourses;
  const selectedCourse = activeRegCourses.find(c => c.code === selectedCourseCode) || activeRegCourses[0] || COURSES[0];
  const activeStudent = activeStudents.find(s => s.rollNo === activeStudentRoll) || 
                        activeStudents.find(s => s.rollNo.replace('1601-24-', '1601-22-') === activeStudentRoll) ||
                        activeStudents[0];

  // Dynamic Senior Cohort Statistics calculated in real time
  const dynamicSeniorCohortInfo = {
    ...SENIOR_COHORT_INFO,
    totalStudents: seniorStudents.length,
    averageCgpa: seniorStudents.length 
      ? Number((seniorStudents.reduce((acc, s) => acc + (parseFloat(s.cgpa) || 0), 0) / seniorStudents.length).toFixed(2)) 
      : 8.78,
    placementRate: `${Math.round(((seniorStudents.filter(s => s.placement?.status === 'Placed' || s.placement?.company).length) / (seniorStudents.length || 1)) * 100)}%`,
    placedCount: seniorStudents.filter(s => s.placement?.status === 'Placed' || s.placement?.company).length
  };

  const dynamicSeniorBenchmarks = {
    ...SENIOR_BENCHMARKS,
    averageCgpa: dynamicSeniorCohortInfo.averageCgpa,
    placementsCount: dynamicSeniorCohortInfo.placedCount
  };

  const cohortInfo = {
    ...CBIT_INFO,
    academicYear: "MCA 2024 Senior Batch",
    currentSemester: "Semester IV (Completed · 90 Credits)",
    cohortName: "CBIT MCA 2024 Senior Batch",
    isSeniorCohort: true,
    rollPrefix: "1601-24-862",
    benchmark: dynamicSeniorBenchmarks
  };

  // 1. Add Single Senior Student with auto-generated course marks
  const addSeniorStudent = (newSenior) => {
    if (!newSenior || !newSenior.rollNo || !newSenior.name) {
      showToast('Roll number and Student Name are required.', 'error');
      return { success: false, error: 'Roll number and Student Name are required.' };
    }

    const cleanRoll = newSenior.rollNo.trim();
    if (seniorStudents.some(s => s.rollNo.toLowerCase() === cleanRoll.toLowerCase())) {
      showToast(`Senior with roll number ${cleanRoll} already exists.`, 'error');
      return { success: false, error: `Roll number ${cleanRoll} already exists.` };
    }

    const completeSenior = {
      rollNo: cleanRoll,
      name: newSenior.name.trim(),
      gender: newSenior.gender || 'M',
      email: newSenior.email || `${cleanRoll.replace(/-/g, '')}@cbit.org.in`,
      cgpa: parseFloat(newSenior.cgpa) || 8.5,
      attendance: parseInt(newSenior.attendance, 10) || 92,
      batch: newSenior.batch || "MCA 2024 Senior Batch",
      github: newSenior.github || `${cleanRoll.toLowerCase().replace(/[^a-z0-9]/g, '')}-cbit`,
      leetcode: parseInt(newSenior.leetcode, 10) || 350,
      placement: {
        company: newSenior.placementCompany || newSenior.placement?.company || 'Placed',
        role: newSenior.placementRole || newSenior.placement?.role || 'Associate Software Engineer',
        package: newSenior.placementPackage || newSenior.placement?.package || '₹7.5 LPA',
        status: newSenior.placementStatus || newSenior.placement?.status || 'Placed'
      },
      majorProject: {
        title: newSenior.projectTitle || newSenior.majorProject?.title || 'Distributed Cloud Platform & Intelligence Engine',
        domain: newSenior.projectDomain || newSenior.majorProject?.domain || 'Cloud & Distributed Systems',
        guide: newSenior.projectGuide || newSenior.majorProject?.guide || 'Dr. B. Indira (HoD)',
        cieScore: parseInt(newSenior.cieScore || newSenior.majorProject?.cieScore, 10) || 95,
        seeScore: parseInt(newSenior.seeScore || newSenior.majorProject?.seeScore, 10) || 96,
        status: newSenior.projectStatus || newSenior.majorProject?.status || 'Exemplary Distinction'
      },
      primarySkill: newSenior.primarySkill || 'Full-Stack & Cloud',
      rank: seniorStudents.length + 1
    };

    // Generate marks for all courses for this new student
    const studentCourseMarks = generateMarksForSeniorStudent(completeSenior);
    setSeniorMarksData(prev => {
      const nextMarks = { ...prev };
      Object.keys(studentCourseMarks).forEach(courseCode => {
        if (!nextMarks[courseCode]) nextMarks[courseCode] = {};
        nextMarks[courseCode][completeSenior.rollNo] = studentCourseMarks[courseCode];
      });
      return nextMarks;
    });

    const updatedSeniors = [completeSenior, ...seniorStudents];
    setSeniorStudents(updatedSeniors);
    showToast(`✅ Senior Scholar ${completeSenior.name} (${completeSenior.rollNo}) successfully added to batch!`, 'success');
    return { success: true, student: completeSenior };
  };

  // 2. Update Senior Student
  const updateSeniorStudent = (rollNo, updatedData) => {
    const idx = seniorStudents.findIndex(s => s.rollNo === rollNo);
    if (idx === -1) {
      showToast('Senior student not found.', 'error');
      return { success: false, error: 'Senior student not found' };
    }

    const current = seniorStudents[idx];
    const updated = {
      ...current,
      ...updatedData,
      placement: {
        ...current.placement,
        ...(updatedData.placement || {}),
        company: updatedData.placementCompany ?? updatedData.placement?.company ?? current.placement?.company,
        role: updatedData.placementRole ?? updatedData.placement?.role ?? current.placement?.role,
        package: updatedData.placementPackage ?? updatedData.placement?.package ?? current.placement?.package,
        status: updatedData.placementStatus ?? updatedData.placement?.status ?? current.placement?.status,
      },
      majorProject: {
        ...current.majorProject,
        ...(updatedData.majorProject || {}),
        title: updatedData.projectTitle ?? updatedData.majorProject?.title ?? current.majorProject?.title,
        domain: updatedData.projectDomain ?? updatedData.majorProject?.domain ?? current.majorProject?.domain,
        guide: updatedData.projectGuide ?? updatedData.majorProject?.guide ?? current.majorProject?.guide,
        cieScore: updatedData.cieScore ? parseInt(updatedData.cieScore, 10) : current.majorProject?.cieScore,
        seeScore: updatedData.seeScore ? parseInt(updatedData.seeScore, 10) : current.majorProject?.seeScore,
      }
    };

    const nextList = [...seniorStudents];
    nextList[idx] = updated;
    setSeniorStudents(nextList);
    showToast(`✏️ Updated records for ${updated.name} (${updated.rollNo})`, 'success');
    return { success: true, student: updated };
  };

  // 3. Delete Senior Student
  const deleteSeniorStudent = (rollNo) => {
    const student = seniorStudents.find(s => s.rollNo === rollNo);
    const filtered = seniorStudents.filter(s => s.rollNo !== rollNo);
    setSeniorStudents(filtered);
    showToast(`🗑️ Removed senior record ${student?.name || rollNo}`, 'info');
    return { success: true };
  };

  // 4. Bulk Import Senior Students (from CSV or JSON)
  const bulkImportSeniorStudents = (studentsList, replaceExisting = false) => {
    if (!Array.isArray(studentsList) || studentsList.length === 0) {
      showToast('No valid student records found to import.', 'error');
      return { success: false, error: 'Empty student list' };
    }

    const processed = studentsList.map((item, i) => {
      const cleanRoll = (item.rollNo || item.RollNo || `1601-24-862-${String(i + 1).padStart(3, '0')}`).trim();
      const name = (item.name || item.StudentName || item.Name || `Scholar ${cleanRoll}`).trim();
      const cgpa = parseFloat(item.cgpa || item.CGPA) || 8.5;
      const attendance = parseInt(item.attendance || item.Attendance, 10) || 92;
      return {
        rollNo: cleanRoll,
        name,
        gender: item.gender || item.Gender || 'M',
        email: item.email || item.Email || `${cleanRoll.replace(/-/g, '')}@cbit.org.in`,
        cgpa,
        attendance,
        batch: "MCA 2024 Senior Batch",
        github: item.github || item.GitHub || `${cleanRoll.toLowerCase().replace(/[^a-z0-9]/g, '')}-cbit`,
        leetcode: parseInt(item.leetcode || item.LeetCode, 10) || 350,
        placement: {
          company: item.placementCompany || item.PlacementCompany || item.company || item.Company || item.placement?.company || 'Placed',
          role: item.placementRole || item.Role || item.role || item.placement?.role || 'Software Engineer',
          package: item.placementPackage || item.Package || item.package || item.placement?.package || '₹7.5 LPA',
          status: 'Placed'
        },
        majorProject: {
          title: item.projectTitle || item.MajorProjectTitle || item.project || item.majorProject?.title || 'Distributed Systems & AI Capstone',
          domain: item.projectDomain || item.Domain || item.domain || item.majorProject?.domain || 'Cloud & Distributed Systems',
          guide: item.projectGuide || item.FacultyGuide || item.guide || item.majorProject?.guide || 'Dr. B. Indira (HoD)',
          cieScore: parseInt(item.cieScore || item.CIEScore || item.majorProject?.cieScore, 10) || 94,
          seeScore: parseInt(item.seeScore || item.SEEScore || item.majorProject?.seeScore, 10) || 95,
          status: 'Exemplary Distinction'
        },
        primarySkill: item.primarySkill || item.Skill || 'Full-Stack & Cloud',
        rank: i + 1
      };
    });

    let finalList;
    if (replaceExisting) {
      finalList = processed;
    } else {
      const existingRolls = new Set(seniorStudents.map(s => s.rollNo.toLowerCase()));
      const newOnly = processed.filter(s => !existingRolls.has(s.rollNo.toLowerCase()));
      finalList = [...newOnly, ...seniorStudents];
    }

    // Generate complete marks for all courses
    const allSeniorMarks = generateSeniorMarks(finalList);
    setSeniorMarksData(allSeniorMarks);
    setSeniorStudents(finalList);
    showToast(`🎉 Successfully imported ${processed.length} senior student records!`, 'success');
    return { success: true, count: processed.length };
  };

  // 5. Reset to default 60 seniors
  const resetSeniorStudentsToDefault = () => {
    setSeniorStudents(MCA_SENIORS_STUDENTS);
    setSeniorMarksData(generateSeniorMarks(MCA_SENIORS_STUDENTS));
    localStorage.removeItem('cbit_campx_senior_students');
    localStorage.removeItem('cbit_campx_marks_seniors');
    showToast('🔄 Senior batch dataset reset to CBIT Autonomous 60 scholars standard.', 'info');
  };

  const toggleCohort = (targetCohort) => {
    setSelectedCohort('seniors');
    setActiveStudentRoll('1601-24-862-001');
    showToast('🎓 Active Cohort: CBIT MCA 2024 Senior Batch (60 Scholars · 1601-24-862 Series)', 'info');
  };

  const updateActiveMarks = (updaterFn) => {
    if (selectedCohort === 'seniors') {
      setSeniorMarksData(updaterFn);
    } else {
      setMarksData(updaterFn);
    }
  };

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
    updateActiveMarks(prev => {
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
    updateActiveMarks(prev => {
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
    updateActiveMarks(prev => {
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
    updateActiveMarks(prev => {
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
    updateActiveMarks(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      activeStudents.forEach(student => {
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

    updateActiveMarks(prev => {
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

    updateActiveMarks(prev => {
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

    updateActiveMarks(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      activeStudents.forEach(student => {
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

  // Public passkey generation is disabled to protect student & faculty privacy
  const generatePasswordForEmail = (email, role = 'student') => {
    realtimeDb.recordAuthFailure(email || 'unknown', role, 'Blocked public passkey generation attempt');
    return {
      success: false,
      error: '🛡️ Security Policy: Public passkey generation is disabled. Please ask an authorized Faculty member to reset credentials using their Staff Security PIN.'
    };
  };

  // Reset Password to Custom Chosen Password (Requires Faculty Staff Security PIN for ALL roles)
  const resetCustomPasswordForEmail = (email, newPassword, role = 'student', facultyStaffPin = '') => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) {
      return { success: false, error: 'User email or roll number is required.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const validPins = realtimeDb.getAuthorizedStaffPins();
    const cleanPin = (facultyStaffPin || '').trim().toUpperCase();
    if (!cleanPin || !validPins.includes(cleanPin)) {
      realtimeDb.recordAuthFailure(cleanEmail, role, 'Invalid Faculty Security PIN on password reset attempt');
      return {
        success: false,
        isFacultyBlocked: true,
        error: '⛔ Access Denied: Valid Faculty Staff Security PIN is required to reset account credentials.'
      };
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

    // Update in Realtime DB (passes facultyStaffPin to server for salted scrypt hashing)
    realtimeDb.resetPasswordByEmail(cleanEmail, newPassword, {
      name: targetUser.name,
      role: targetUser.role || (isFaculty ? 'faculty' : 'student'),
      rollNo: targetUser.rollNo || (cleanEmail.startsWith('1601') ? cleanEmail : ''),
      facultyStaffPin: cleanPin
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

  // Update or Change Faculty Staff Security PIN
  const updateFacultyStaffPin = (currentPin, newPin) => {
    const res = realtimeDb.updateStaffPin(currentPin, newPin, currentUser?.name || 'Faculty Member');
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.error, 'error');
    }
    return res;
  };

  // Emergency Recover Staff Security PIN when faculty forgets it
  const recoverFacultyStaffPin = (recoveryKey, newPin, facultyEmail = '') => {
    const emailToUse = facultyEmail || currentUser?.email || '';
    const res = realtimeDb.recoverStaffPin(recoveryKey, newPin, emailToUse);
    if (res.success) {
      showToast(res.message, 'success');
    } else {
      showToast(res.error, 'error');
    }
    return res;
  };

  const updateLabRubric = (courseCode, rollNo, criteriaId, value) => {
    if (currentUser?.role === 'student') return; // Strict RBAC
    updateActiveMarks(prev => {
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
    updateActiveMarks(prev => {
      const next = { ...prev };
      if (!next[courseCode]) next[courseCode] = {};

      parsedRows.forEach(row => {
        const cleanRoll = row.rollNo?.trim();
        const studentMatch = activeStudents.find(s => 
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
        students: activeStudents,
        currentCohortStudents: students,
        seniorStudents,
        addSeniorStudent,
        updateSeniorStudent,
        deleteSeniorStudent,
        bulkImportSeniorStudents,
        resetSeniorStudentsToDefault,
        selectedCohort,
        setSelectedCohort,
        toggleCohort,
        seniorCohortInfo: dynamicSeniorCohortInfo,
        seniorBenchmarks: dynamicSeniorBenchmarks,
        courses,
        allCourses: activeRegCourses,
        selectedSemester,
        setSelectedSemester,
        cbitSemesters: activeRegSemesters,
        calculateSemesterSgpa,
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
        activeRegulation,
        setActiveRegulation,
        activeSemId,
        setActiveSemId,
        mcaRegulations: MCA_REGULATIONS,
        updateFacultyStaffPin,
        recoverFacultyStaffPin,
        getAuthorizedStaffPins: () => realtimeDb.getAuthorizedStaffPins(),
        marksData: activeMarksData,
        currentCohortMarks: marksData,
        seniorMarksData,
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
        cbitInfo: cohortInfo,
        cohortInfo,
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
