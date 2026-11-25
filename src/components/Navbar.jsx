import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sounds } from '../utils/soundEffects';
import { CommandPaletteModal } from './CommandPaletteModal';
import { NotificationDrawer } from './Notifications/NotificationDrawer';
import { 
  GraduationCap, 
  BookOpen, 
  UserCheck, 
  ShieldAlert, 
  Award, 
  Sparkles, 
  RefreshCw,
  FileSpreadsheet,
  BarChart3,
  Flame,
  Search,
  Volume2,
  VolumeX,
  Clock,
  LogOut,
  User,
  Bell,
  Database,
  Zap
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currentUser,
    logout,
    courses, 
    selectedCourseCode, 
    setSelectedCourseCode, 
    selectedCourse,
    activeRole, 
    setActiveRole, 
    activeTab, 
    setActiveTab, 
    resetToSeedData,
    cbitInfo
  } = useApp();

  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeStr, setTimeStr] = useState('');

  const isStudent = currentUser?.role === 'student';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tabKey) => {
    sounds.playTick();
    setActiveTab(tabKey);
  };

  const handleRoleClick = (roleKey, defaultTab) => {
    sounds.playTick();
    setActiveRole(roleKey);
    setActiveTab(defaultTab);
  };

  const toggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-xl text-white no-print">
        {/* Top institution banner with live time & DB status */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-950 to-indigo-950 border-b border-slate-800/80 text-[11px] px-6 py-1.5 flex flex-wrap items-center justify-between text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-widest text-amber-400 font-mono">CBIT HYDERABAD</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-200 font-medium">Chaitanya Bharathi Institute of Technology (Autonomous)</span>
            <span className="hidden lg:inline text-indigo-300 font-medium">· NAAC A++ & NBA Tier-1</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[10px] bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
              <Clock className="w-3 h-3 text-indigo-400" />
              <span>Campus: {timeStr}</span>
            </div>

            {/* Real-Time Database Status Badge */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="flex items-center gap-1.5 text-[10px] bg-emerald-950/80 text-emerald-300 px-2.5 py-0.5 rounded-full border border-emerald-600/40 hover:bg-emerald-900/80 transition-colors font-mono cursor-pointer"
            >
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Real-Time DB: Live (Free)</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded text-[10px] font-mono shadow-sm">
              R-25 Autonomous
            </span>
          </div>
        </div>

        {/* Main navigation toolbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Brand identity */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400/30">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-900"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white font-sans">
                  CampX<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">+</span>
                </span>
                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-md tracking-wider shadow-sm">
                  R-25 Syllabus
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Department of Computer Applications · MCA Continuous Evaluation Cockpit</p>
            </div>
          </div>

          {/* Quick Spotlight Search Bar (Ctrl+K) */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="flex items-center gap-3 px-3 py-1.5 bg-slate-800/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 rounded-xl text-xs transition-all shadow-inner group"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400 group-hover:text-indigo-300" />
            <span className="font-medium">Search students, courses, or AI commands...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-slate-400 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* User Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {!isStudent && (
              <>
                {/* Course Selector Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCourseCode}
                    onChange={(e) => {
                      sounds.playTick();
                      setSelectedCourseCode(e.target.value);
                    }}
                    className="bg-slate-800 hover:bg-slate-750 border border-slate-700 text-slate-100 text-xs font-semibold rounded-xl pl-3 pr-8 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all cursor-pointer shadow-sm"
                  >
                    <optgroup label="── 📚 Theory Courses (45M CIE) ──" className="bg-slate-950 text-indigo-300 font-bold">
                      {courses.filter(c => c.type === 'Theory').map(course => (
                        <option key={course.code} value={course.code} className="bg-slate-900 text-white font-normal">
                          {course.code} : {course.short} (Theory)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="── 🔬 Practical Lab Courses (50M CIE) ──" className="bg-slate-950 text-emerald-300 font-bold">
                      {courses.filter(c => c.type === 'Practical').map(course => (
                        <option key={course.code} value={course.code} className="bg-slate-900 text-white font-normal">
                          {course.code} : {course.short} (Lab)
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Role Switcher */}
                <div className="bg-slate-800/90 p-1 rounded-xl border border-slate-700 flex items-center text-xs">
                  <button
                    onClick={() => handleRoleClick('faculty', 'marks-entry')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeRole === 'faculty' 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Faculty</span>
                  </button>
                  <button
                    onClick={() => handleRoleClick('student', 'student-view')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeRole === 'student' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Student 360°</span>
                  </button>
                  <button
                    onClick={() => handleRoleClick('hod', 'risk-ews')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                      activeRole === 'hod' 
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-md' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>HOD / EWS</span>
                  </button>
                </div>
              </>
            )}

            {/* Notification Bell Button with Badge */}
            <button
              onClick={() => {
                sounds.playTick();
                setIsNotifOpen(true);
              }}
              title="Notifications & Real-Time DB Stream"
              className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[9px] font-black text-white flex items-center justify-center animate-pulse">
                3
              </span>
            </button>

            {/* Sound FX Toggle Button */}
            <button
              onClick={toggleSound}
              title={isMuted ? "Enable Sound Effects" : "Mute Sound Effects"}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            </button>

            {/* User Profile Badge & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-700">
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold text-white block leading-tight flex items-center justify-end gap-1.5">
                  {currentUser?.name}
                  {currentUser?.title && (
                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded ${
                      currentUser.title === 'Mam'
                        ? 'bg-pink-950 text-pink-300 border border-pink-700/60'
                        : 'bg-blue-950 text-blue-300 border border-blue-700/60'
                    }`}>
                      {currentUser.title}
                    </span>
                  )}
                </span>
                <span className="text-[10px] font-mono text-amber-400 block uppercase truncate max-w-[180px]">
                  {currentUser?.role === 'faculty' 
                    ? (currentUser?.designation || 'Faculty Portal') 
                    : currentUser?.rollNo}
                </span>
              </div>
              <button
                onClick={logout}
                title="Logout of session"
                className="p-2 rounded-xl text-rose-400 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Navigation Tabs */}
        {!isStudent && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/80 flex items-center gap-1 overflow-x-auto py-1.5">
            <button
              onClick={() => {
                handleTabClick('marks-entry');
                if (selectedCourse?.type === 'Practical') {
                  setSelectedCourseCode('25MCC101');
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'marks-entry' && selectedCourse?.type !== 'Practical'
                  ? 'text-white bg-blue-600/30 border border-blue-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-400" />
              <span>⚡ Theory Internals (45M)</span>
            </button>

            <button
              onClick={() => {
                handleTabClick('marks-entry');
                if (selectedCourse?.type !== 'Practical') {
                  setSelectedCourseCode('25MCC111');
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'marks-entry' && selectedCourse?.type === 'Practical'
                  ? 'text-white bg-emerald-600/30 border border-emerald-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>🔬 Lab Internal Marks (50M)</span>
            </button>

            <button
              onClick={() => handleTabClick('analytics')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'analytics' 
                  ? 'text-white bg-indigo-600/30 border border-indigo-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-indigo-400" />
              <span>OBE & Bloom's Matrix</span>
            </button>

            <button
              onClick={() => handleTabClick('risk-ews')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'risk-ews' 
                  ? 'text-white bg-rose-600/30 border border-rose-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Predictive Early Risk (EWS)</span>
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            </button>

            <button
              onClick={() => handleTabClick('placement')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'placement' 
                  ? 'text-white bg-purple-600/30 border border-purple-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-purple-400" />
              <span>MCA Placement & Skill Index</span>
            </button>

            <button
              onClick={() => handleTabClick('student-view')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'student-view' 
                  ? 'text-white bg-amber-600/30 border border-amber-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Student 360° Internal Marks</span>
            </button>

            <button
              onClick={() => handleTabClick('coe-report')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === 'coe-report' 
                  ? 'text-white bg-emerald-600/30 border border-emerald-500/50 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Official R25 CoE Marksheet</span>
            </button>
          </div>
        )}
      </header>

      {/* Spotlight Command Palette Modal */}
      <CommandPaletteModal
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
      />

      {/* Real-Time Database Notification & Logins Drawer */}
      <NotificationDrawer
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />
    </>
  );
};
