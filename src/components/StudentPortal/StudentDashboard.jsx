import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { WhatIfSimulator } from './WhatIfSimulator';
import { AiPerformanceMentor } from './AiPerformanceMentor';
import { 
  User, 
  GraduationCap, 
  Calendar, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  FileText, 
  GitBranch, 
  BookOpen, 
  ExternalLink,
  ShieldCheck,
  QrCode,
  Sparkles,
  Award,
  Zap,
  Calculator,
  Layers,
  CheckCircle2,
  TrendingUp,
  Filter
} from 'lucide-react';

export const StudentDashboard = () => {
  const { 
    currentUser,
    students, 
    activeStudentRoll, 
    setActiveStudentRoll, 
    activeStudent, 
    courses, 
    allCourses,
    selectedSemester,
    setSelectedSemester,
    cbitSemesters,
    calculateSemesterSgpa,
    marksData, 
    cbitInfo 
  } = useApp();

  const isStudentRole = currentUser?.role === 'student';
  const [marksViewMode, setMarksViewMode] = useState('all'); // 'all' | 'theory' | 'lab'

  // Calculate SGPAs across all 4 Semesters for this active student
  const sgpaSem1 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_1', marksData, allCourses);
  const sgpaSem2 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_2', marksData, allCourses);
  const sgpaSem3 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_3', marksData, allCourses);
  const sgpaSem4 = calculateSemesterSgpa(activeStudent.rollNo, 'sem_4', marksData, allCourses);
  const cumulativeCalc = calculateSemesterSgpa(activeStudent.rollNo, 'all', marksData, allCourses);

  const semStats = [
    { id: 'sem_1', label: 'Sem I', credits: 22.5, coursesCount: 8, sgpa: sgpaSem1.sgpa, color: 'from-blue-600 to-indigo-600' },
    { id: 'sem_2', label: 'Sem II', credits: 23.5, coursesCount: 9, sgpa: sgpaSem2.sgpa, color: 'from-indigo-600 to-purple-600' },
    { id: 'sem_3', label: 'Sem III', credits: 22.0, coursesCount: 8, sgpa: sgpaSem3.sgpa, color: 'from-purple-600 to-pink-600' },
    { id: 'sem_4', label: 'Sem IV', credits: 22.0, coursesCount: 4, sgpa: sgpaSem4.sgpa, color: 'from-emerald-600 to-teal-600' }
  ];

  // Calculate Internal Marks summary for currently filtered courses
  let theoryCount = 0;
  let labCount = 0;
  let sumTheoryMid1 = 0;
  let sumTheoryMid2 = 0;
  let sumTheoryMidAvg = 0;
  let sumTheorySlips = 0;
  let sumTheoryAssigns = 0;
  let sumTheoryCie = 0;

  let sumLab1 = 0;
  let sumLab2 = 0;
  let sumLabAvg = 0;
  let sumLabDtd = 0;
  let sumLabCie = 0;

  courses.forEach(c => {
    const m = marksData?.[c.code]?.[activeStudent.rollNo] || {};
    if (c.type === 'Theory') {
      theoryCount++;
      const m1 = m.mid1?.total ?? 14;
      const m2 = m.mid2?.total ?? 15;
      const mAvg = m.midAverage ?? Number(((m1 + m2) / 2).toFixed(1));
      const sTot = m.slipTests?.total ?? 13;
      const aAvg = m.assignments?.average ?? 8.5;
      const cie = m.finalCie ?? Math.round(mAvg + sTot + aAvg);

      sumTheoryMid1 += m1;
      sumTheoryMid2 += m2;
      sumTheoryMidAvg += mAvg;
      sumTheorySlips += sTot;
      sumTheoryAssigns += aAvg;
      sumTheoryCie += cie;
    } else {
      labCount++;
      const l1 = m.labInternal1?.total ?? 17;
      const l2 = m.labInternal2?.total ?? 18;
      const lAvg = m.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
      const dtd = m.dayToDayRecord ?? 26;
      const cie = m.finalCie ?? Math.round(lAvg + dtd);

      sumLab1 += l1;
      sumLab2 += l2;
      sumLabAvg += lAvg;
      sumLabDtd += dtd;
      sumLabCie += cie;
    }
  });

  const avgTheoryMid1 = theoryCount > 0 ? (sumTheoryMid1 / theoryCount).toFixed(1) : '14.5';
  const avgTheoryMid2 = theoryCount > 0 ? (sumTheoryMid2 / theoryCount).toFixed(1) : '15.2';
  const avgTheoryMidAvg = theoryCount > 0 ? (sumTheoryMidAvg / theoryCount).toFixed(1) : '14.8';
  const avgTheorySlips = theoryCount > 0 ? (sumTheorySlips / theoryCount).toFixed(1) : '13.0';
  const avgTheoryAssigns = theoryCount > 0 ? (sumTheoryAssigns / theoryCount).toFixed(1) : '8.6';
  const avgTheoryCie = theoryCount > 0 ? (sumTheoryCie / theoryCount).toFixed(1) : '36.4';

  const avgLab1 = labCount > 0 ? (sumLab1 / labCount).toFixed(1) : '17.5';
  const avgLab2 = labCount > 0 ? (sumLab2 / labCount).toFixed(1) : '18.0';
  const avgLabAvg = labCount > 0 ? (sumLabAvg / labCount).toFixed(1) : '17.8';
  const avgLabDtd = labCount > 0 ? (sumLabDtd / labCount).toFixed(1) : '26.4';
  const avgLabCie = labCount > 0 ? (sumLabCie / labCount).toFixed(1) : '44.2';

  // Active semester display metadata
  const currentSemMeta = cbitSemesters.find(s => s.id === selectedSemester) || cbitSemesters[0];

  return (
    <div className="space-y-6">
      {/* Holographic Digital Campus Smart ID Card & Profile Switcher */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: 3D Holographic Smart Student Card */}
        <div className="lg:col-span-6 relative group">
          <div className="relative overflow-hidden rounded-3xl p-6 text-white shadow-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 border border-indigo-500/40 transform transition-all group-hover:scale-[1.005] h-full flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-indigo-400/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-md">
                    CBIT
                  </div>
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-amber-300 block">Digital Campus ID · All Sems Record</span>
                    <span className="text-xs font-semibold text-slate-200">Department of Computer Applications</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full">
                    Active
                  </span>
                  <div className="p-1 rounded-lg bg-white/10 border border-white/20">
                    <QrCode className="w-4 h-4 text-indigo-300" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg ring-2 ring-white/20 shrink-0">
                  {activeStudent.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full font-mono font-black uppercase">
                      R-25 Autonomous
                    </span>
                    <span className="text-[10px] bg-indigo-500/30 text-indigo-200 px-2 py-0.5 rounded-full font-mono font-semibold border border-indigo-400/30">
                      Total 90 Credits
                    </span>
                  </div>
                  <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                    {activeStudent.name}
                  </h3>
                  <p className="font-mono text-xs font-bold text-amber-300">{activeStudent.rollNo}</p>
                </div>
              </div>
            </div>

            {/* Semester-by-Semester SGPA Progression Grid */}
            <div className="mt-5 pt-3 border-t border-indigo-400/20 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-200">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-300" />
                  <span>Semester SGPA Progression:</span>
                </span>
                <span className="text-amber-300 font-mono">
                  Cumulative CGPA: {cumulativeCalc.sgpa || activeStudent.cgpa} / 10.0
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 font-mono text-center">
                {semStats.map((s) => {
                  const isCurrent = selectedSemester === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        sounds.playTick();
                        setSelectedSemester(s.id);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        isCurrent 
                          ? 'bg-amber-400/20 border-amber-400 text-white shadow-md shadow-amber-400/10' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <span className="text-[9px] block text-slate-400 font-sans">{s.label}</span>
                      <span className={`text-xs font-bold block ${isCurrent ? 'text-amber-300' : 'text-slate-100'}`}>
                        {s.sgpa}
                      </span>
                      <span className="text-[8px] text-slate-400 block font-mono">{s.credits} Cr</span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Quick Metric Pills */}
              <div className="pt-2 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <span className="text-[9px] text-slate-400 block font-sans">Attendance</span>
                  <span className={`text-xs font-bold ${activeStudent.attendance >= 75 ? 'text-emerald-300' : 'text-rose-400'}`}>
                    {activeStudent.attendance}%
                  </span>
                </div>
                <div className="bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <span className="text-[9px] text-slate-400 block font-sans">LeetCode</span>
                  <span className="text-xs font-bold text-indigo-300">{activeStudent.leetcode} Qs</span>
                </div>
                <div className="bg-white/5 p-1.5 rounded-xl border border-white/10">
                  <span className="text-[9px] text-slate-400 block font-sans">Total Credits</span>
                  <span className="text-xs font-bold text-amber-300">90 / 90 Cr</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Multi-Semester Navigator & Profile Switcher */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 mb-4">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Student Dashboard</span>
                <h2 className="text-lg font-black text-slate-900">All-Semesters Academic Record (R-25)</h2>
              </div>

              {!isStudentRole ? (
                <div className="flex items-center gap-2">
                  <label className="text-xs font-semibold text-slate-500">Switch Student:</label>
                  <select
                    value={activeStudentRoll}
                    onChange={(e) => {
                      sounds.playTick();
                      setActiveStudentRoll(e.target.value);
                    }}
                    className="p-2 border border-slate-300 rounded-xl text-xs bg-slate-50 font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  >
                    {students.map(s => (
                      <option key={s.rollNo} value={s.rollNo}>
                        {s.rollNo.slice(-3)}: {s.name} (CGPA: {s.cgpa})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Authenticated as: {currentUser.rollNo}
                </span>
              )}
            </div>

            {/* Semester Switcher Navigation Tabs */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Select Semester to View Subject Performance:</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {cbitSemesters.map((sem) => {
                  const isSelected = selectedSemester === sem.id;
                  return (
                    <button
                      key={sem.id}
                      type="button"
                      onClick={() => {
                        sounds.playTick();
                        setSelectedSemester(sem.id);
                      }}
                      className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        isSelected 
                          ? 'bg-slate-900 border-slate-900 text-white shadow-md' 
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black ${isSelected ? 'text-amber-300' : 'text-slate-900'}`}>
                          {sem.shortName}
                        </span>
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {sem.credits} Cr
                        </span>
                      </div>
                      <span className={`text-[10px] block mt-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {sem.id === 'all' ? 'All 29 Courses (Sems 1-4)' : `${courses.filter(c => sem.id === 'all' || c.semester === sem.id).length || sem.coursesCount || 8} Courses`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* R-25 Autonomous Evaluation Formula Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">R25 Continuous Evaluation Scheme:</span>
                <span className="text-slate-600">
                  Theory CIE: Mid Avg (20M) + Slip Tests (15M) + Assign (10M) = <strong className="text-blue-900">45M</strong> · Lab CIE: <strong className="text-emerald-900">50M</strong>
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-300 shadow-sm shrink-0">
              Pass Benchmark: &ge; 40%
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* INTERNAL MARKS ASSESSMENT COCKPIT (THEORY & LAB CIE)     */}
      {/* ========================================================= */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">Student Internal Marks & CIE Cockpit</h3>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                  {currentSemMeta.name}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Evaluation for {activeStudent.name} ({activeStudent.rollNo}) · Filtered by: <span className="text-amber-300 font-bold">{currentSemMeta.shortName} ({courses.length} Courses)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded-xl bg-blue-950 text-blue-300 border border-blue-700/50">
              Theory CIE Avg: <strong>{avgTheoryCie}/45M</strong>
            </span>
            <span className="px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700/50">
              Lab CIE Avg: <strong>{avgLabCie}/50M</strong>
            </span>
          </div>
        </div>

        {/* Grid of Theory & Lab Internal Breakdown Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Theory Internal 1 */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Internal 1 (Mid 1)
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-blue-400 font-mono">{avgTheoryMid1}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 20M</span>
            </div>
            <span className="text-[10px] text-blue-300/80 mt-1 block">Theory Exam 1</span>
          </div>

          {/* Theory Internal 2 */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Internal 2 (Mid 2)
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-indigo-400 font-mono">{avgTheoryMid2}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 20M</span>
            </div>
            <span className="text-[10px] text-indigo-300/80 mt-1 block">Theory Exam 2</span>
          </div>

          {/* Slip Tests (15M) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              3 Slip Tests
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-emerald-400 font-mono">{avgTheorySlips}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 15M</span>
            </div>
            <span className="text-[10px] text-emerald-300/80 mt-1 block">3 x 5M Tests</span>
          </div>

          {/* Assignments (10M) */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              2 Assignments
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-purple-400 font-mono">{avgTheoryAssigns}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 10M</span>
            </div>
            <span className="text-[10px] text-purple-300/80 mt-1 block">Avg of Two</span>
          </div>

          {/* Lab Internal 1 */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Lab Internal 1
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-amber-300 font-mono">{avgLab1}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 20M</span>
            </div>
            <span className="text-[10px] text-amber-300/80 mt-1 block">Practical Exam 1</span>
          </div>

          {/* Lab Internal 2 */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Lab Internal 2
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-amber-300 font-mono">{avgLab2}</span>
              <span className="text-[10px] text-slate-500 font-mono">/ 20M</span>
            </div>
            <span className="text-[10px] text-amber-300/80 mt-1 block">Practical Exam 2</span>
          </div>
        </div>
      </div>

      {/* R25 Subject-Wise Detailed Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">
                {currentSemMeta.name}: Subject Performance Breakdown
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {courses.length} Courses
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Department of Computer Applications · Autonomous Examination System
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              type="button"
              onClick={() => { sounds.playTick(); setMarksViewMode('all'); }}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                marksViewMode === 'all' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Courses ({courses.length})
            </button>
            <button
              type="button"
              onClick={() => { sounds.playTick(); setMarksViewMode('theory'); }}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                marksViewMode === 'theory' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Theory Internals ({theoryCount})
            </button>
            <button
              type="button"
              onClick={() => { sounds.playTick(); setMarksViewMode('lab'); }}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                marksViewMode === 'lab' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3 h-3" />
              <span>🔬 Lab Internals ({labCount})</span>
            </button>
          </div>
        </div>

        {/* Dedicated Practical Lab Internals Table */}
        {marksViewMode === 'lab' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase font-bold text-[10px] tracking-wider font-mono">
                <tr>
                  <th className="p-3 w-10 text-center">#</th>
                  <th className="p-3">Semester</th>
                  <th className="p-3">Lab Course Code & Title</th>
                  <th className="p-3">Faculty In-Charge</th>
                  <th className="p-3 text-center bg-indigo-950 text-indigo-300 font-extrabold">Lab 1 (/20)</th>
                  <th className="p-3 text-center bg-purple-950 text-purple-300 font-extrabold">Lab 2 (/20)</th>
                  <th className="p-3 text-center bg-amber-950 text-amber-300 font-extrabold">Lab Avg (/20)</th>
                  <th className="p-3 text-center bg-blue-950 text-blue-300 font-extrabold">Day-to-Day (/30)</th>
                  <th className="p-3 text-center bg-emerald-950 text-emerald-300 font-black">Final CIE (/50)</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Repository</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {courses.filter(c => c.type === 'Practical').map((course, idx) => {
                  const mark = marksData?.[course.code]?.[activeStudent.rollNo] || {};
                  const l1 = mark.labInternal1?.total ?? 17;
                  const l2 = mark.labInternal2?.total ?? 18;
                  const lAvg = mark.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
                  const dtd = mark.dayToDayRecord ?? 26;
                  const finalCie = mark.finalCie ?? Math.round(lAvg + dtd);
                  const isPass = finalCie >= 25;

                  const semLabel = course.semester === 'sem_1' ? 'Sem I' :
                                   course.semester === 'sem_2' ? 'Sem II' :
                                   course.semester === 'sem_3' ? 'Sem III' : 'Sem IV';

                  return (
                    <tr key={course.code} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-center text-slate-500 font-mono text-[11px]">{idx + 1}</td>
                      <td className="p-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                          {semLabel}
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <span className="font-mono font-bold text-emerald-700 block text-xs">{course.code}</span>
                        <span className="text-slate-900 font-semibold text-xs block">{course.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{course.credits || 2} Credits · Autonomous Practical</span>
                      </td>
                      <td className="p-3 text-slate-700 text-xs font-medium">
                        {course.faculty}
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-indigo-700 bg-indigo-50/50">
                        <div>{l1} / 20</div>
                        <div className="text-[9px] text-slate-400 font-normal">W:5 E:10 V:5</div>
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-purple-700 bg-purple-50/50">
                        <div>{l2} / 20</div>
                        <div className="text-[9px] text-slate-400 font-normal">W:5 E:10 V:5</div>
                      </td>
                      <td className="p-3 text-center font-mono font-black text-amber-800 bg-amber-50/50">
                        {lAvg} / 20
                      </td>
                      <td className="p-3 text-center font-mono font-bold text-blue-700 bg-blue-50/50">
                        {dtd} / 30
                      </td>
                      <td className="p-3 text-center font-mono font-black text-base text-emerald-700 bg-emerald-50/60">
                        {finalCie} <span className="text-[10px] text-slate-500 font-normal">/50</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {isPass ? 'Pass (CIE)' : 'Remedial (<25)'}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <a
                          href={mark.gitRepoUrl || `https://github.com/${activeStudent.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-[10px] font-mono transition-colors"
                        >
                          <GitBranch className="w-3 h-3 text-emerald-400" />
                          <span>Repo</span>
                          <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-white uppercase font-bold text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Semester</th>
                  <th className="p-3">Course Code & Name</th>
                  <th className="p-3 text-center">Internal 1 (/20)</th>
                  <th className="p-3 text-center">Internal 2 (/20)</th>
                  <th className="p-3 text-center bg-blue-950 text-blue-300 font-extrabold">Internal Avg (/20)</th>
                  <th className="p-3 text-center">Slip 1 (/5)</th>
                  <th className="p-3 text-center">Slip 2 (/5)</th>
                  <th className="p-3 text-center">Slip 3 (/5)</th>
                  <th className="p-3 text-center bg-emerald-950 text-emerald-300 font-extrabold">Slip Tot (/15)</th>
                  <th className="p-3 text-center">Assign 1 (/10)</th>
                  <th className="p-3 text-center">Assign 2 (/10)</th>
                  <th className="p-3 text-center bg-purple-950 text-purple-300 font-extrabold">Assign Avg (/10)</th>
                  <th className="p-3 text-center bg-amber-950 text-amber-300 font-black">Total Internal CIE</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {(marksViewMode === 'theory' ? courses.filter(c => c.type === 'Theory') : courses).map(course => {
                  const mark = marksData?.[course.code]?.[activeStudent.rollNo] || {};
                  const isTheory = course.type === 'Theory';

                  const m1 = mark.mid1?.total ?? 14;
                  const m2 = mark.mid2?.total ?? 15;
                  const mAvg = mark.midAverage ?? 14.5;

                  const s1 = mark.slipTests?.slip1 ?? 4;
                  const s2 = mark.slipTests?.slip2 ?? 4;
                  const s3 = mark.slipTests?.slip3 ?? 5;
                  const sTot = mark.slipTests?.total ?? 13;

                  const a1 = mark.assignments?.assign1 ?? 8;
                  const a2 = mark.assignments?.assign2 ?? 9;
                  const aAvg = mark.assignments?.average ?? 8.5;

                  const l1 = mark.labInternal1?.total ?? 17;
                  const l2 = mark.labInternal2?.total ?? 18;
                  const lAvg = mark.labInternalAverage ?? Number(((l1 + l2) / 2).toFixed(1));
                  const dtd = mark.dayToDayRecord ?? 26;

                  const finalCie = mark.finalCie ?? (isTheory ? 36 : Math.round(lAvg + dtd));

                  const semBadge = course.semester === 'sem_1' ? { label: 'Sem I', cls: 'bg-blue-50 text-blue-700 border-blue-200' } :
                                   course.semester === 'sem_2' ? { label: 'Sem II', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' } :
                                   course.semester === 'sem_3' ? { label: 'Sem III', cls: 'bg-purple-50 text-purple-700 border-purple-200' } :
                                   { label: 'Sem IV', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };

                  return (
                    <tr key={course.code} className="hover:bg-indigo-50/30 font-medium">
                      <td className="p-3">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${semBadge.cls}`}>
                          {semBadge.label}
                        </span>
                      </td>
                      <td className="p-3 font-sans">
                        <div className="font-mono font-bold text-blue-700 text-xs">{course.code}</div>
                        <div className="text-slate-900 font-semibold text-xs">{course.name}</div>
                        <span className="text-[10px] text-slate-400">{course.type} · {course.credits || 3} Credits</span>
                      </td>

                      {isTheory ? (
                        <>
                          <td className="p-3 text-center text-slate-700">{m1}</td>
                          <td className="p-3 text-center text-slate-700">{m2}</td>
                          <td className="p-3 text-center font-bold text-blue-700 bg-blue-50/50">{mAvg}</td>

                          <td className="p-3 text-center text-slate-700">{s1}</td>
                          <td className="p-3 text-center text-slate-700">{s2}</td>
                          <td className="p-3 text-center text-slate-700">{s3}</td>
                          <td className="p-3 text-center font-bold text-emerald-700 bg-emerald-50/50">{sTot}</td>

                          <td className="p-3 text-center text-slate-700">{a1}</td>
                          <td className="p-3 text-center text-slate-700">{a2}</td>
                          <td className="p-3 text-center font-bold text-purple-700 bg-purple-50/50">{aAvg}</td>

                          <td className="p-3 text-center font-black text-amber-900 bg-amber-50 text-sm">
                            {finalCie} <span className="text-[10px] text-slate-500 font-normal">/45</span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td colSpan={10} className="p-2.5 text-center font-sans text-slate-700 text-xs">
                            <div className="flex flex-wrap items-center justify-center gap-2">
                              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-200 text-[11px] font-mono">
                                Lab 1: <strong>{l1}/20M</strong>
                              </span>
                              <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200 text-[11px] font-mono">
                                Lab 2: <strong>{l2}/20M</strong>
                              </span>
                              <span className="bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200 text-[11px] font-mono">
                                Lab Avg: <strong>{lAvg}/20M</strong>
                              </span>
                              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200 text-[11px] font-mono">
                                Day-to-Day Record: <strong>{dtd}/30M</strong>
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-center font-black text-amber-900 bg-amber-50 text-sm">
                            {finalCie} <span className="text-[10px] text-slate-500 font-normal">/50</span>
                          </td>
                        </>
                      )}

                      <td className="p-3 text-center font-sans">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          finalCie >= (isTheory ? 18 : 25) 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {finalCie >= (isTheory ? 18 : 25) ? 'Passing' : 'Remedial Alert'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Two Pillars: What-If Simulator & AI Mentor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WhatIfSimulator student={activeStudent} />
        <AiPerformanceMentor student={activeStudent} />
      </div>
    </div>
  );
};
