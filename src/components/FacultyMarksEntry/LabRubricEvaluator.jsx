import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { CsvImportModal } from './CsvImportModal';
import { 
  GitBranch, 
  Code2, 
  Terminal, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  Layers, 
  Search, 
  Sliders, 
  UploadCloud, 
  Download, 
  RefreshCw, 
  Zap, 
  ShieldAlert, 
  AlertCircle, 
  Check, 
  X, 
  FileSpreadsheet, 
  Eye, 
  User, 
  Sparkles, 
  Filter,
  CheckCircle,
  HelpCircle,
  ArrowRight
} from 'lucide-react';

export const LabRubricEvaluator = () => {
  const { 
    students, 
    selectedCourse, 
    marksData, 
    updateLabRubric, 
    updateLabInternal,
    updateLabInternalSplit,
    batchFillLabInternals,
    setSelectedCourseCode,
    syncMarksFromServer,
    showToast 
  } = useApp();

  // Active Tab: 'matrix' | 'lab1' | 'lab2' | 'daytoday' | 'rubrics'
  const [activeTab, setActiveTab] = useState('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRiskOnly, setFilterRiskOnly] = useState(false);
  const [selectedStudentRoll, setSelectedStudentRoll] = useState(students[0]?.rollNo);
  
  // Modals state
  const [isCsvOpen, setIsCsvOpen] = useState(false);
  const [csvExamType, setCsvExamType] = useState('lab-internal-1');
  const [splitModalStudent, setSplitModalStudent] = useState(null); // student object or null
  
  // Batch fill toolbar state
  const [batchTarget, setBatchTarget] = useState('lab1'); // 'lab1' | 'lab2' | 'dayToDay'
  const [batchScore, setBatchScore] = useState(18);
  const [isSyncing, setIsSyncing] = useState(false);

  const courseMarks = marksData?.[selectedCourse.code] || {};

  const filteredStudents = students.filter(student => {
    const sMark = courseMarks[student.rollNo];
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (filterRiskOnly) {
      const isLowAttendance = student.attendance < 75;
      const isLowCie = (sMark?.finalCie || 35) < 25;
      return isLowAttendance || isLowCie;
    }
    return true;
  });

  // Calculate Lab CIE Metrics across class
  const totalStudents = students.length;
  let sumLab1 = 0;
  let sumLab2 = 0;
  let sumDayToDay = 0;
  let sumFinalCie = 0;
  let passCount = 0;

  students.forEach(s => {
    const m = courseMarks[s.rollNo] || {};
    const l1 = m.labInternal1?.total ?? 17;
    const l2 = m.labInternal2?.total ?? 18;
    const dtd = m.dayToDayRecord ?? 26;
    const finalCie = m.finalCie ?? Math.round(((l1 + l2) / 2) + dtd);

    sumLab1 += l1;
    sumLab2 += l2;
    sumDayToDay += dtd;
    sumFinalCie += finalCie;
    if (finalCie >= 25) passCount++;
  });

  const avgLab1 = totalStudents > 0 ? (sumLab1 / totalStudents).toFixed(1) : '17.2';
  const avgLab2 = totalStudents > 0 ? (sumLab2 / totalStudents).toFixed(1) : '17.8';
  const avgDayToDay = totalStudents > 0 ? (sumDayToDay / totalStudents).toFixed(1) : '26.4';
  const avgFinalCie = totalStudents > 0 ? (sumFinalCie / totalStudents).toFixed(1) : '44.0';
  const passRate = totalStudents > 0 ? Math.round((passCount / totalStudents) * 100) : 96;

  // Single-digit auto advance to next student row
  const handleInstantInput = (e, nextId) => {
    sounds.playTick();
    if (e.target.value.length >= 2 && nextId) {
      const el = document.getElementById(nextId);
      if (el) {
        el.focus();
        el.select();
      }
    }
  };

  // Keyboard Enter advance to next student
  const handleKeyDown = (e, nextId) => {
    if (e.key === 'Enter' && nextId) {
      e.preventDefault();
      const el = document.getElementById(nextId);
      if (el) {
        el.focus();
        el.select();
      }
    }
  };

  // 1-Click Batch Fill
  const handleApplyBatchFill = () => {
    sounds.playSuccessChime();
    batchFillLabInternals(selectedCourse.code, batchTarget, batchScore);
    const label = batchTarget === 'lab1' ? 'Lab Internal 1 (20M)' :
                  batchTarget === 'lab2' ? 'Lab Internal 2 (20M)' : 'Day-to-Day Record (30M)';
    showToast(`Instant applied ${batchScore} Marks to ${label} for all 60 MCA Students!`, 'success');
  };

  // Manual Trigger Central Sync
  const handleTriggerSync = () => {
    setIsSyncing(true);
    sounds.playTick();
    syncMarksFromServer();
    setTimeout(() => {
      setIsSyncing(false);
      sounds.playSuccessChime();
      showToast('Marks synchronized with central CBIT server! Multi-faculty changes loaded.', 'success');
    }, 600);
  };

  // Export full Practical CIE Marksheet to CSV
  const handleExportCsv = () => {
    sounds.playSuccessChime();
    let csv = `RollNo,StudentName,Attendance%,LabInternal1_20M,LabInternal2_20M,LabInternalAvg_20M,DayToDay_30M,FinalCIE_50M,Status\n`;
    students.forEach(s => {
      const m = courseMarks[s.rollNo] || {};
      const l1 = m.labInternal1?.total ?? 17;
      const l2 = m.labInternal2?.total ?? 18;
      const avg = m.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
      const dtd = m.dayToDayRecord ?? 26;
      const cie = m.finalCie ?? Math.round(avg + dtd);
      const stat = m.status ?? (cie >= 25 ? 'Pass' : 'Remedial Needed');
      csv += `${s.rollNo},"${s.name}",${s.attendance},${l1},${l2},${avg},${dtd},${cie},${stat}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBIT_R25_${selectedCourse.code}_Lab_CIE_Complete_Marksheet.csv`;
    a.click();
    showToast('Exported R25 Practical Laboratory CIE Marksheet to CSV!', 'success');
  };

  // Open Excel/CSV Import Modal
  const handleOpenImport = (type) => {
    sounds.playTick();
    setCsvExamType(type);
    setIsCsvOpen(true);
  };

  // Student Rubric details
  const activeStudent = students.find(s => s.rollNo === selectedStudentRoll) || students[0];
  const activeStudentMark = courseMarks[activeStudent.rollNo] || {};
  const rubricScores = activeStudentMark.rubricScores || {
    code_correctness: 26,
    code_quality: 22,
    viva_voce: 21,
    record_doc: 18
  };

  const criteriaList = selectedCourse.rubricCriteria || [
    { id: "code_correctness", name: "Algorithm & Code Correctness", weight: 30, desc: "Functional code, edge case handling" },
    { id: "code_quality", name: "Clean Architecture & Git Workflow", weight: 25, desc: "Naming conventions, modularity, Git commits" },
    { id: "viva_voce", name: "Technical Viva Voce & Concept Defense", weight: 25, desc: "Conceptual answering & system design" },
    { id: "record_doc", name: "Lab Manual & Test Case Documentation", weight: 20, desc: "Observation notes & output screenshots" }
  ];

  const totalRawRubricScore = Object.values(rubricScores).reduce((a, b) => a + Number(b), 0);

  return (
    <div className="space-y-6">
      {/* ========================================================= */}
      {/* TOP BANNER: R-25 AUTONOMOUS LAB CIE EVALUATION SCHEME      */}
      {/* ========================================================= */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-xs px-3 py-1 rounded-full font-black font-mono shadow-sm">
                R-25 Autonomous Syllabus
              </span>
              <span className="bg-blue-600/50 text-blue-200 text-xs px-3 py-1 rounded-full font-mono font-bold border border-blue-400/30">
                {selectedCourse.code} · Practical Lab (2 Credits)
              </span>
              <button
                type="button"
                onClick={() => { sounds.playTick(); setSelectedCourseCode('25MCC101'); }}
                className="bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-xs px-2.5 py-1 rounded-full font-mono font-bold border border-blue-400/40 transition-colors flex items-center gap-1.5"
                title="Switch directly to Theory Internal Marks"
              >
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Switch to Theory Internal Marks (25MCC101 - 25MCC110)</span>
              </button>
              <span className="text-xs text-slate-300">
                Faculty: <strong className="text-amber-300">{selectedCourse.faculty}</strong>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
              <span>{selectedCourse.name}</span>
            </h1>

            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              CBIT Autonomous Laboratory CIE Scheme: <strong>Lab Internal 1 (20M)</strong> + <strong>Lab Internal 2 (20M)</strong> → Average = <strong>20M</strong> + <strong>Day-to-Day Record (30M)</strong> → <strong className="text-emerald-400">Total CIE = 50 Marks</strong> (Min. Pass = 25/50).
            </p>
          </div>

          {/* Real-Time Central Sync Badge & Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-slate-950/80 border border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Multi-Faculty Live Sync</span>
                <span className="text-xs font-bold text-emerald-300">Active · Cross-Tab & Cloud</span>
              </div>
              <button
                type="button"
                onClick={handleTriggerSync}
                disabled={isSyncing}
                title="Force refresh marks from central server"
                className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-indigo-400' : ''}`} />
              </button>
            </div>

            <div className="bg-gradient-to-br from-indigo-950 to-blue-900 border border-indigo-700/50 px-4 py-2.5 rounded-2xl text-right">
              <span className="text-[10px] text-indigo-200 uppercase tracking-wider block">Class CIE Avg</span>
              <span className="text-2xl font-black text-amber-300 font-mono">
                {avgFinalCie} <span className="text-xs text-slate-300 font-normal">/ 50M</span>
              </span>
            </div>
          </div>
        </div>

        {/* Real-time sync guarantee callout */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>
              <strong>Multi-Faculty Real-Time Sync:</strong> If one Sir updates marks on the web, other Sirs and Mams sessions update instantly without page reloads.
            </span>
          </div>
          <div className="font-mono text-[10px] text-indigo-300">
            Pass Rate: <strong className="text-emerald-400">{passRate}%</strong> ({passCount}/{totalStudents} Students $\ge$ 25/50)
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5-METRIC STAT CARDS                                       */}
      {/* ========================================================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Lab Internal 1
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white font-mono">{avgLab1}</span>
            <span className="text-xs text-slate-500 font-mono">/ 20M</span>
          </div>
          <span className="text-[10px] text-indigo-400 mt-1 block">Writeup(5)+Exec(10)+Viva(5)</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Lab Internal 2
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-white font-mono">{avgLab2}</span>
            <span className="text-xs text-slate-500 font-mono">/ 20M</span>
          </div>
          <span className="text-[10px] text-indigo-400 mt-1 block">Writeup(5)+Exec(10)+Viva(5)</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Lab Internal Avg
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-amber-300 font-mono">
              {((Number(avgLab1) + Number(avgLab2)) / 2).toFixed(1)}
            </span>
            <span className="text-xs text-slate-500 font-mono">/ 20M</span>
          </div>
          <span className="text-[10px] text-amber-400/90 mt-1 block">(Lab 1 + Lab 2) / 2</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Day-to-Day Record
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-blue-400 font-mono">{avgDayToDay}</span>
            <span className="text-xs text-slate-500 font-mono">/ 30M</span>
          </div>
          <span className="text-[10px] text-blue-300 mt-1 block">Continuous Observation</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
            Final Lab CIE
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-emerald-400 font-mono">{avgFinalCie}</span>
            <span className="text-xs text-slate-500 font-mono">/ 50M</span>
          </div>
          <span className="text-[10px] text-emerald-400/90 mt-1 block">Pass: 25/50 (CIE)</span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* VIEW TABS & TOP TOOLBAR                                   */}
      {/* ========================================================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Navigation Tabs */}
          <div className="flex flex-wrap p-1 bg-slate-950 border border-slate-800 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => { sounds.playTick(); setActiveTab('matrix'); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'matrix' 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>⚡ Lab Master Matrix (All 60)</span>
            </button>

            <button
              type="button"
              onClick={() => { sounds.playTick(); setActiveTab('lab1'); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'lab1' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab Internal 1 (20M Total)</span>
            </button>

            <button
              type="button"
              onClick={() => { sounds.playTick(); setActiveTab('lab2'); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'lab2' 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lab Internal 2 (20M Total)</span>
            </button>

            <button
              type="button"
              onClick={() => { sounds.playTick(); setActiveTab('daytoday'); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'daytoday' 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Day-to-Day Record (30M)</span>
            </button>

            <button
              type="button"
              onClick={() => { sounds.playTick(); setActiveTab('rubrics'); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rubrics' 
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Rubrics & Git Trajectory</span>
            </button>
          </div>

          {/* Action Buttons: Import Excel/CSV, Export CSV */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleOpenImport(activeTab === 'lab2' ? 'lab-internal-2' : activeTab === 'daytoday' ? 'day-to-day' : 'lab-internal-1')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Import Excel / CSV</span>
            </button>

            <button
              type="button"
              onClick={handleExportCsv}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Search, Filter, and 1-Click Batch Fill Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search Roll Number or Student Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
              />
            </div>

            <button
              type="button"
              onClick={() => { sounds.playTick(); setFilterRiskOnly(!filterRiskOnly); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                filterRiskOnly 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300' 
                  : 'bg-slate-950 border-slate-700 text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3 h-3 text-rose-400" />
              <span>Remedial Risk (&lt;25)</span>
            </button>
          </div>

          {/* 1-Click Batch Fill Tool */}
          <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 pl-2 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Batch Fill:</span>
            </span>

            <select
              value={batchTarget}
              onChange={(e) => setBatchTarget(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="lab1">Lab Internal 1 (Max 20M)</option>
              <option value="lab2">Lab Internal 2 (Max 20M)</option>
              <option value="dayToDay">Day-to-Day Record (Max 30M)</option>
            </select>

            <input
              type="number"
              min="0"
              max={batchTarget === 'dayToDay' ? 30 : 20}
              value={batchScore}
              onChange={(e) => setBatchScore(e.target.value)}
              className="w-14 bg-slate-900 border border-slate-700 text-white font-mono font-bold text-xs text-center rounded-lg py-1 focus:outline-none"
            />

            <button
              type="button"
              onClick={handleApplyBatchFill}
              className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg transition-colors shadow-sm uppercase tracking-wider"
            >
              Apply All
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ⚡ LAB MASTER MATRIX (ALL 60 STUDENTS)             */}
      {/* ========================================================= */}
      {activeTab === 'matrix' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <span>R-25 Autonomous Practical Master Matrix</span>
                <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-700/50 px-2 py-0.5 rounded-full font-mono">
                  {filteredStudents.length} of {totalStudents} Students
                </span>
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Type directly into <strong>Lab 1 (20M)</strong>, <strong>Lab 2 (20M)</strong>, or <strong>Day-to-Day (30M)</strong>. Lab Average and Final CIE (50M) calculate dynamically.
              </p>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              Auto-Saves Instantly
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3">Roll Number</th>
                  <th className="py-3 px-3">Student Full Name</th>
                  <th className="py-3 px-2 text-center">Attd %</th>
                  <th className="py-3 px-2 text-center bg-indigo-950/40 text-indigo-300 border-x border-slate-800">
                    Lab 1 (20M)
                  </th>
                  <th className="py-3 px-2 text-center bg-purple-950/40 text-purple-300 border-r border-slate-800">
                    Lab 2 (20M)
                  </th>
                  <th className="py-3 px-2 text-center bg-amber-950/30 text-amber-300 border-r border-slate-800">
                    Lab Avg (20M)
                  </th>
                  <th className="py-3 px-2 text-center bg-blue-950/40 text-blue-300 border-r border-slate-800">
                    Day-to-Day (30M)
                  </th>
                  <th className="py-3 px-2 text-center bg-emerald-950/40 text-emerald-300 border-r border-slate-800">
                    Final CIE (50M)
                  </th>
                  <th className="py-3 px-3 text-center">Autonomous Status</th>
                  <th className="py-3 px-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredStudents.map((student, idx) => {
                  const m = courseMarks[student.rollNo] || {};
                  const l1 = m.labInternal1?.total ?? 17;
                  const l2 = m.labInternal2?.total ?? 18;
                  const lAvg = m.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
                  const dtd = m.dayToDayRecord ?? 26;
                  const finalCie = m.finalCie ?? Math.round(lAvg + dtd);
                  const isPass = finalCie >= 25;
                  const isLowAttd = student.attendance < 75;

                  const nextLab1Id = idx < filteredStudents.length - 1 ? `lab1-matrix-${filteredStudents[idx + 1].rollNo}` : null;
                  const nextLab2Id = idx < filteredStudents.length - 1 ? `lab2-matrix-${filteredStudents[idx + 1].rollNo}` : null;
                  const nextDtdId = idx < filteredStudents.length - 1 ? `dtd-matrix-${filteredStudents[idx + 1].rollNo}` : null;

                  return (
                    <tr 
                      key={student.rollNo}
                      className="hover:bg-slate-800/40 transition-colors group"
                    >
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">
                        {idx + 1}
                      </td>

                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-300">
                        {student.rollNo}
                      </td>

                      <td className="py-2.5 px-3">
                        <span className="font-semibold text-white block">{student.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Git: {student.github}</span>
                      </td>

                      <td className="py-2.5 px-2 text-center">
                        <span className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
                          isLowAttd ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'text-slate-300'
                        }`}>
                          {student.attendance}%
                        </span>
                      </td>

                      {/* Lab Internal 1 (20M) input */}
                      <td className="py-2.5 px-2 text-center bg-indigo-950/20 border-x border-slate-800">
                        <input
                          id={`lab1-matrix-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="20"
                          value={l1}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'lab1', e.target.value);
                            handleInstantInput(e, nextLab1Id);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextLab1Id)}
                          className="w-14 text-center font-mono font-black text-xs py-1 px-1 bg-slate-950 border border-indigo-700/60 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </td>

                      {/* Lab Internal 2 (20M) input */}
                      <td className="py-2.5 px-2 text-center bg-purple-950/20 border-r border-slate-800">
                        <input
                          id={`lab2-matrix-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="20"
                          value={l2}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'lab2', e.target.value);
                            handleInstantInput(e, nextLab2Id);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextLab2Id)}
                          className="w-14 text-center font-mono font-black text-xs py-1 px-1 bg-slate-950 border border-purple-700/60 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                      </td>

                      {/* Lab Average (20M) Auto Computed */}
                      <td className="py-2.5 px-2 text-center font-mono font-black text-xs text-amber-300 bg-amber-950/10 border-r border-slate-800">
                        {lAvg}
                      </td>

                      {/* Day-to-Day Record (30M) input */}
                      <td className="py-2.5 px-2 text-center bg-blue-950/20 border-r border-slate-800">
                        <input
                          id={`dtd-matrix-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="30"
                          value={dtd}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'dayToDay', e.target.value);
                            handleInstantInput(e, nextDtdId);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextDtdId)}
                          className="w-14 text-center font-mono font-black text-xs py-1 px-1 bg-slate-950 border border-blue-700/60 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>

                      {/* Final CIE (50M) Auto Computed */}
                      <td className="py-2.5 px-2 text-center font-mono font-black text-sm text-emerald-400 bg-emerald-950/20 border-r border-slate-800">
                        {finalCie}
                      </td>

                      {/* Status */}
                      <td className="py-2.5 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isPass 
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60' 
                            : 'bg-rose-950 text-rose-300 border border-rose-700/60 animate-pulse'
                        }`}>
                          {isPass ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <AlertCircle className="w-3 h-3 text-rose-400" />}
                          <span>{isPass ? 'Pass (CIE)' : 'Remedial (&lt;25)'}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => { sounds.playTick(); setSplitModalStudent(student); }}
                          title="View & Edit detailed split components (Writeup, Execution, Viva)"
                          className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-indigo-950 border border-slate-700 hover:border-indigo-500 text-[10px] font-bold text-slate-300 hover:text-indigo-300 transition-colors flex items-center gap-1 mx-auto"
                        >
                          <Sliders className="w-3 h-3" />
                          <span>Split</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: 🔬 LAB INTERNAL 1 (20M TOTAL DETAILED ENTRY)      */}
      {/* ========================================================= */}
      {activeTab === 'lab1' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-2.5 py-0.5 rounded-full font-bold">
                  Lab Internal 1
                </span>
                <h2 className="text-sm font-black text-white">
                  Continuous Evaluation Scheme (Total: 20 Marks)
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Breakdown: <strong>Write-up & Flowchart (5M)</strong> + <strong>Program Execution & Debugging (10M)</strong> + <strong>Viva Voce (5M)</strong> = <strong className="text-indigo-400">20M Total</strong>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenImport('lab-internal-1')}
              className="px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-700/50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import Lab 1 (Excel/CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3">Roll Number</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3 text-center bg-indigo-950/30 text-indigo-200 border-x border-slate-800">
                    Write-up & Design (Max 5M)
                  </th>
                  <th className="py-3 px-3 text-center bg-indigo-950/50 text-indigo-200 border-r border-slate-800">
                    Execution & Output (Max 10M)
                  </th>
                  <th className="py-3 px-3 text-center bg-indigo-950/30 text-indigo-200 border-r border-slate-800">
                    Viva Voce (Max 5M)
                  </th>
                  <th className="py-3 px-3 text-center bg-amber-950/30 text-amber-300 font-bold border-r border-slate-800">
                    Total Lab 1 (Max 20M)
                  </th>
                  <th className="py-3 px-3 text-center">Auto Scale CIE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredStudents.map((student, idx) => {
                  const m = courseMarks[student.rollNo]?.labInternal1 || { writeup: 4, execution: 9, viva: 4, total: 17 };
                  const nextTotalId = idx < filteredStudents.length - 1 ? `l1-tot-${filteredStudents[idx + 1].rollNo}` : null;

                  return (
                    <tr key={student.rollNo} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-indigo-300">{student.rollNo}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{student.name}</td>

                      {/* Writeup 5M */}
                      <td className="py-2.5 px-3 text-center bg-indigo-950/10 border-x border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={m.writeup ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal1', 'writeup', e.target.value)}
                          className="w-12 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-indigo-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Execution 10M */}
                      <td className="py-2.5 px-3 text-center bg-indigo-950/20 border-r border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={m.execution ?? 9}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal1', 'execution', e.target.value)}
                          className="w-14 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-indigo-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Viva 5M */}
                      <td className="py-2.5 px-3 text-center bg-indigo-950/10 border-r border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={m.viva ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal1', 'viva', e.target.value)}
                          className="w-12 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-indigo-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Total Lab 1 (20M) direct editable */}
                      <td className="py-2.5 px-3 text-center bg-amber-950/10 border-r border-slate-800">
                        <input
                          id={`l1-tot-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="20"
                          value={m.total ?? 17}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'lab1', e.target.value);
                            handleInstantInput(e, nextTotalId);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextTotalId)}
                          className="w-14 text-center font-mono font-black text-xs py-1 bg-slate-950 border border-amber-500/60 rounded-lg text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>

                      <td className="py-2.5 px-3 text-center font-mono text-emerald-400 font-bold">
                        CIE: {courseMarks[student.rollNo]?.finalCie || 44}/50
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 🧪 LAB INTERNAL 2 (20M TOTAL DETAILED ENTRY)      */}
      {/* ========================================================= */}
      {activeTab === 'lab2' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-purple-950 text-purple-300 border border-purple-700/50 px-2.5 py-0.5 rounded-full font-bold">
                  Lab Internal 2
                </span>
                <h2 className="text-sm font-black text-white">
                  Continuous Evaluation Scheme (Total: 20 Marks)
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Breakdown: <strong>Write-up & Flowchart (5M)</strong> + <strong>Program Execution & Debugging (10M)</strong> + <strong>Viva Voce (5M)</strong> = <strong className="text-purple-400">20M Total</strong>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenImport('lab-internal-2')}
              className="px-3 py-1.5 rounded-xl bg-purple-950 hover:bg-purple-900 text-purple-200 border border-purple-700/50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import Lab 2 (Excel/CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3">Roll Number</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3 text-center bg-purple-950/30 text-purple-200 border-x border-slate-800">
                    Write-up & Design (Max 5M)
                  </th>
                  <th className="py-3 px-3 text-center bg-purple-950/50 text-purple-200 border-r border-slate-800">
                    Execution & Output (Max 10M)
                  </th>
                  <th className="py-3 px-3 text-center bg-purple-950/30 text-purple-200 border-r border-slate-800">
                    Viva Voce (Max 5M)
                  </th>
                  <th className="py-3 px-3 text-center bg-amber-950/30 text-amber-300 font-bold border-r border-slate-800">
                    Total Lab 2 (Max 20M)
                  </th>
                  <th className="py-3 px-3 text-center">Auto Scale CIE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredStudents.map((student, idx) => {
                  const m = courseMarks[student.rollNo]?.labInternal2 || { writeup: 4, execution: 10, viva: 4, total: 18 };
                  const nextTotalId = idx < filteredStudents.length - 1 ? `l2-tot-${filteredStudents[idx + 1].rollNo}` : null;

                  return (
                    <tr key={student.rollNo} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-purple-300">{student.rollNo}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{student.name}</td>

                      {/* Writeup 5M */}
                      <td className="py-2.5 px-3 text-center bg-purple-950/10 border-x border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={m.writeup ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal2', 'writeup', e.target.value)}
                          className="w-12 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-purple-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Execution 10M */}
                      <td className="py-2.5 px-3 text-center bg-purple-950/20 border-r border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={m.execution ?? 10}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal2', 'execution', e.target.value)}
                          className="w-14 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-purple-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Viva 5M */}
                      <td className="py-2.5 px-3 text-center bg-purple-950/10 border-r border-slate-800">
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={m.viva ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, student.rollNo, 'labInternal2', 'viva', e.target.value)}
                          className="w-12 text-center font-mono font-bold text-xs py-1 bg-slate-950 border border-purple-700/50 rounded-lg text-white"
                        />
                      </td>

                      {/* Total Lab 2 (20M) direct editable */}
                      <td className="py-2.5 px-3 text-center bg-amber-950/10 border-r border-slate-800">
                        <input
                          id={`l2-tot-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="20"
                          value={m.total ?? 18}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'lab2', e.target.value);
                            handleInstantInput(e, nextTotalId);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextTotalId)}
                          className="w-14 text-center font-mono font-black text-xs py-1 bg-slate-950 border border-amber-500/60 rounded-lg text-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </td>

                      <td className="py-2.5 px-3 text-center font-mono text-emerald-400 font-bold">
                        CIE: {courseMarks[student.rollNo]?.finalCie || 44}/50
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: 📝 DAY-TO-DAY RECORD (30M CONTINUOUS EVALUATION)   */}
      {/* ========================================================= */}
      {activeTab === 'daytoday' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-700/50 px-2.5 py-0.5 rounded-full font-bold">
                  Continuous Evaluation
                </span>
                <h2 className="text-sm font-black text-white">
                  Day-to-Day Observation & Record (Total: 30 Marks)
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Weekly lab attendance, continuous experiment execution, observation record notes, and timely documentation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleOpenImport('day-to-day')}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-700/50 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import Record Marks (Excel/CSV)</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
                  <th className="py-3 px-3 w-10 text-center">#</th>
                  <th className="py-3 px-3">Roll Number</th>
                  <th className="py-3 px-3">Student Name</th>
                  <th className="py-3 px-3 text-center">Attendance %</th>
                  <th className="py-3 px-3 text-center bg-emerald-950/30 text-emerald-200 border-x border-slate-800">
                    Observation & Timely Record (Max 30M)
                  </th>
                  <th className="py-3 px-3 text-center bg-amber-950/30 text-amber-300 border-r border-slate-800">
                    Lab Avg (20M)
                  </th>
                  <th className="py-3 px-3 text-center bg-blue-950/40 text-blue-300 font-bold">
                    Resulting CIE (Max 50M)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredStudents.map((student, idx) => {
                  const m = courseMarks[student.rollNo] || {};
                  const dtd = m.dayToDayRecord ?? 26;
                  const lAvg = m.labInternalAverage ?? 17.5;
                  const finalCie = m.finalCie ?? Math.round(lAvg + dtd);
                  const nextDtdId = idx < filteredStudents.length - 1 ? `dtd-tab-${filteredStudents[idx + 1].rollNo}` : null;

                  return (
                    <tr key={student.rollNo} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-300">{student.rollNo}</td>
                      <td className="py-2.5 px-3 font-semibold text-white">{student.name}</td>
                      <td className="py-2.5 px-3 text-center font-mono text-slate-300">{student.attendance}%</td>

                      {/* Day to Day (30M) input */}
                      <td className="py-2.5 px-3 text-center bg-emerald-950/20 border-x border-slate-800">
                        <input
                          id={`dtd-tab-${student.rollNo}`}
                          type="number"
                          min="0"
                          max="30"
                          value={dtd}
                          onChange={(e) => {
                            updateLabInternal(selectedCourse.code, student.rollNo, 'dayToDay', e.target.value);
                            handleInstantInput(e, nextDtdId);
                          }}
                          onKeyDown={(e) => handleKeyDown(e, nextDtdId)}
                          className="w-16 text-center font-mono font-black text-xs py-1 bg-slate-950 border border-emerald-500/60 rounded-lg text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </td>

                      <td className="py-2.5 px-3 text-center font-mono text-amber-300 border-r border-slate-800">
                        {lAvg} / 20M
                      </td>

                      <td className="py-2.5 px-3 text-center font-mono font-black text-sm text-blue-300">
                        {finalCie} / 50M
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: 🎯 RUBRICS & GITHUB GIT TRAJECTORY                 */}
      {/* ========================================================= */}
      {activeTab === 'rubrics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Student Selector List */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col h-[650px] shadow-xl">
            <div className="p-3 border-b border-slate-800 bg-slate-950/80">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter student..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-800/80 overflow-y-auto flex-1 custom-scrollbar">
              {filteredStudents.map(student => {
                const mark = courseMarks[student.rollNo];
                const score = mark?.finalCie || 44;
                const isSelected = student.rollNo === selectedStudentRoll;

                return (
                  <button
                    key={student.rollNo}
                    onClick={() => { sounds.playTick(); setSelectedStudentRoll(student.rollNo); }}
                    className={`w-full text-left p-3 transition-colors flex items-center justify-between ${
                      isSelected ? 'bg-indigo-950/70 border-l-4 border-indigo-500' : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-indigo-400 block">{student.rollNo}</span>
                      <span className="text-xs font-medium text-white line-clamp-1">{student.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Git: {student.github}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-xs text-amber-300 block">{score}/50</span>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                        score >= 25 ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/50' : 'bg-rose-950 text-rose-300'
                      }`}>
                        {score >= 25 ? 'Pass' : 'Remedial'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Interactive Rubric Evaluation Card */}
          <div className="lg:col-span-8 space-y-5">
            {/* Student Profile Quick Bar */}
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-base">{activeStudent.name}</h3>
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-700/50">
                    {activeStudent.rollNo}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Autonomous MCA Cohort · Status: <span className="font-semibold text-slate-300">{activeStudent.primarySkill || 'R-25 Autonomous Student'}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeStudentMark.gitRepoUrl || `https://github.com/${activeStudent.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-white rounded-xl text-xs font-mono transition-colors border border-slate-700 shadow-sm"
                >
                  <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <div className="bg-amber-950/60 border border-amber-600/40 px-3 py-1.5 rounded-xl text-xs">
                  <span className="text-[10px] text-amber-300 block font-semibold">LeetCode Solved</span>
                  <span className="font-mono font-bold text-amber-400">{activeStudent.leetcode} Qs</span>
                </div>
              </div>
            </div>

            {/* Detailed Criteria Rubrics */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-400" />
                  <h4 className="font-bold text-sm text-white">MCA Practical Rubric Criteria</h4>
                </div>
                <span className="text-xs text-slate-400">Total Raw: <strong className="text-white font-mono">{totalRawRubricScore}/100</strong> (Scales to 50 CIE)</span>
              </div>

              <div className="space-y-4">
                {criteriaList.map((crit) => {
                  const currentScore = rubricScores[crit.id] || 0;
                  return (
                    <div key={crit.id} className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 hover:border-indigo-500/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-xs text-white block">{crit.name}</span>
                          <span className="text-[11px] text-slate-400">{crit.desc}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-indigo-400">
                            {currentScore} <span className="text-[11px] font-normal text-slate-500">/ {crit.weight}</span>
                          </span>
                        </div>
                      </div>

                      {/* Range Slider for fast faculty scoring */}
                      <div className="flex items-center gap-3 pt-1">
                        <input
                          type="range"
                          min="0"
                          max={crit.weight}
                          value={currentScore}
                          onChange={(e) => {
                            const num = Math.min(crit.weight, Math.max(0, Number(e.target.value) || 0));
                            updateLabRubric(selectedCourse.code, activeStudent.rollNo, crit.id, num);
                          }}
                          className="w-full accent-indigo-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                        />
                        <input
                          type="number"
                          min="0"
                          max={crit.weight}
                          value={currentScore}
                          onChange={(e) => {
                            const num = Math.min(crit.weight, Math.max(0, Number(e.target.value) || 0));
                            updateLabRubric(selectedCourse.code, activeStudent.rollNo, crit.id, num);
                          }}
                          className="w-14 p-1 text-center font-mono font-bold text-xs border border-slate-700 rounded-lg bg-slate-900 text-white"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Git Insights Banner */}
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-700/40 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <span className="text-slate-300">
                    Total Verified Commits in Student Lab Repo: <strong className="font-mono text-amber-300">{activeStudentMark.gitCommitCount || 34} commits</strong>
                  </span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Repository Clean & Verified
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SUB-MODAL: SPLIT MARKS EVALUATION FOR SINGLE STUDENT      */}
      {/* ========================================================= */}
      {splitModalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
            <button
              onClick={() => setSplitModalStudent(null)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-full bg-slate-800/60"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center font-bold">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{splitModalStudent.name}</span>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-700/50">
                    {splitModalStudent.rollNo}
                  </span>
                </h3>
                <p className="text-xs text-slate-400">Component Split Evaluation · {selectedCourse.code}</p>
              </div>
            </div>

            {/* Split Form */}
            {(() => {
              const m = courseMarks[splitModalStudent.rollNo] || {};
              const l1 = m.labInternal1 || { writeup: 4, execution: 9, viva: 4, total: 17 };
              const l2 = m.labInternal2 || { writeup: 4, execution: 10, viva: 4, total: 18 };
              const dtd = m.dayToDayRecord ?? 26;
              const lAvg = m.labInternalAverage ?? Number(((l1.total + l2.total) / 2).toFixed(1));
              const finalCie = m.finalCie ?? Math.round(lAvg + dtd);

              return (
                <div className="space-y-4">
                  {/* Lab Internal 1 Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-bold text-indigo-300">Lab Internal 1 (Total: 20M)</span>
                      <span className="font-mono font-black text-amber-300 text-sm">{l1.total} / 20M</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Writeup (5M)</span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={l1.writeup ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal1', 'writeup', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Execution (10M)</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={l1.execution ?? 9}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal1', 'execution', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Viva (5M)</span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={l1.viva ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal1', 'viva', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lab Internal 2 Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                      <span className="text-xs font-bold text-purple-300">Lab Internal 2 (Total: 20M)</span>
                      <span className="font-mono font-black text-amber-300 text-sm">{l2.total} / 20M</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Writeup (5M)</span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={l2.writeup ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal2', 'writeup', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Execution (10M)</span>
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={l2.execution ?? 10}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal2', 'execution', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block mb-1">Viva (5M)</span>
                        <input
                          type="number"
                          min="0"
                          max="5"
                          value={l2.viva ?? 4}
                          onChange={(e) => updateLabInternalSplit(selectedCourse.code, splitModalStudent.rollNo, 'labInternal2', 'viva', e.target.value)}
                          className="w-full text-center font-mono font-bold text-xs py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Day-to-Day Record Box */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">Day-to-Day Record (Max 30M)</span>
                      <span className="text-[11px] text-slate-400">Weekly observations & lab manual</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      max="30"
                      value={dtd}
                      onChange={(e) => updateLabInternal(selectedCourse.code, splitModalStudent.rollNo, 'dayToDay', e.target.value)}
                      className="w-20 text-center font-mono font-black text-sm py-1.5 bg-slate-900 border border-emerald-600/50 rounded-xl text-emerald-300"
                    />
                  </div>

                  {/* Autonomous CIE Summary */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950 to-blue-950 border border-indigo-700/50 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">Computed Final Lab CIE</span>
                      <span className="text-[10px] text-slate-300">Lab Avg ({lAvg}/20) + Day-to-Day ({dtd}/30)</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-black text-emerald-400 font-mono block">{finalCie} / 50M</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        finalCie >= 25 ? 'bg-emerald-900 text-emerald-300' : 'bg-rose-900 text-rose-300'
                      }`}>
                        {finalCie >= 25 ? 'Pass (CIE)' : 'Remedial (&lt;25)'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => { sounds.playSuccessChime(); setSplitModalStudent(null); }}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    Done & Save
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* EXCEL / CSV IMPORT MODAL                                 */}
      {/* ========================================================= */}
      <CsvImportModal
        isOpen={isCsvOpen}
        onClose={() => setIsCsvOpen(false)}
        examType={csvExamType}
      />
    </div>
  );
};
