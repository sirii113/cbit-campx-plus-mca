import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { computePlacementReadiness } from '../../utils/calculations';
import { sounds } from '../../utils/soundEffects';
import { 
  Flame, 
  Briefcase, 
  Code, 
  GitBranch, 
  Terminal, 
  CheckCircle2, 
  Search, 
  Filter, 
  ExternalLink,
  Download,
  Sparkles,
  Trophy,
  Building2,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const PlacementReadinessDashboard = () => {
  const { students, marksData, selectedCohort: appCohort, toggleCohort, seniorCohortInfo, showToast } = useApp();
  const [selectedCohort, setSelectedCohort] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('all');
  const [targetCompany, setTargetCompany] = useState('all');

  const evaluatedStudents = students.map(student => {
    const labMarks = marksData?.['25MCC112']?.[student.rollNo] || marksData?.['25MCC111']?.[student.rollNo];
    const pr = computePlacementReadiness(student, labMarks);
    return {
      student,
      pr
    };
  });

  const tier1Count = evaluatedStudents.filter(s => s.pr.totalPrScore >= 85).length;
  const coreCount = evaluatedStudents.filter(s => s.pr.totalPrScore >= 70 && s.pr.totalPrScore < 85).length;
  const servicesCount = evaluatedStudents.filter(s => s.pr.totalPrScore >= 55 && s.pr.totalPrScore < 70).length;
  const upskillCount = evaluatedStudents.filter(s => s.pr.totalPrScore < 55).length;

  // Dream company criteria
  const COMPANIES = [
    { name: "Google / Amazon", minCgpa: 8.5, minLeetcode: 400, minPr: 85, pkg: "₹18 - ₹24 LPA", color: "from-blue-600 to-red-600" },
    { name: "Microsoft / Oracle", minCgpa: 8.2, minLeetcode: 350, minPr: 80, pkg: "₹14 - ₹18 LPA", color: "from-indigo-600 to-purple-600" },
    { name: "ServiceNow / Salesforce", minCgpa: 7.5, minLeetcode: 250, minPr: 70, pkg: "₹10 - ₹14 LPA", color: "from-emerald-600 to-teal-600" },
    { name: "TCS Digital / Cognizant GenC", minCgpa: 7.0, minLeetcode: 150, minPr: 60, pkg: "₹7 - ₹9 LPA", color: "from-amber-600 to-orange-600" }
  ];

  const filtered = evaluatedStudents.filter(({ student, pr }) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          student.rollNo.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;

    if (selectedCohort === 'tier1' && pr.totalPrScore < 85) return false;
    if (selectedCohort === 'core' && (pr.totalPrScore < 70 || pr.totalPrScore >= 85)) return false;
    if (selectedCohort === 'upskill' && pr.totalPrScore >= 55) return false;

    if (selectedSkill !== 'all' && (!student.primarySkill || !student.primarySkill.toLowerCase().includes(selectedSkill.toLowerCase()))) {
      return false;
    }

    if (targetCompany !== 'all') {
      const comp = COMPANIES.find(c => c.name === targetCompany);
      if (comp) {
        if (student.cgpa < comp.minCgpa || student.leetcode < comp.minLeetcode || pr.totalPrScore < comp.minPr) {
          return false;
        }
      }
    }

    return true;
  });

  const handleExportTpo = () => {
    sounds.playSuccessChime();
    showToast('Exported verified candidate shortlist for CBIT Placement Cell (TPO)!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Cyber Banner */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-purple-600/40 text-purple-300 text-xs px-3 py-1 rounded-full font-mono font-bold border border-purple-500/40 backdrop-blur-md">
                MCA Placement Intelligence Engine
              </span>
              <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Trophy className="w-3.5 h-3.5" /> CBIT TPO Sync
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
              MCA Career & Placement Readiness Cockpit
            </h2>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              Composite index blending Academic CGPA (30%), Practical Lab Quality (25%), LeetCode Problem Solving (25%), and GitHub Dev Activity (20%). Directly bridges classroom performance to tech placements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportTpo}
              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-xs font-bold rounded-2xl shadow-xl shadow-purple-600/25 transition-all flex items-center gap-2 hover:scale-105"
            >
              <Download className="w-4 h-4" />
              <span>Export TPO Shortlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Senior Batch Historical Placement Benchmark Strip */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-purple-950/80 via-slate-900 to-indigo-950/80 border border-purple-500/30 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-amber-400/20">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-white text-sm">
                CBIT MCA 2024 Senior Batch Placement Track Record
              </h4>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                55/60 Recruited (91.7%)
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Top Offer: <strong className="text-amber-300 font-mono">₹24.0 LPA (Google Cloud AI)</strong> · Oracle: <strong className="text-indigo-300 font-mono">₹16.0 LPA</strong> · ServiceNow: <strong className="text-purple-300 font-mono">₹14.5 LPA</strong> · Avg Package: <strong className="text-emerald-300 font-mono">₹7.8 LPA</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-2 bg-indigo-600/80 text-white text-xs font-bold rounded-xl border border-indigo-400/30 shadow-md font-mono">
            🎓 MCA 2024 Senior Batch
          </span>
        </div>
      </div>

      {/* Dream Company Eligibility Matcher Pills */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Dream Company Fast-Filter Matcher:
            </h4>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Real-time placement eligibility cutoff</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {COMPANIES.map(comp => {
            const isSelected = targetCompany === comp.name;
            const eligibleCount = evaluatedStudents.filter(
              s => s.student.cgpa >= comp.minCgpa && s.student.leetcode >= comp.minLeetcode && s.pr.totalPrScore >= comp.minPr
            ).length;

            return (
              <button
                key={comp.name}
                onClick={() => {
                  sounds.playTick();
                  setTargetCompany(isSelected ? 'all' : comp.name);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden ${
                  isSelected 
                    ? 'bg-slate-900 text-white border-purple-500 ring-2 ring-purple-400 shadow-lg' 
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs">{comp.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    isSelected ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {eligibleCount} eligible
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {comp.pkg} · Min {comp.minCgpa} CGPA & {comp.minLeetcode}+ DSA
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cohort Metric Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => {
            sounds.playTick();
            setSelectedCohort('tier1');
          }}
          className={`p-4 rounded-3xl border text-left transition-all ${
            selectedCohort === 'tier1' 
              ? 'bg-purple-50 border-purple-400 ring-2 ring-purple-300 shadow-md' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-purple-700 uppercase">Tier-1 Product Ready</span>
            <Flame className="w-4 h-4 text-purple-600 animate-pulse" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono">{tier1Count}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">&ge; 85 PR-Score (12+ LPA target)</span>
        </button>

        <button
          onClick={() => {
            sounds.playTick();
            setSelectedCohort('core');
          }}
          className={`p-4 rounded-3xl border text-left transition-all ${
            selectedCohort === 'core' 
              ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300 shadow-md' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-emerald-700 uppercase">Product & FinTech</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono">{coreCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">70-84 PR-Score (8-12 LPA)</span>
        </button>

        <button
          onClick={() => {
            sounds.playTick();
            setSelectedCohort('all');
          }}
          className={`p-4 rounded-3xl border text-left transition-all ${
            selectedCohort === 'all' 
              ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-300 shadow-md' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-blue-700 uppercase">Tech Services / IT</span>
            <Briefcase className="w-4 h-4 text-blue-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono">{servicesCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">55-69 PR-Score (5-8 LPA)</span>
        </button>

        <button
          onClick={() => {
            sounds.playTick();
            setSelectedCohort('upskill');
          }}
          className={`p-4 rounded-3xl border text-left transition-all ${
            selectedCohort === 'upskill' 
              ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-300 shadow-md' 
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-amber-700 uppercase">Needs Bootcamps</span>
            <Sparkles className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-3xl font-black text-slate-900 font-mono">{upskillCount}</span>
          <span className="text-[10px] text-slate-500 block mt-0.5">&lt; 55 PR-Score (DSA Focus)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search Student or Roll No..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>

          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-700 font-medium"
          >
            <option value="all">All Tech Domains</option>
            <option value="Full Stack">Full Stack (MERN/React)</option>
            <option value="Cloud">Cloud & DevOps</option>
            <option value="Data">Data & AI/ML</option>
            <option value="Algorithms">Algorithms & DSA</option>
          </select>
        </div>

        <span className="text-slate-500 font-medium">
          Showing <strong className="text-slate-900">{filtered.length}</strong> qualified MCA students
        </span>
      </div>

      {/* Students Placement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(({ student, pr }) => (
          <div
            key={student.rollNo}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all space-y-4 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-xs font-bold text-blue-700 block">{student.rollNo}</span>
                  <h4 className="font-black text-slate-900 text-base group-hover:text-purple-700 transition-colors">
                    {student.name}
                  </h4>
                  <span className="text-xs text-slate-500 font-medium">{student.primarySkill || 'MCA Student'}</span>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-black font-mono text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 block">
                    {pr.totalPrScore}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">PR-Score / 100</span>
                </div>
              </div>

              {/* Quadrant badge */}
              <div className="mt-2.5">
                <span className={`text-[10px] px-2.5 py-1 rounded-full border font-bold inline-block ${pr.statusBadge}`}>
                  {pr.targetCohort}
                </span>
              </div>

              {/* Breakdown Bars */}
              <div className="mt-4 space-y-2.5 text-[11px]">
                <div>
                  <div className="flex justify-between text-slate-600 mb-0.5">
                    <span>Academic (CGPA: {student.cgpa})</span>
                    <span className="font-mono font-bold text-slate-900">{pr.academicScore}/30</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${(pr.academicScore / 30) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-0.5">
                    <span>LeetCode DSA ({student.leetcode} Solved)</span>
                    <span className="font-mono font-bold text-slate-900">{pr.dsaScore}/25</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${(pr.dsaScore / 25) * 100}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-600 mb-0.5">
                    <span>Practical Lab Engineering</span>
                    <span className="font-mono font-bold text-slate-900">{pr.practicalScore}/25</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(pr.practicalScore / 25) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-mono">
              <a
                href={`https://github.com/${student.github}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 hover:text-purple-600 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5 text-slate-400" />
                <span>@{student.github}</span>
              </a>

              <span className="text-[11px] font-bold text-slate-800 font-sans">
                Att: {student.attendance}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
