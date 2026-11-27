import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { 
  X, 
  GraduationCap, 
  Search, 
  Filter, 
  Building2, 
  Award, 
  UserCheck, 
  ExternalLink, 
  GitBranch, 
  Sparkles, 
  Briefcase, 
  CheckCircle2, 
  BookOpen, 
  Layers,
  ChevronRight,
  TrendingUp,
  Download
} from 'lucide-react';

export const SeniorProjectsModal = ({ isOpen, onClose }) => {
  const { 
    seniorStudents, 
    seniorCohortInfo, 
    seniorBenchmarks, 
    selectedCohort, 
    toggleCohort,
    showToast 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');

  if (!isOpen) return null;

  // Filter students based on query, domain, guide, and company
  const filteredSeniors = (seniorStudents || []).filter(s => {
    const q = searchQuery.toLowerCase();
    const matchQuery = !searchQuery || 
      s.name.toLowerCase().includes(q) || 
      s.rollNo.toLowerCase().includes(q) || 
      s.majorProject?.title.toLowerCase().includes(q) ||
      s.placement?.company.toLowerCase().includes(q) ||
      s.primarySkill?.toLowerCase().includes(q);

    const matchDomain = selectedDomain === 'all' || s.majorProject?.domain.includes(selectedDomain);
    const matchGuide = selectedGuide === 'all' || s.majorProject?.guide.includes(selectedGuide);
    const matchCompany = selectedCompany === 'all' || s.placement?.company.includes(selectedCompany);

    return matchQuery && matchDomain && matchGuide && matchCompany;
  });

  const uniqueDomains = Array.from(new Set((seniorStudents || []).map(s => s.majorProject?.domain).filter(Boolean)));
  const uniqueGuides = Array.from(new Set((seniorStudents || []).map(s => s.majorProject?.guide).filter(Boolean)));
  const uniqueCompanies = Array.from(new Set((seniorStudents || []).map(s => s.placement?.company).filter(Boolean)));

  const handleExportCsv = () => {
    sounds.playSuccessChime();
    let csv = `RollNo,StudentName,CGPA,PlacementCompany,Role,Package,MajorProjectTitle,Domain,FacultyGuide,CIEScore,SEEScore,Status\n`;
    filteredSeniors.forEach(s => {
      csv += `"${s.rollNo}","${s.name}",${s.cgpa},"${s.placement?.company || 'Higher Studies'}","${s.placement?.role || '-'}","${s.placement?.package || '-'}","${s.majorProject?.title.replace(/"/g, '""')}","${s.majorProject?.domain}","${s.majorProject?.guide}",${s.majorProject?.cieScore},${s.majorProject?.seeScore},"${s.majorProject?.status}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBIT_MCA_Senior_Batch_2023_2025_Projects_Placements.csv`;
    a.click();
    showToast('Exported Senior Batch Projects & Placements dossier to CSV!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl text-white overflow-hidden my-auto">
        
        {/* Header Ribbon */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-blue-950 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-lg shadow-amber-400/20 shrink-0">
              🎓
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-black text-white">
                  CBIT MCA Senior Batch (2023–2025) Project & Placements Archive
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Completed 90 Cr
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Department of Computer Applications · Autonomous Capstone Showcase & Real-Time Performance Benchmarks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                sounds.playTick();
                onClose();
              }}
              className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* High-Level Benchmark Metrics Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 bg-slate-950/60 border-b border-slate-800 font-mono text-center">
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Batch Size</span>
            <span className="text-base font-bold text-white">60 Seniors</span>
            <span className="text-[9px] text-slate-500 block">1601-23-862 Series</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Placement Rate</span>
            <span className="text-base font-bold text-emerald-400">91.7% Placed</span>
            <span className="text-[9px] text-slate-500 block">55 / 60 Recruited</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Highest Package</span>
            <span className="text-base font-bold text-amber-300">₹24.0 LPA</span>
            <span className="text-[9px] text-slate-500 block">Google Cloud AI</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Class Avg CGPA</span>
            <span className="text-base font-bold text-indigo-300">8.78 / 10.0</span>
            <span className="text-[9px] text-slate-500 block">Autonomous Distinction</span>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Major Project Avg</span>
            <span className="text-base font-bold text-purple-300">93.4 / 100M</span>
            <span className="text-[9px] text-slate-500 block">42 Distinctions</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name, roll number, project title, guide, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Domain Dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Project Domains</option>
            {uniqueDomains.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          {/* Guide Dropdown */}
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Faculty Guides</option>
            {uniqueGuides.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          {/* Company Dropdown */}
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="p-2 bg-slate-950 border border-slate-700 rounded-xl text-slate-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="all">All Companies</option>
            {uniqueCompanies.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Quick Activate Cohort Button */}
          <button
            onClick={() => {
              sounds.playSuccessChime();
              toggleCohort('seniors');
              onClose();
            }}
            className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition shadow-md shadow-indigo-600/30 cursor-pointer"
          >
            <span>Activate Senior Cohort in App</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Senior Student Cards List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono pb-1">
            <span>Showing {filteredSeniors.length} of {seniorStudents.length} Senior MCA Scholars</span>
            <span>Batch: 2023–2025 · Autonomous Regulation R-22/R-25</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredSeniors.map((senior) => {
              return (
                <div
                  key={senior.rollNo}
                  className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4.5 transition-all space-y-3 group"
                >
                  {/* Top Bar: Student Name, Roll No, CGPA */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center shrink-0">
                        {senior.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-black text-white text-sm group-hover:text-amber-300 transition-colors">
                            {senior.name}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400">
                            #{senior.rank || '-'}
                          </span>
                        </div>
                        <p className="font-mono text-xs text-indigo-400 font-bold">{senior.rollNo}</p>
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      <div className="flex items-baseline gap-1 justify-end">
                        <span className="text-xs font-bold text-amber-300">{senior.cgpa}</span>
                        <span className="text-[10px] text-slate-500">CGPA</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 block">
                        {senior.attendance}% Attendance
                      </span>
                    </div>
                  </div>

                  {/* Major Project Information */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Major Project (25MCC214):</span>
                      </span>
                      <span className="text-amber-300 font-mono font-bold text-[10px]">
                        CIE: {senior.majorProject?.cieScore}/100M
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-200 line-clamp-2">
                      "{senior.majorProject?.title}"
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
                      <span>Guide: <strong className="text-slate-300">{senior.majorProject?.guide}</strong></span>
                      <span className="font-mono text-purple-300 bg-purple-950/60 px-1.5 py-0.5 rounded border border-purple-800/40">
                        {senior.majorProject?.domain}
                      </span>
                    </div>
                  </div>

                  {/* Placement & Coding Profile Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-700/50 rounded-xl font-bold text-[11px]">
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{senior.placement?.company}</span>
                        <span className="text-emerald-400 font-mono">({senior.placement?.package})</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800/40">
                        LeetCode: <strong>{senior.leetcode} Qs</strong>
                      </span>
                      <a
                        href={`https://github.com/${senior.github}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                      >
                        <GitBranch className="w-3 h-3 text-slate-400" />
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Real-Time Database Connected · CBIT MCA Academic Server Gandipet</span>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            Official Autonomous Data Archived for Departmental Scrutiny & NBA Accreditation
          </span>
        </div>
      </div>
    </div>
  );
};
