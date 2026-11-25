import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { 
  BookOpen, 
  X, 
  CheckCircle2, 
  GraduationCap, 
  Award, 
  Calendar, 
  Layers, 
  Sparkles,
  FileText,
  Clock,
  ArrowRight
} from 'lucide-react';

export const McaSyllabusModal = ({ isOpen, onClose }) => {
  const { 
    mcaRegulations, 
    activeRegulation, 
    setActiveRegulation, 
    showToast 
  } = useApp();

  const [selectedRegId, setSelectedRegId] = useState(activeRegulation || 'R-25');
  const [selectedSemIdx, setSelectedSemIdx] = useState(0);

  if (!isOpen) return null;

  const currentReg = (mcaRegulations || []).find(r => r.id === selectedRegId) || mcaRegulations[0];
  const activeSemester = currentReg.semesters[selectedSemIdx] || currentReg.semesters[0];

  const handleApplyRegulation = (regId) => {
    sounds.playSuccessChime();
    setActiveRegulation(regId);
    showToast(`Academic Regulation switched to ${regId} Autonomous Syllabus across system!`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-wide">
                  CBIT MCA R-Syllabus Master Catalog
                </h2>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                  All Regulations & Years
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Chaitanya Bharathi Institute of Technology (Autonomous) · Department of Computer Applications
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Regulation Tabs */}
        <div className="px-6 py-3 bg-slate-950/90 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {(mcaRegulations || []).map(reg => {
              const isSelected = reg.id === selectedRegId;
              const isSystemActive = reg.id === activeRegulation;
              return (
                <button
                  key={reg.id}
                  onClick={() => {
                    sounds.playTick();
                    setSelectedRegId(reg.id);
                    setSelectedSemIdx(0);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' 
                      : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>{reg.name}</span>
                  {isSystemActive && (
                    <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-500/40">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {selectedRegId !== activeRegulation && (
            <button
              onClick={() => handleApplyRegulation(selectedRegId)}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-900/30"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Switch System to {selectedRegId}</span>
            </button>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Regulation Details Header Card */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-indigo-300">{currentReg.name}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400 font-mono">Course Code Prefix: {currentReg.prefix}</span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-amber-400 font-medium">Batch: {currentReg.academicBatch}</span>
              </div>
              <p className="text-xs text-slate-300">
                <span className="text-slate-400 font-medium">Duration:</span> {currentReg.duration} · Total Program Credits: <span className="font-bold text-white">{currentReg.cieScheme.totalCredits}</span>
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-[11px] space-y-1">
              <div className="text-amber-300 font-semibold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>CIE Scheme Overview:</span>
              </div>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                <strong>Theory:</strong> {currentReg.cieScheme.theory}
              </p>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                <strong>Lab:</strong> {currentReg.cieScheme.lab}
              </p>
            </div>
          </div>

          {/* Semesters / Years Navigation */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                <span>Academic Years & Semesters</span>
              </h3>
              <span className="text-xs text-slate-400">
                Total Semesters: {currentReg.semesters.length}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {currentReg.semesters.map((sem, idx) => {
                const isActive = idx === selectedSemIdx;
                return (
                  <button
                    key={sem.semId}
                    onClick={() => {
                      sounds.playTick();
                      setSelectedSemIdx(idx);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isActive 
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-950/50' 
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="text-[10px] text-indigo-400 font-mono font-bold uppercase">{sem.year}</div>
                    <div className="text-xs font-bold text-white mt-0.5">{sem.semester}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{sem.courses.length} Courses · {sem.totalCredits} Credits</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Semester Course Catalog Table */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">
                  {currentReg.shortName} · {activeSemester.year} — {activeSemester.semester} Curriculum
                </span>
              </div>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-600/30">
                Semester Total: {activeSemester.totalCredits} Credits
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800/80 font-mono text-[11px]">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Course Code</th>
                    <th className="py-2.5 px-4 font-semibold">Course Title</th>
                    <th className="py-2.5 px-4 font-semibold">Type</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Credits</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {activeSemester.courses.map(course => (
                    <tr key={course.code} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-amber-300">
                        {course.code}
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-200">
                        {course.title}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          course.type === 'Theory' 
                            ? 'bg-blue-950/80 text-blue-300 border border-blue-700/40' 
                            : course.type === 'Practical'
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/40'
                            : 'bg-purple-950/80 text-purple-300 border border-purple-700/40'
                        }`}>
                          {course.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-white">
                        {course.credits}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Current Active Regulation: <strong className="text-white font-mono">{activeRegulation}</strong></span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition"
          >
            Close Explorer
          </button>
        </div>

      </div>
    </div>
  );
};
