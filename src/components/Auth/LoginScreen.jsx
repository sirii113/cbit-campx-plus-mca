import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { McaSyllabusModal } from '../Syllabus/McaSyllabusModal';
import { FacultyPinManagementModal } from './FacultyPinManagementModal';
import { 
  GraduationCap, 
  BookOpen,
  UserCheck, 
  User, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  KeyRound,
  Eye,
  EyeOff,
  Mail, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  Award,
  UserPlus,
  LogIn,
  Database,
  Search,
  Copy,
  Check,
  RefreshCw,
  Send,
  X,
  HelpCircle
} from 'lucide-react';

export const LoginScreen = () => {
  const { 
    login, 
    registerAccount, 
    courses, 
    cbitFaculty, 
    cbitInfo, 
    generatePasswordForEmail,
    resetCustomPasswordForEmail 
  } = useApp();
  
  // Auth mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  
  // Login State (NO DEFAULTS: initialized empty)
  const [loginRole, setLoginRole] = useState('faculty'); // 'faculty' | 'student'
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Email Password Generator & Reset State
  const [showEmailResetModal, setShowEmailResetModal] = useState(false);
  const [resetModalMode, setResetModalMode] = useState('custom'); // 'generate' (student only) | 'custom'
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [resetEmailInput, setResetEmailInput] = useState('');
  const [customNewPass, setCustomNewPass] = useState('');
  const [customConfirmPass, setCustomConfirmPass] = useState('');
  const [showCustomPass, setShowCustomPass] = useState(false);
  const [showCustomConfirmPass, setShowCustomConfirmPass] = useState(false);
  const [facultyPinInput, setFacultyPinInput] = useState('');
  const [showFacultyPin, setShowFacultyPin] = useState(false);
  const [resetResult, setResetResult] = useState(null);
  const [resetError, setResetError] = useState(null);
  const [copiedPasskey, setCopiedPasskey] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Verification prompt after creating an account
  const [createdNotice, setCreatedNotice] = useState(null);
  const [selectionNotice, setSelectionNotice] = useState(null);

  // Registration State (NO DEFAULTS: initialized empty)
  const [regRole, setRegRole] = useState('faculty'); // 'faculty' | 'student'
  const [regTitle, setRegTitle] = useState('Dr.');
  const [regHonorific, setRegHonorific] = useState('Mam'); // 'Sir' | 'Mam'
  const [regName, setRegName] = useState('');
  const [regDesignation, setRegDesignation] = useState('Assistant Professor');
  const [regEmail, setRegEmail] = useState('');
  const [regCourseCode, setRegCourseCode] = useState('25MCC101');
  const [regSpecialization, setRegSpecialization] = useState('');
  const [regFacultyPin, setRegFacultyPin] = useState('');
  const [showRegFacultyPin, setShowRegFacultyPin] = useState(false);
  const [regRollNumber, setRegRollNumber] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [regError, setRegError] = useState(null);

  // Faculty demo filter
  const [facultyFilter, setFacultyFilter] = useState('all'); // 'all' | 'sir' | 'mam'
  const [facultySearch, setFacultySearch] = useState('');

  // Email Password Generator Handlers
  const handleOpenEmailReset = (email = '') => {
    sounds.playTick();
    const target = email || loginIdentifier || '';
    setResetEmailInput(target);
    setResetResult(null);
    setResetError(null);
    setCustomNewPass('');
    setCustomConfirmPass('');
    setFacultyPinInput('');
    // If faculty, default strictly to custom reset
    const isTargetFaculty = target.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty';
    setResetModalMode(isTargetFaculty ? 'custom' : 'generate');
    setShowEmailResetModal(true);
  };

  const handleGeneratePassword = (targetEmail) => {
    const emailToUse = (targetEmail || resetEmailInput || loginIdentifier).trim();
    if (!emailToUse) {
      sounds.playAlertTone();
      setResetError('Please enter user-mentioned email in form or student roll number.');
      return;
    }

    // STRICT FACULTY PROTECTION: Block public passkey generation for lecturers!
    if (emailToUse.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty') {
      sounds.playAlertTone();
      setResetError('🛡️ Security Protection: Faculty passkeys cannot be generated publicly to protect student marks data. Lecturers must log in with their private password or use Faculty Password Reset with their confidential Staff PIN.');
      return;
    }

    setIsGenerating(true);
    setResetError(null);
    sounds.playTick();

    setTimeout(() => {
      const res = generatePasswordForEmail(emailToUse, loginRole);
      setIsGenerating(false);
      if (!res.success) {
        sounds.playAlertTone();
        setResetError(res.error);
        setResetResult(null);
      } else {
        sounds.playSuccessChime();
        setResetResult(res);
        setResetError(null);
      }
    }, 350);
  };

  const handleCustomPasswordReset = (targetEmail) => {
    const emailToUse = (targetEmail || resetEmailInput || loginIdentifier).trim();
    if (!emailToUse) {
      sounds.playAlertTone();
      setResetError('Please enter user-mentioned email in form or student roll number.');
      return;
    }
    if (!customNewPass || customNewPass.length < 6) {
      sounds.playAlertTone();
      setResetError('Password must be at least 6 characters long.');
      return;
    }
    if (customNewPass !== customConfirmPass) {
      sounds.playAlertTone();
      setResetError('Passwords do not match. Please re-type identically.');
      return;
    }

    const isFac = emailToUse.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty';
    const validStaffPins = ['CBIT-FAC-2025', '1601-FAC', 'MCA-FAC-2025'];
    if (isFac && (!facultyPinInput || !validStaffPins.includes(facultyPinInput.trim().toUpperCase()))) {
      sounds.playAlertTone();
      setResetError('⛔ Access Denied: Invalid or missing Faculty Staff Security PIN. Use authorized PIN: CBIT-FAC-2025');
      return;
    }

    setIsGenerating(true);
    setResetError(null);
    sounds.playTick();

    setTimeout(() => {
      const res = resetCustomPasswordForEmail(emailToUse, customNewPass, loginRole, facultyPinInput);
      setIsGenerating(false);
      if (!res.success) {
        sounds.playAlertTone();
        setResetError(res.error);
        setResetResult(null);
      } else {
        sounds.playSuccessChime();
        setResetResult({
          email: res.email,
          userName: res.userName,
          role: res.role,
          isFaculty: res.isFaculty,
          generatedPassword: res.updatedPassword,
          isCustom: true,
          message: res.message
        });
        setResetError(null);
      }
    }, 350);
  };

  const handleApplyGeneratedPasskey = () => {
    if (!resetResult) return;
    sounds.playSuccessChime();
    setLoginIdentifier(resetResult.email);
    if (resetResult.isFaculty) {
      // For faculty, do not expose the password in the input field!
      setLoginPassword('');
      setShowEmailResetModal(false);
      setSelectionNotice(`✅ Confidential credentials updated for Lecturer ${resetResult.userName || resetResult.email}. Please type your private password to verify and log in.`);
    } else {
      setLoginPassword(resetResult.generatedPassword);
      setShowEmailResetModal(false);
      setSelectionNotice(`Verified Student Passkey [${resetResult.generatedPassword}] loaded for ${resetResult.email}. Click 'Verify Credentials & Log In'.`);
    }
  };

  const handleQuickGenerateRegistrationPassword = () => {
    sounds.playTick();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const pass = `Cbit#${randomDigits}`;
    setRegPassword(pass);
    setRegConfirmPassword(pass);
    setShowRegPassword(true);
    setShowRegConfirmPassword(true);
    sounds.playSuccessChime();
  };

  const handleCopyPasskey = (passkey) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(passkey);
    }
    setCopiedPasskey(true);
    sounds.playTick();
    setTimeout(() => setCopiedPasskey(false), 2000);
  };

  // Password Strength Evaluator
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'Enter password', color: 'bg-slate-700', width: '5%' };
    if (pass.length < 6) return { score: 1, label: 'Too Short (Min. 6 characters)', color: 'bg-rose-500', width: '25%' };
    let score = 1;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;
    
    if (score <= 2) return { score: 2, label: 'Weak (Add numbers & mixed case)', color: 'bg-orange-500', width: '45%' };
    if (score <= 3) return { score: 3, label: 'Moderate (Good, add symbol for max safety)', color: 'bg-amber-400', width: '70%' };
    return { score: 4, label: 'Strong & Safe Passkey', color: 'bg-emerald-400', width: '100%' };
  };

  const regPassStrength = getPasswordStrength(regPassword);

  const handleLoginRoleChange = (role) => {
    sounds.playTick();
    setLoginRole(role);
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginError(null);
    setCreatedNotice(null);
    setSelectionNotice(null);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      sounds.playAlertTone();
      setLoginError(loginRole === 'faculty' ? 'Please enter your Faculty Email or ID.' : 'Please enter your CBIT Roll Number / Hall Ticket.');
      return;
    }

    if (!loginPassword || !loginPassword.trim()) {
      sounds.playAlertTone();
      setLoginError('🔒 Password authentication required. Please enter your password to verify login.');
      return;
    }

    const result = login(loginIdentifier, loginPassword, loginRole);
    if (result && !result.success) {
      sounds.playAlertTone();
      setFailedAttempts(prev => prev + 1);
      setLoginError(result.error || 'Authentication failed. Please verify credentials.');
    } else {
      sounds.playSuccessChime();
      setFailedAttempts(0);
    }
  };

  // Create Account Handler: registers in Real-Time DB and transitions to verify login
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError(null);

    // Password safety validations
    if (!regPassword || regPassword.trim().length < 6) {
      sounds.playAlertTone();
      setRegError('🔒 Password must be at least 6 characters long for security.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      sounds.playAlertTone();
      setRegError('🔒 Passwords do not match. Please verify your password confirmation.');
      return;
    }

    if (regRole === 'faculty') {
      if (!regName.trim() || !regEmail.trim()) {
        sounds.playAlertTone();
        setRegError('Please provide Faculty Name and Official CBIT Email.');
        return;
      }
      const validStaffPins = ['CBIT-FAC-2025', '1601-FAC', 'MCA-FAC-2025'];
      if (!regFacultyPin || !validStaffPins.includes(regFacultyPin.trim().toUpperCase())) {
        sounds.playAlertTone();
        setRegError('⛔ Faculty Registration Blocked: Valid Faculty Staff Security PIN required (e.g. CBIT-FAC-2025).');
        return;
      }
      const fullNameWithTitle = `${regTitle} ${regName.replace(/^(Dr\.|Sri|Smt\.|Mr\.|Prof\.)\s*/i, '')}`.trim();
      
      const payload = {
        role: 'faculty',
        name: fullNameWithTitle,
        title: regHonorific,
        designation: regDesignation,
        email: regEmail.trim().toLowerCase(),
        courseCode: regCourseCode,
        specialization: regSpecialization.trim() || 'Computer Applications',
        facultyStaffPin: regFacultyPin.trim().toUpperCase(),
        password: regPassword.trim()
      };

      // Register without autoLogin so the user verifies login with their newly created password!
      const res = registerAccount(payload, false);
      if (res && !res.success) {
        sounds.playAlertTone();
        setRegError(res.error || 'Registration failed');
      } else {
        sounds.playSuccessChime();
        // Transition to Login to verify the newly created account!
        setAuthMode('login');
        setLoginRole('faculty');
        setLoginIdentifier(res.identifier);
        setLoginPassword(''); // Leave empty so user types their password to verify!
        setCreatedNotice({
          name: fullNameWithTitle,
          identifier: res.identifier,
          role: 'faculty'
        });
        setSelectionNotice(null);
      }
    } else {
      // Student registration
      if (!regName.trim() || !regRollNumber.trim()) {
        sounds.playAlertTone();
        setRegError('Please provide Student Full Name and Hall Ticket / Roll Number.');
        return;
      }

      const formattedRoll = regRollNumber.trim();
      const payload = {
        role: 'student',
        name: regName.trim(),
        rollNo: formattedRoll,
        email: regEmail.trim() || `${formattedRoll.replace(/-/g, '')}@cbit.org.in`,
        designation: 'MCA Student',
        password: regPassword.trim()
      };

      // Register without autoLogin so the student verifies login with their newly created password!
      const res = registerAccount(payload, false);
      if (res && !res.success) {
        sounds.playAlertTone();
        setRegError(res.error || 'Registration failed');
      } else {
        sounds.playSuccessChime();
        // Transition to Login to verify the newly created account!
        setAuthMode('login');
        setLoginRole('student');
        setLoginIdentifier(res.identifier);
        setLoginPassword(''); // Leave empty so student types their password to verify!
        setCreatedNotice({
          name: regName.trim(),
          identifier: res.identifier,
          role: 'student'
        });
        setSelectionNotice(null);
      }
    }
  };

  // Select Faculty from Roster: fills only identifier, leaves password blank for verification
  const handleSelectFaculty = (faculty) => {
    sounds.playTick();
    setAuthMode('login');
    setLoginRole('faculty');
    setLoginIdentifier(faculty.email);
    setLoginPassword(''); // NO DEFAULT: user must type password to verify!
    setLoginError(null);
    setCreatedNotice(null);
    setSelectionNotice(`Selected: ${faculty.name} (${faculty.title}). Please enter your password to verify and login.`);
  };

  // Select Student from Roster: fills only identifier, leaves password blank for verification
  const handleSelectStudent = (student) => {
    sounds.playTick();
    setAuthMode('login');
    setLoginRole('student');
    setLoginIdentifier(student.rollNo);
    setLoginPassword(''); // NO DEFAULT: student must type password to verify!
    setLoginError(null);
    setCreatedNotice(null);
    setSelectionNotice(`Selected: ${student.name} (${student.rollNo}). Please enter your password to verify and login.`);
  };

  const filteredFaculty = cbitFaculty.filter(f => {
    const matchesFilter = facultyFilter === 'all' || 
      (facultyFilter === 'sir' && f.title === 'Sir') || 
      (facultyFilter === 'mam' && f.title === 'Mam');
    const matchesSearch = f.name.toLowerCase().includes(facultySearch.toLowerCase()) || 
      f.email.toLowerCase().includes(facultySearch.toLowerCase()) ||
      (f.assignedCourses && f.assignedCourses.some(c => c.toLowerCase().includes(facultySearch.toLowerCase())));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 bg-grid-cyber flex flex-col justify-between text-white relative overflow-x-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/20 via-blue-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Top institution bar */}
      <div className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 py-3 flex items-center justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight text-white flex items-center gap-2">
              CBIT CampX<span className="text-indigo-400">+</span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                R-25 Syllabus
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Department of Computer Applications (MCA) · Gandipet, Hyderabad</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-blue-300 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-700/40">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Password Verification Active</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700/40">
            <Database className="w-3 h-3" />
            <span>Free Real-Time DB</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl w-full mx-auto my-8 px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Auth Box (Login / Register) */}
          <div className="lg:col-span-7 bg-slate-900/95 backdrop-blur-2xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            
            {/* Top Switcher: Sign In vs Create New Account */}
            <div className="flex p-1 bg-slate-950 border border-slate-800 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { 
                  sounds.playTick(); 
                  setAuthMode('login'); 
                  setLoginError(null); 
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Verify & Sign In</span>
              </button>

              <button
                type="button"
                onClick={() => { 
                  sounds.playTick(); 
                  setAuthMode('register'); 
                  setRegError(null); 
                  setCreatedNotice(null);
                  setSelectionNotice(null);
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  authMode === 'register'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Create New Account</span>
              </button>
            </div>

            {/* R25 Regulation Info Badge */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-700/40 text-[11px] text-indigo-200 mb-6 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-bold text-amber-300">R-25 Autonomous MCA Evaluation Scheme:</span>
                  <span className="font-mono text-[9px] bg-indigo-900/80 text-indigo-300 px-1.5 py-0.2 rounded border border-indigo-700/60 uppercase">
                    25MCC Series
                  </span>
                </div>
                <span className="text-slate-300 leading-relaxed block">
                  3 Slip Tests (5M each = <strong>15M</strong>) + 2 Mid Exams (Average = <strong>20M</strong>) + 2 Assignments (Average = <strong>10M</strong>) → <strong className="text-emerald-400">Total CIE = 45 Marks</strong> (Min. Pass: 18M).
                </span>
                <div className="flex flex-wrap items-center gap-3 mt-2 pt-2 border-t border-indigo-800/40">
                  <button
                    type="button"
                    onClick={() => { sounds.playTick(); setIsSyllabusOpen(true); }}
                    className="text-[10px] text-amber-300 hover:text-amber-200 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3 h-3 text-amber-400" />
                    <span>📚 Browse MCA Regulations & Syllabi (R-25, R-22, R-20, R-16 All Years)</span>
                  </button>
                  <span className="text-slate-600 hidden sm:inline">·</span>
                  <button
                    type="button"
                    onClick={() => { sounds.playTick(); setIsPinModalOpen(true); }}
                    className="text-[10px] text-indigo-300 hover:text-indigo-200 font-bold underline flex items-center gap-1 cursor-pointer"
                  >
                    <KeyRound className="w-3 h-3 text-indigo-400" />
                    <span>🔑 Faculty Staff PIN Management & Recovery</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================= */}
            {/* MODE 1: SIGN IN FORM WITH PASSWORD VERIFICATION (NO DEFAULTS) */}
            {/* ========================================================= */}
            {authMode === 'login' && (
              <div>
                <div className="text-left mb-5">
                  <h2 className="text-xl font-black text-white">Academic Portal Authentication</h2>
                  <p className="text-xs text-slate-400">Enter your credentials and password to verify login into the portal.</p>
                </div>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-5">
                  <button
                    type="button"
                    onClick={() => handleLoginRoleChange('faculty')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      loginRole === 'faculty'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Faculty (Sirs & Mams)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleLoginRoleChange('student')}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      loginRole === 'student'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>MCA Student 360°</span>
                  </button>
                </div>

                {/* STEP 2 BANNER: After creating account, prompts user to enter password and verify! */}
                {createdNotice && (
                  <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/70 text-xs text-emerald-200 mb-5 animate-in fade-in">
                    <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-1">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Account Successfully Created in Real-Time DB!</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-[11px]">
                      Account for <strong>{createdNotice.name}</strong> registered with identifier <strong className="font-mono text-amber-300">{createdNotice.identifier}</strong>.
                    </p>
                    <div className="mt-2 pt-2 border-t border-emerald-800/60 font-semibold text-emerald-300 flex items-center gap-1.5 text-[11px]">
                      <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Now enter your created password below to verify and complete login:</span>
                    </div>
                  </div>
                )}

                {/* Selection notice if selected from roster */}
                {selectionNotice && !createdNotice && (
                  <div className="p-3 rounded-2xl bg-indigo-950/60 border border-indigo-500/50 text-xs text-indigo-200 mb-4 flex items-center gap-2 animate-in fade-in">
                    <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{selectionNotice}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Identifier (Email / Roll No) */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">
                      {loginRole === 'faculty' ? 'Faculty Official Email or Username:' : 'CBIT Roll Number / Hall Ticket:'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        required
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        placeholder={loginRole === 'faculty' ? 'e.g. b.indira@cbit.ac.in or newly registered email' : 'e.g. 1601-25-862-001 or newly registered roll'}
                        className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Password with Eye Toggle for Safety */}
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5">
                      Password:
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type={showLoginPassword ? "text" : "password"}
                        required
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password to verify..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-11 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300 transition-colors"
                        title={showLoginPassword ? "Hide password" : "Show password"}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* User-Mentioned Email Password Actions (Role-Protected) */}
                  {loginRole === 'faculty' ? (
                    <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-amber-400 flex items-center gap-1.5 font-bold">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                          <span>Lecturer Credentials Protected</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800">
                          Grading Guard Active
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        Faculty passkeys cannot be generated publicly to protect student marks and academic grading integrity. Lecturers must authenticate using their confidential password.
                      </p>
                      <button
                        type="button"
                        onClick={() => handleOpenEmailReset(loginIdentifier)}
                        className="w-full py-2 px-3 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/70 border border-indigo-600/50 text-[11px] font-bold text-indigo-300 flex items-center justify-center gap-2 transition-all shadow-sm"
                      >
                        <Lock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                        <span>Faculty Password Reset (Staff PIN Required)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl space-y-2">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400 flex items-center gap-1 font-medium">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Student Portal Access:</span>
                        </span>
                        {loginIdentifier ? (
                          <span className="font-mono text-purple-300 bg-purple-950/90 px-2 py-0.5 rounded border border-purple-700/60 truncate max-w-[200px]" title={loginIdentifier}>
                            {loginIdentifier}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic text-[10px]">Type roll number above</span>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            if (loginIdentifier.trim()) {
                              handleGeneratePassword(loginIdentifier.trim());
                            } else {
                              handleOpenEmailReset();
                            }
                          }}
                          className="py-1.5 px-2.5 rounded-xl bg-amber-950/50 hover:bg-amber-900/60 border border-amber-600/50 text-[11px] font-bold text-amber-300 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                          title="Generate secure student passkey for roll number in form"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>⚡ Student Passkey</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEmailReset(loginIdentifier)}
                          className="py-1.5 px-2.5 rounded-xl bg-indigo-950/50 hover:bg-indigo-900/60 border border-indigo-600/50 text-[11px] font-bold text-indigo-300 flex items-center justify-center gap-1.5 transition-all shadow-sm"
                          title="Reset custom password for student account"
                        >
                          <RefreshCw className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                          <span>🔄 Reset Password</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Security Error Notification */}
                  {loginError && (
                    <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-xs text-rose-200 flex items-start gap-2.5 animate-in shake">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-semibold text-rose-300">Authentication Failed</strong>
                        <span>{loginError}</span>
                      </div>
                    </div>
                  )}

                  {/* Consecutive Failed Attempts Warning */}
                  {failedAttempts >= 2 && (
                    <div className="p-2.5 rounded-xl bg-amber-950/50 border border-amber-600/40 text-[11px] text-amber-200 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>
                        ⚠️ <strong>{failedAttempts} consecutive failed attempts</strong> logged to CBIT Security Gateway.
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 group mt-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Verify Credentials & Log In</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            )}

            {/* ========================================================= */}
            {/* MODE 2: REGISTER NEW ACCOUNT (NO DEFAULTS) */}
            {/* ========================================================= */}
            {authMode === 'register' && (
              <div>
                <div className="text-left mb-5">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-black text-white">Create New CBIT Account</h2>
                    <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded-full font-mono flex items-center gap-1">
                      <Database className="w-2.5 h-2.5" />
                      Real-Time DB
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Register a new Faculty Member (Sir/Mam) or MCA Student. After creation, you will verify and log in.
                  </p>
                </div>

                {/* Role Switcher */}
                <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-5">
                  <button
                    type="button"
                    onClick={() => { sounds.playTick(); setRegRole('faculty'); setRegError(null); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      regRole === 'faculty'
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Register as Faculty (Sir/Mam)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => { sounds.playTick(); setRegRole('student'); setRegError(null); }}
                    className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      regRole === 'student'
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Register as MCA Student</span>
                  </button>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  {/* Faculty Specific Fields */}
                  {regRole === 'faculty' ? (
                    <>
                      {/* Title & Honorific (Sir / Mam) */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">Honorific Salutation:</label>
                          <select
                            value={regTitle}
                            onChange={(e) => setRegTitle(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Dr.">Dr.</option>
                            <option value="Sri">Sri</option>
                            <option value="Smt.">Smt.</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Prof.">Prof.</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">Addressing As (Sir/Mam):</label>
                          <div className="flex bg-slate-950 border border-slate-700 rounded-xl p-0.5">
                            <button
                              type="button"
                              onClick={() => setRegHonorific('Sir')}
                              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                regHonorific === 'Sir' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                              }`}
                            >
                              Sir
                            </button>
                            <button
                              type="button"
                              onClick={() => setRegHonorific('Mam')}
                              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                regHonorific === 'Mam' ? 'bg-pink-600 text-white' : 'text-slate-400'
                              }`}
                            >
                              Mam
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Faculty Full Name:</label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. A. Ramesh Kumar"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Designation & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">Designation:</label>
                          <select
                            value={regDesignation}
                            onChange={(e) => setRegDesignation(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-indigo-500"
                          >
                            <option value="Assistant Professor">Assistant Professor</option>
                            <option value="Associate Professor">Associate Professor</option>
                            <option value="Professor">Professor</option>
                            <option value="Head of the Department (HoD)">Head of the Department (HoD)</option>
                            <option value="Adjunct / Visiting Faculty">Adjunct / Visiting Faculty</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">CBIT Email ID:</label>
                          <input
                            type="email"
                            required
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="e.g. aramesh_mca@cbit.ac.in"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                          />
                        </div>
                      </div>

                      {/* Allocated Course (All 25MCC courses!) */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">
                          Allocated R-25 Course (25MCC Series):
                        </label>
                        <select
                          value={regCourseCode}
                          onChange={(e) => setRegCourseCode(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-indigo-300 focus:ring-2 focus:ring-indigo-500 font-mono"
                        >
                          {courses.map(course => (
                            <option key={course.code} value={course.code}>
                              {course.code} - {course.name} ({course.type})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Specialization */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Specialization / Domain:</label>
                        <input
                          type="text"
                          value={regSpecialization}
                          onChange={(e) => setRegSpecialization(e.target.value)}
                          placeholder="e.g. Generative AI, Cloud Computing, Full Stack"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Faculty Staff Security PIN (Required to prevent unauthorized faculty registration) */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-1 text-amber-300">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                            <span>Faculty Staff Security PIN:</span>
                          </span>
                          <span className="text-[9px] text-amber-400 font-mono">Official Code Required</span>
                        </label>
                        <div className="relative">
                          <input
                            type={showRegFacultyPin ? "text" : "password"}
                            required
                            value={regFacultyPin}
                            onChange={(e) => setRegFacultyPin(e.target.value)}
                            placeholder="Enter confidential Staff PIN (e.g. CBIT-FAC-2025)..."
                            className="w-full bg-slate-950 border border-amber-600/60 rounded-xl pl-3 pr-9 py-2 text-xs text-amber-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 font-mono"
                          />
                          <button
                            type="button"
                            onClick={() => setShowRegFacultyPin(!showRegFacultyPin)}
                            className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                          >
                            {showRegFacultyPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                          <span>Master Staff PIN: <code className="text-amber-300 font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/40">CBIT-FAC-2025</code></span>
                          <button
                            type="button"
                            onClick={() => setRegFacultyPin('CBIT-FAC-2025')}
                            className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1"
                          >
                            <span>⚡ Fill PIN</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    /* Student Specific Fields */
                    <>
                      {/* Student Full Name */}
                      <div>
                        <label className="text-[11px] font-bold text-slate-300 block mb-1">Student Full Name:</label>
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="e.g. K. Sai Harshith"
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>

                      {/* Roll Number & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">
                            Hall Ticket / Roll Number:
                          </label>
                          <input
                            type="text"
                            required
                            value={regRollNumber}
                            onChange={(e) => setRegRollNumber(e.target.value)}
                            placeholder="e.g. 1601-25-862-061"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-amber-300 placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-slate-300 block mb-1">Student Email:</label>
                          <input
                            type="email"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                            placeholder="e.g. 160125862061@cbit.org.in"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Password Header */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-300">Set Account Password:</span>
                    {regRole === 'student' ? (
                      <button
                        type="button"
                        onClick={handleQuickGenerateRegistrationPassword}
                        className="text-[10px] font-bold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-600/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-colors"
                        title="Auto-generate secure passkey for student account"
                      >
                        <KeyRound className="w-3 h-3 text-amber-400" />
                        <span>⚡ Auto-Generate Student Password</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-amber-400 font-mono flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Confidential Faculty Password
                      </span>
                    )}
                  </div>

                  {/* MANDATORY PASSWORD FIELDS (NO DEFAULTS) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center justify-between">
                        <span>Create Password:</span>
                        <span className="text-[9px] text-amber-400 font-mono">Min. 6 chars</span>
                      </label>
                      <div className="relative">
                        <input
                          type={showRegPassword ? "text" : "password"}
                          required
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          placeholder="Choose password..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegPassword(!showRegPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                        >
                          {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-300 block mb-1 flex items-center justify-between">
                        <span>Confirm Password:</span>
                        {regPassword && regConfirmPassword && (
                          <span className={`text-[9px] font-mono font-bold ${regPassword === regConfirmPassword ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {regPassword === regConfirmPassword ? '✓ Match' : '✗ Mismatch'}
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <input
                          type={showRegConfirmPassword ? "text" : "password"}
                          required
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          placeholder="Re-type password..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-3 pr-9 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                          className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                        >
                          {showRegConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {regPassword && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Password Safety Strength:</span>
                        <span className="font-bold text-slate-200">{regPassStrength.label}</span>
                      </div>
                      <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className={`h-full transition-all duration-300 ${regPassStrength.color}`} 
                          style={{ width: regPassStrength.width }} 
                        />
                      </div>
                    </div>
                  )}

                  {regError && (
                    <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      <span>{regError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase shadow-xl shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Create Account & Save to Real-Time DB</span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Authentic CBIT MCA Faculty Roster & Student Profiles */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Sirs & Mams Roster Card */}
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                      CBIT MCA Faculty Directory
                    </h3>
                    <p className="text-[10px] text-slate-400">All Sirs & Mams</p>
                  </div>
                </div>

                {/* Filter Sir / Mam */}
                <div className="flex bg-slate-950 border border-slate-800 rounded-lg p-0.5 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setFacultyFilter('all')}
                    className={`px-2 py-0.5 rounded ${facultyFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setFacultyFilter('sir')}
                    className={`px-2 py-0.5 rounded ${facultyFilter === 'sir' ? 'bg-blue-600 text-white' : 'text-slate-400'}`}
                  >
                    Sirs
                  </button>
                  <button
                    type="button"
                    onClick={() => setFacultyFilter('mam')}
                    className={`px-2 py-0.5 rounded ${facultyFilter === 'mam' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
                  >
                    Mams
                  </button>
                </div>
              </div>

              {/* Search faculty */}
              <div className="relative mb-2">
                <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-2" />
                <input
                  type="text"
                  value={facultySearch}
                  onChange={(e) => setFacultySearch(e.target.value)}
                  placeholder="Search faculty by name or course..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-8 pr-3 py-1.5 text-[11px] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Scrollable list of all authentic CBIT MCA Sirs and Mams */}
              <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredFaculty.map(faculty => (
                  <div
                    key={faculty.id}
                    className="p-2.5 rounded-2xl bg-slate-950/80 hover:bg-indigo-950/40 border border-slate-800/80 hover:border-indigo-500/50 transition-all flex items-center justify-between"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                          faculty.title === 'Mam' 
                            ? 'bg-pink-950/80 text-pink-300 border border-pink-700/50' 
                            : 'bg-blue-950/80 text-blue-300 border border-blue-700/50'
                        }`}>
                          {faculty.title}
                        </span>
                        <span className="font-bold text-xs text-white truncate">
                          {faculty.name}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate mt-0.5">
                        {faculty.designation}
                      </div>
                      <div className="text-[9px] font-mono text-indigo-400/90 truncate mt-0.5">
                        {faculty.email}
                      </div>
                    </div>

                    <div className="shrink-0 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleSelectFaculty(faculty)}
                        title="Select this faculty to enter credentials and verify login"
                        className="px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/50 text-[10px] font-bold text-indigo-300 transition-colors flex items-center gap-1"
                      >
                        <span>Select</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MCA Student Directory Card */}
            <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800 rounded-3xl p-5 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center font-bold">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                    MCA Student Registry
                  </h3>
                  <p className="text-[10px] text-slate-400">R-25 Autonomous Batch</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-amber-300 truncate">Sai Praneeth (001)</div>
                    <div className="text-[10px] text-slate-400 font-mono">1601-25-862-001</div>
                    <div className="text-[9px] text-slate-500 font-sans truncate">Current 2025-27 Batch</div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEmailReset('160125862001@cbit.org.in')}
                      title="Generate passkey via student email"
                      className="p-1 rounded-lg bg-slate-900 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-500 text-indigo-400"
                    >
                      <KeyRound className="w-3 h-3 text-amber-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectStudent({ rollNo: '1601-25-862-001', name: 'A. Sai Praneeth' })}
                      className="flex-1 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-[10px] font-bold flex items-center justify-center gap-1"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-rose-400 truncate">Vigneshwar (009)</div>
                    <div className="text-[10px] text-slate-400 font-mono">1601-25-862-009</div>
                    <div className="text-[9px] text-slate-500 font-sans truncate">Current 2025-27 Batch</div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEmailReset('160125862009@cbit.org.in')}
                      title="Generate passkey via student email"
                      className="p-1 rounded-lg bg-slate-900 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-500 text-indigo-400"
                    >
                      <KeyRound className="w-3 h-3 text-amber-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelectStudent({ rollNo: '1601-25-862-009', name: 'K. Vigneshwar' })}
                      className="flex-1 py-1 rounded-lg bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-[10px] font-bold flex items-center justify-center gap-1"
                    >
                      <span>Select</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>

                <div className="p-2.5 rounded-2xl bg-purple-950/40 border border-purple-800/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-[9px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.2 rounded font-mono">Senior</span>
                      <div className="text-xs font-bold text-amber-300 truncate">Venkata Sai (001)</div>
                    </div>
                    <div className="text-[10px] text-purple-300/80 font-mono">1601-23-862-001</div>
                    <div className="text-[9px] text-emerald-400 font-sans truncate">Oracle · ₹16.0 LPA</div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      type="button"
                      onClick={() => handleSelectStudent({ rollNo: '1601-23-862-001', name: 'K. Venkata Sai' })}
                      className="flex-1 py-1 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 border border-purple-700 text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Select Senior</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* How to test Callout */}
            <div className="p-4 rounded-3xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block text-[11px]">How to Verify Create & Login:</span>
                <span className="text-[10px] leading-relaxed block text-slate-400 mt-0.5">
                  1. Click <strong>Create New Account</strong> above to register with your custom password.<br/>
                  2. Upon creation, the system confirms database storage and guides you to <strong>Verify & Sign In</strong> with your exact password!
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* MODAL: EMAIL PASSKEY GENERATOR & SECURITY DISPATCH       */}
      {/* ========================================================= */}
      {showEmailResetModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowEmailResetModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  CBIT Password Security Gateway
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700/50 px-2 py-0.5 rounded-full font-mono">
                    Real-Time DB
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Reset or Generate Password for User-Mentioned Mail in Form</p>
              </div>
            </div>

            {/* User-Mentioned Mail indicator from form */}
            {loginIdentifier && (
              <div className="mb-4 bg-indigo-950/70 border border-indigo-700/60 p-2.5 rounded-2xl flex items-center justify-between">
                <div className="text-xs text-indigo-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>
                    Form User Email: <strong className="text-white font-mono">{loginIdentifier}</strong>
                  </span>
                </div>
                {resetEmailInput !== loginIdentifier && (
                  <button
                    type="button"
                    onClick={() => setResetEmailInput(loginIdentifier)}
                    className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-2 py-1 rounded-lg transition-colors"
                  >
                    Load in Field
                  </button>
                )}
              </div>
            )}

            {/* Security Notice for Faculty vs Student */}
            {(resetEmailInput.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty') ? (
              <div className="mb-4 p-3.5 rounded-2xl bg-amber-950/70 border border-amber-600/60 text-xs text-amber-200 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block font-bold text-amber-300">Lecturer Credentials Protection Active</strong>
                  <span className="leading-relaxed text-[11px] text-slate-300">
                    Faculty passkeys cannot be generated publicly to protect grading integrity and student marks data. To set or reset a lecturer's password, you must verify with the confidential Faculty Staff Security PIN.
                  </span>
                </div>
              </div>
            ) : (
              /* Tab Switcher for Student: Passkey vs Custom Reset */
              <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-4">
                <button
                  type="button"
                  onClick={() => { sounds.playTick(); setResetModalMode('generate'); setResetError(null); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    resetModalMode === 'generate'
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>⚡ Student Passkey</span>
                </button>

                <button
                  type="button"
                  onClick={() => { sounds.playTick(); setResetModalMode('custom'); setResetError(null); }}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    resetModalMode === 'custom'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>🔄 Reset Password</span>
                </button>
              </div>
            )}

            {/* Email input field */}
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  {(resetEmailInput.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty')
                    ? 'Faculty Official Email ID (@cbit.ac.in):'
                    : 'Student Roll Number / Email:'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={resetEmailInput}
                    onChange={(e) => setResetEmailInput(e.target.value)}
                    placeholder={
                      (loginRole === 'faculty') 
                        ? "e.g. b.indira@cbit.ac.in" 
                        : "e.g. 1601-25-862-001 or student email"
                    }
                    className="w-full bg-slate-950 border border-slate-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                </div>
              </div>

              {/* Faculty Staff Security PIN Requirement */}
              {(resetEmailInput.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty') && (
                <div>
                  <label className="text-xs font-bold text-amber-300 block mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                      <span>Faculty Staff Security PIN:</span>
                    </span>
                    <span className="text-[10px] text-amber-400 font-mono">Confidential Code</span>
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                    <input
                      type={showFacultyPin ? "text" : "password"}
                      value={facultyPinInput}
                      onChange={(e) => setFacultyPinInput(e.target.value)}
                      placeholder="Enter confidential Faculty PIN (e.g. CBIT-FAC-2025)..."
                      className="w-full bg-slate-950 border border-amber-600/60 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-amber-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowFacultyPin(!showFacultyPin)}
                      className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
                    >
                      {showFacultyPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 mt-1.5">
                    <span>Department Staff PIN: <code className="text-amber-300 font-mono font-bold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-600/40">CBIT-FAC-2025</code></span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setFacultyPinInput('CBIT-FAC-2025')}
                        className="text-[10px] text-amber-400 hover:text-amber-300 underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>⚡ Auto-Fill PIN</span>
                      </button>
                      <span className="text-slate-600">·</span>
                      <button
                        type="button"
                        onClick={() => { sounds.playTick(); setIsPinModalOpen(true); }}
                        className="text-[10px] text-rose-400 hover:text-rose-300 underline font-semibold flex items-center gap-1 cursor-pointer"
                      >
                        <span>🆘 Forgot / Edit PIN?</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom Password Inputs */}
              {(resetModalMode === 'custom' || resetEmailInput.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty') && (
                <div className="space-y-3 bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                      <span>Type New Password:</span>
                      <span className="text-[10px] text-amber-400 font-mono">Min. 6 chars</span>
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type={showCustomPass ? "text" : "password"}
                        value={customNewPass}
                        onChange={(e) => setCustomNewPass(e.target.value)}
                        placeholder="Enter your new chosen password..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustomPass(!showCustomPass)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showCustomPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                      <span>Confirm New Password:</span>
                      {customNewPass && customConfirmPass && (
                        <span className={`text-[10px] font-mono font-bold ${customNewPass === customConfirmPass ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {customNewPass === customConfirmPass ? '✓ Matching' : '✗ Do not match'}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <input
                        type={showCustomConfirmPass ? "text" : "password"}
                        value={customConfirmPass}
                        onChange={(e) => setCustomConfirmPass(e.target.value)}
                        placeholder="Re-enter your new password..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-10 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCustomConfirmPass(!showCustomConfirmPass)}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showCustomConfirmPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {resetError && (
                <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-500/50 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{resetError}</span>
                </div>
              )}

              {/* Action Buttons */}
              {(resetModalMode === 'generate' && !resetEmailInput.toLowerCase().includes('cbit.ac.in') && loginRole !== 'faculty') ? (
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleGeneratePassword()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Generating Student Passkey...</span>
                    </>
                  ) : (
                    <>
                      <KeyRound className="w-4 h-4" />
                      <span>⚡ Generate Student Passkey</span>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={() => handleCustomPasswordReset()}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Verifying & Updating in Central Vault...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>
                        {(resetEmailInput.toLowerCase().includes('cbit.ac.in') || loginRole === 'faculty')
                          ? '🔒 Verify Staff PIN & Update Faculty Password'
                          : '🔄 Reset & Save Password'}
                      </span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Output Card after generation or reset */}
            {resetResult && (
              <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/60 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-300">
                      {resetResult.isFaculty 
                        ? 'Faculty Password Successfully Secured' 
                        : (resetResult.isCustom ? 'Password Successfully Reset' : 'Student Passkey Generated')}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-900/60 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-700/50">
                    Real-Time DB Synced
                  </span>
                </div>

                <div className="text-xs text-slate-300">
                  Account: <strong className="text-white font-mono">{resetResult.email}</strong> {resetResult.userName && `(${resetResult.userName})`}
                </div>

                {resetResult.isFaculty ? (
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-600/40 text-xs text-emerald-300 space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Lecturer Confidential Password Protected</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Your password has been securely updated in the CBIT Central Vault. For grading and security compliance, credentials are not exposed on screen. Please proceed to verify and sign in.
                    </p>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-950 rounded-xl border border-emerald-600/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">
                        {resetResult.isCustom ? 'Your Updated Password' : 'Your Student Passkey'}
                      </span>
                      <span className="font-mono text-lg font-black text-amber-300 tracking-wider">
                        {resetResult.generatedPassword}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyPasskey(resetResult.generatedPassword)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedPasskey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleApplyGeneratedPasskey}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>
                    {resetResult.isFaculty 
                      ? 'Proceed to Faculty Sign In' 
                      : 'Use Password & Verify Sign In Now'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-slate-800/80 bg-slate-950/80 py-3 px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono z-10 gap-2">
        <span>Chaitanya Bharathi Institute of Technology (Autonomous) · Gandipet, Hyderabad - 500075</span>
        <span className="text-indigo-400 flex items-center gap-1">
          <Lock className="w-3 h-3 text-amber-400" />
          Strict Password Verification Active · R-25 Syllabus
        </span>
      </div>

      {/* MCA R-Syllabus Master Explorer Modal */}
      <McaSyllabusModal
        isOpen={isSyllabusOpen}
        onClose={() => setIsSyllabusOpen(false)}
      />

      {/* Faculty Staff Security PIN Management & Recovery Modal */}
      <FacultyPinManagementModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
      />
    </div>
  );
};