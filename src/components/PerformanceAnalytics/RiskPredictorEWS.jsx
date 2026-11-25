import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { computeStudentRisk } from '../../utils/calculations';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Send, 
  UserX, 
  Mail, 
  FileText, 
  Sparkles,
  ChevronRight,
  Filter
} from 'lucide-react';

export const RiskPredictorEWS = () => {
  const { students, marksData, selectedCourseCode, selectedCourse, showToast } = useApp();
  const [filterTier, setFilterTier] = useState('all'); // 'all' | 'critical' | 'moderate' | 'safe'
  const [selectedActionStudent, setSelectedActionStudent] = useState(null);
  const [actionType, setActionType] = useState('remedial'); // 'remedial' | 'parent' | 'mentor'

  // Compute risk profile for every MCA student
  const studentRisks = students.map(student => {
    const risk = computeStudentRisk(student, marksData, selectedCourseCode);
    return {
      student,
      risk
    };
  });

  const criticalList = studentRisks.filter(s => s.risk.tier === 'Critical Risk');
  const moderateList = studentRisks.filter(s => s.risk.tier === 'Moderate Risk');
  const safeList = studentRisks.filter(s => s.risk.tier === 'Safe');

  const filtered = studentRisks.filter(s => {
    if (filterTier === 'critical') return s.risk.tier === 'Critical Risk';
    if (filterTier === 'moderate') return s.risk.tier === 'Moderate Risk';
    if (filterTier === 'safe') return s.risk.tier === 'Safe';
    return true;
  });

  const handleTriggerAction = (student, action) => {
    setSelectedActionStudent(student);
    setActionType(action);
  };

  const handleConfirmAction = () => {
    showToast(`Dispatched official ${actionType.toUpperCase()} action for ${selectedActionStudent.name}`, 'success');
    setSelectedActionStudent(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 shadow-lg border border-rose-900/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-rose-600/40 text-rose-300 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border border-rose-500/30">
                Predictive Risk Analytics (EWS)
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-amber-400/30">
                Detention & Backlog Prevention
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Early Warning & Remediation Intelligence System
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Continuous multi-factor analysis of Attendance (&lt;75%), CIE Trajectory & Mid-exam variance for {selectedCourse.code}.
            </p>
          </div>

          {/* Metric Badges */}
          <div className="flex items-center gap-2.5">
            <div className="bg-rose-500/10 border border-rose-500/30 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-rose-300 uppercase block font-semibold">Critical Risk</span>
              <span className="text-2xl font-black text-rose-400 font-mono">{criticalList.length}</span>
              <span className="text-[9px] text-slate-400">Detention/Fail</span>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-amber-300 uppercase block font-semibold">Moderate</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{moderateList.length}</span>
              <span className="text-[9px] text-slate-400">Watchlist</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-2 rounded-xl text-center">
              <span className="text-[10px] text-emerald-300 uppercase block font-semibold">Safe</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{safeList.length}</span>
              <span className="text-[9px] text-slate-400">On Track</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterTier('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterTier === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Students ({studentRisks.length})
          </button>
          <button
            onClick={() => setFilterTier('critical')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all flex items-center gap-1.5 ${
              filterTier === 'critical' ? 'bg-rose-600 text-white' : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Critical Detention Danger ({criticalList.length})</span>
          </button>
          <button
            onClick={() => setFilterTier('moderate')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterTier === 'moderate' ? 'bg-amber-600 text-white' : 'text-amber-700 hover:bg-amber-50'
            }`}
          >
            Moderate Attention ({moderateList.length})
          </button>
          <button
            onClick={() => setFilterTier('safe')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterTier === 'safe' ? 'bg-emerald-600 text-white' : 'text-emerald-700 hover:bg-emerald-50'
            }`}
          >
            Safe ({safeList.length})
          </button>
        </div>
        <span className="text-slate-500 text-[11px]">
          Target: Zero backlogs in MCA Semester End Examinations (SEE)
        </span>
      </div>

      {/* Student Risk Cards / Table */}
      <div className="space-y-3">
        {filtered.map(({ student, risk }) => (
          <div
            key={student.rollNo}
            className={`bg-white rounded-2xl p-5 border transition-all shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              risk.tier === 'Critical Risk' 
                ? 'border-rose-300 bg-rose-50/20' 
                : risk.tier === 'Moderate Risk'
                ? 'border-amber-200'
                : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Student Bio & Indicators */}
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700">{student.rollNo}</span>
                <span className="font-bold text-slate-900 text-sm">{student.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${risk.badgeColor}`}>
                  {risk.tier}
                </span>
              </div>

              {/* Identified Risk Factors */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {risk.riskReasons.map((reason, idx) => (
                  <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                    {reason}
                  </span>
                ))}
                {risk.riskReasons.length === 0 && (
                  <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Attendance & CIE metrics within safe autonomous margins
                  </span>
                )}
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="flex items-center gap-6 font-mono text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-sans block">Attendance</span>
                <span className={`text-base font-bold ${
                  student.attendance < 75 ? 'text-rose-600' : 'text-slate-800'
                }`}>
                  {student.attendance}%
                </span>
                <span className="text-[9px] text-slate-400 font-sans block">
                  {student.attendance < 75 ? 'Detention Risk' : 'Eligible'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-sans block">CIE Internal</span>
                <span className={`text-base font-bold ${
                  risk.ciePercentage < 40 ? 'text-rose-600' : 'text-slate-800'
                }`}>
                  {risk.ciePercentage}%
                </span>
                <span className="text-[9px] text-slate-400 font-sans block">
                  {risk.ciePercentage < 40 ? 'Backlog Risk' : 'Passing'}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 font-sans block">Risk Index</span>
                <span className="text-base font-bold text-slate-900">
                  {risk.riskScore}/100
                </span>
                <span className="text-[9px] text-slate-400 font-sans block">Heuristic</span>
              </div>
            </div>

            {/* Action Buttons for Faculty/HOD */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleTriggerAction(student, 'remedial')}
                className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold border border-blue-200 transition-colors"
              >
                Assign Remedial Class
              </button>
              <button
                onClick={() => handleTriggerAction(student, 'parent')}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-semibold border border-rose-200 transition-colors"
              >
                Parent Notice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Confirmation Modal */}
      {selectedActionStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">
                  Confirm Official Intervention Dispatch
                </h3>
                <p className="text-xs text-slate-500">CBIT Department of Computer Applications (MCA)</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div>
                <span className="text-slate-500 block">Target Student:</span>
                <strong className="text-slate-900 font-bold">{selectedActionStudent.name} ({selectedActionStudent.rollNo})</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Course Code:</span>
                <strong className="text-slate-900">{selectedCourse.code} · {selectedCourse.name}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Proposed Action:</span>
                <span className="font-semibold text-rose-700 uppercase">
                  {actionType === 'remedial' ? '30-Day Mandatory Remedial Lecture & Lab Retest' : 'Official Attendance Shortage Notice to Guardian'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedActionStudent(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold shadow-md shadow-rose-600/20"
              >
                Confirm & Dispatch
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
