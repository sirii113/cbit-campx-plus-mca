import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { sounds } from '../utils/soundEffects';
import { 
  Search, 
  User, 
  BookOpen, 
  ShieldAlert, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Command, 
  X,
  FileSpreadsheet,
  Mic,
  Award
} from 'lucide-react';

export const CommandPaletteModal = ({ isOpen, onClose }) => {
  const { 
    students, 
    courses, 
    setSelectedCourseCode, 
    setActiveStudentRoll, 
    setActiveRole, 
    setActiveTab,
    showToast 
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase();

  const matchingStudents = students.filter(s => 
    s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchingCourses = courses.filter(c => 
    c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/70 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden text-white animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a student name, roll number, course, or quick action..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none font-medium"
          />
          <kbd className="hidden sm:inline px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
            ESC
          </kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-4 text-xs">
          {/* Quick AI Filters */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
              Quick AI Navigation
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => {
                  sounds.playTick();
                  setActiveRole('hod');
                  setActiveTab('risk-ews');
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 hover:bg-rose-950/40 hover:border-rose-500/50 border border-slate-800 text-left transition-all"
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <div>
                  <span className="font-semibold text-slate-200 block">At-Risk Students</span>
                  <span className="text-[10px] text-slate-400">&lt;75% Attendance alerts</span>
                </div>
              </button>

              <button
                onClick={() => {
                  sounds.playTick();
                  setActiveTab('placement');
                  onClose();
                }}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 hover:bg-purple-950/40 hover:border-purple-500/50 border border-slate-800 text-left transition-all"
              >
                <Flame className="w-4 h-4 text-purple-400" />
                <div>
                  <span className="font-semibold text-slate-200 block">Tier-1 Coders</span>
                  <span className="text-[10px] text-slate-400">&ge; 85 PR-Score shortlist</span>
                </div>
              </button>
            </div>
          </div>

          {/* Matching Students */}
          {matchingStudents.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                Students (MCA Cohort)
              </span>
              <div className="space-y-1">
                {matchingStudents.map(student => (
                  <button
                    key={student.rollNo}
                    onClick={() => {
                      sounds.playTick();
                      setActiveStudentRoll(student.rollNo);
                      setActiveRole('student');
                      setActiveTab('student-view');
                      onClose();
                      showToast(`Viewing 360° Profile for ${student.name}`, 'info');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-indigo-600/20 hover:border-indigo-500/40 border border-transparent transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-indigo-900/60 text-indigo-300 font-bold flex items-center justify-center font-mono text-xs">
                        {student.rollNo.slice(-2)}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-100 block">{student.name}</span>
                        <span className="font-mono text-[10px] text-slate-400">{student.rollNo}{student.primarySkill ? ` · ${student.primarySkill}` : ''}</span>
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-amber-400 font-bold block">{student.cgpa} CGPA</span>
                      <span className="text-[10px] text-slate-400">{student.attendance}% Att</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Matching Courses */}
          {matchingCourses.length > 0 && (
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1.5">
                Courses & Labs
              </span>
              <div className="space-y-1">
                {matchingCourses.map(course => (
                  <button
                    key={course.code}
                    onClick={() => {
                      sounds.playTick();
                      setSelectedCourseCode(course.code);
                      setActiveRole('faculty');
                      setActiveTab('marks-entry');
                      onClose();
                      showToast(`Loaded ${course.code} : ${course.short}`, 'success');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-left transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-blue-400 shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-200 block">{course.code} · {course.name}</span>
                        <span className="text-[10px] text-slate-400">{course.faculty} · {course.type}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-blue-300 border border-slate-700">
                      Select
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
          <span>Tip: Press ESC to exit or click any item</span>
          <span className="text-indigo-400 font-bold">CBIT CampX-Plus Spotlight</span>
        </div>
      </div>
    </div>
  );
};
