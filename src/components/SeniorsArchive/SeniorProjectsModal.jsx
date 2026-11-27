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
  Download,
  Plus,
  Upload,
  Edit3,
  Trash2,
  RotateCcw,
  FileSpreadsheet,
  Check,
  AlertTriangle
} from 'lucide-react';

export const SeniorProjectsModal = ({ isOpen, onClose }) => {
  const { 
    seniorStudents, 
    seniorCohortInfo, 
    seniorBenchmarks, 
    selectedCohort, 
    toggleCohort,
    showToast,
    addSeniorStudent,
    updateSeniorStudent,
    deleteSeniorStudent,
    bulkImportSeniorStudents,
    resetSeniorStudentsToDefault
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('all');
  const [selectedGuide, setSelectedGuide] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');

  // Sub-modal states
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [replaceMode, setReplaceMode] = useState(false);
  const [deleteConfirmRoll, setDeleteConfirmRoll] = useState(null);

  // Form State for Add / Edit
  const [formData, setFormData] = useState({
    rollNo: '',
    name: '',
    gender: 'M',
    email: '',
    cgpa: '8.80',
    attendance: '95',
    placementCompany: 'Oracle India',
    placementRole: 'Associate Software Engineer',
    placementPackage: '₹14.0 LPA',
    projectTitle: 'Distributed Cloud Platform & Intelligence Engine',
    projectDomain: 'Cloud Native & DevOps',
    projectGuide: 'Dr. B. Indira (HoD)',
    cieScore: '96',
    seeScore: '98',
    github: '',
    leetcode: '450'
  });

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

  // Dynamic statistics
  const totalCount = seniorStudents.length;
  const placedCount = seniorStudents.filter(s => s.placement?.status === 'Placed' || s.placement?.company).length;
  const placementPct = totalCount ? Math.round((placedCount / totalCount) * 100) : 0;
  const avgCgpa = totalCount ? (seniorStudents.reduce((a, b) => a + (parseFloat(b.cgpa) || 0), 0) / totalCount).toFixed(2) : '8.78';

  const handleOpenAdd = () => {
    sounds.playTick();
    setEditingStudent(null);
    const nextNum = (seniorStudents.length + 1).toString().padStart(3, '0');
    setFormData({
      rollNo: `1601-24-862-${nextNum}`,
      name: '',
      gender: 'M',
      email: `160124862${nextNum}@cbit.org.in`,
      cgpa: '8.80',
      attendance: '95',
      placementCompany: 'ServiceNow',
      placementRole: 'Software Engineer',
      placementPackage: '₹14.5 LPA',
      projectTitle: 'Distributed Cloud Native Microservices Architecture',
      projectDomain: 'Cloud Native & DevOps',
      projectGuide: 'Dr. B. Indira (HoD)',
      cieScore: '96',
      seeScore: '98',
      github: `senior-${nextNum}-cbit`,
      leetcode: '480'
    });
    setIsAddEditOpen(true);
  };

  const handleOpenEdit = (senior) => {
    sounds.playTick();
    setEditingStudent(senior);
    setFormData({
      rollNo: senior.rollNo,
      name: senior.name,
      gender: senior.gender || 'M',
      email: senior.email || `${senior.rollNo.replace(/-/g, '')}@cbit.org.in`,
      cgpa: senior.cgpa?.toString() || '8.5',
      attendance: senior.attendance?.toString() || '92',
      placementCompany: senior.placement?.company || 'Placed',
      placementRole: senior.placement?.role || 'Software Engineer',
      placementPackage: senior.placement?.package || '₹7.5 LPA',
      projectTitle: senior.majorProject?.title || '',
      projectDomain: senior.majorProject?.domain || 'Cloud & Distributed Systems',
      projectGuide: senior.majorProject?.guide || 'Dr. B. Indira (HoD)',
      cieScore: senior.majorProject?.cieScore?.toString() || '95',
      seeScore: senior.majorProject?.seeScore?.toString() || '96',
      github: senior.github || '',
      leetcode: senior.leetcode?.toString() || '350'
    });
    setIsAddEditOpen(true);
  };

  const handleSaveStudent = (e) => {
    e.preventDefault();
    if (!formData.rollNo.trim() || !formData.name.trim()) {
      showToast('Roll number and Name are required.', 'error');
      return;
    }
    sounds.playSuccessChime();
    if (editingStudent) {
      updateSeniorStudent(editingStudent.rollNo, formData);
    } else {
      addSeniorStudent(formData);
    }
    setIsAddEditOpen(false);
  };

  const handleDeleteStudent = (rollNo) => {
    sounds.playTick();
    deleteSeniorStudent(rollNo);
    setDeleteConfirmRoll(null);
  };

  const handleDownloadTemplate = () => {
    sounds.playTick();
    const template = `RollNo,StudentName,CGPA,PlacementCompany,Role,Package,MajorProjectTitle,Domain,FacultyGuide,CIEScore,SEEScore,Attendance,Email,GitHub,LeetCode
1601-24-862-061,M. Rithvik Sharma,9.25,Google Cloud,Cloud Solutions Engineer,₹22.0 LPA,High-Throughput Kubernetes Microservices Observability Engine,Cloud & DevOps,Dr. B. Indira (HoD),97,98,96,160124862061@cbit.org.in,rithvik-cbit,520
1601-24-862-062,B. Ananya Rao,9.10,Microsoft India,Software Development Engineer,₹18.0 LPA,Deep Learning Multi-Modal Biomedical Diagnosis System,AI/ML & Deep Learning,Dr. K. Radhika,95,96,95,160124862062@cbit.org.in,ananya-rao,480`;

    const blob = new Blob([template], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'CBIT_MCA_Senior_Batch_Import_Template.csv';
    a.click();
    showToast('Downloaded sample CSV template for Senior Batch data!', 'success');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImportText(event.target?.result || '');
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = () => {
    if (!importText.trim()) {
      showToast('Please paste CSV or JSON data or upload a file.', 'error');
      return;
    }
    sounds.playSuccessChime();

    try {
      // Check if it's JSON
      if (importText.trim().startsWith('[') || importText.trim().startsWith('{')) {
        const parsed = JSON.parse(importText);
        const arr = Array.isArray(parsed) ? parsed : [parsed];
        bulkImportSeniorStudents(arr, replaceMode);
        setIsImportOpen(false);
        setImportText('');
        return;
      }
    } catch (err) {
      // Not JSON, proceed with CSV parsing
    }

    // CSV parsing
    const lines = importText.trim().split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length === 0) {
      showToast('No valid rows found in CSV.', 'error');
      return;
    }

    const hasHeader = lines[0].toLowerCase().includes('roll') || lines[0].toLowerCase().includes('name');
    const dataLines = hasHeader ? lines.slice(1) : lines;

    const parsedStudents = dataLines.map((line, idx) => {
      const parts = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(p => p.trim().replace(/^"|"$/g, ''));
      const roll = parts[0] || `1601-24-862-${String(seniorStudents.length + idx + 1).padStart(3, '0')}`;
      return {
        rollNo: roll,
        name: parts[1] || `Scholar ${roll}`,
        cgpa: parseFloat(parts[2]) || 8.5,
        placementCompany: parts[3] || 'Placed',
        placementRole: parts[4] || 'Software Engineer',
        placementPackage: parts[5] || '₹7.5 LPA',
        projectTitle: parts[6] || 'Autonomous Major Capstone Project',
        projectDomain: parts[7] || 'AI/ML & Cloud Computing',
        projectGuide: parts[8] || 'Dr. B. Indira (HoD)',
        cieScore: parseInt(parts[9], 10) || 94,
        seeScore: parseInt(parts[10], 10) || 95,
        attendance: parseInt(parts[11], 10) || 94,
        email: parts[12] || `${roll.replace(/-/g, '')}@cbit.org.in`,
        github: parts[13] || `${roll.toLowerCase().replace(/[^a-z0-9]/g, '')}-cbit`,
        leetcode: parseInt(parts[14], 10) || 350
      };
    });

    bulkImportSeniorStudents(parsedStudents, replaceMode);
    setIsImportOpen(false);
    setImportText('');
  };

  const handleExportCsv = () => {
    sounds.playSuccessChime();
    let csv = `RollNo,StudentName,CGPA,PlacementCompany,Role,Package,MajorProjectTitle,Domain,FacultyGuide,CIEScore,SEEScore,Status,Email,GitHub,LeetCode\n`;
    filteredSeniors.forEach(s => {
      csv += `"${s.rollNo}","${s.name}",${s.cgpa},"${s.placement?.company || 'Higher Studies'}","${s.placement?.role || '-'}","${s.placement?.package || '-'}","${(s.majorProject?.title || '').replace(/"/g, '""')}","${s.majorProject?.domain || ''}","${s.majorProject?.guide || ''}",${s.majorProject?.cieScore || 95},${s.majorProject?.seeScore || 96},"${s.majorProject?.status || 'Completed'}","${s.email || ''}","${s.github || ''}",${s.leetcode || 0}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CBIT_MCA_Senior_Batch_2024_Projects_Placements.csv`;
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
                  CBIT MCA 2024 Senior Batch Project & Placements Archive
                </h2>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-mono font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {totalCount} Scholars · 90 Cr
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Department of Computer Applications · Autonomous Capstone Showcase & Real-Time Performance Benchmarks
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/30 transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Senior</span>
            </button>
            <button
              onClick={() => {
                sounds.playTick();
                setIsImportOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-indigo-400" />
              <span>Import CSV</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm("Reset senior dataset to original 60 CBIT Autonomous scholars standard?")) {
                  resetSeniorStudentsToDefault();
                }
              }}
              title="Reset to default 60 scholars"
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-amber-300 text-xs rounded-xl border border-slate-700 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
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
            <span className="text-base font-bold text-white">{totalCount} Seniors</span>
            <span className="text-[9px] text-slate-500 block">1601-24-862 Series</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Placement Rate</span>
            <span className="text-base font-bold text-emerald-400">{placementPct}% Placed</span>
            <span className="text-[9px] text-slate-500 block">{placedCount} / {totalCount} Recruited</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Highest Package</span>
            <span className="text-base font-bold text-amber-300">₹24.0 LPA</span>
            <span className="text-[9px] text-slate-500 block">Google Cloud AI</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Class Avg CGPA</span>
            <span className="text-base font-bold text-indigo-300">{avgCgpa} / 10.0</span>
            <span className="text-[9px] text-slate-500 block">Autonomous Distinction</span>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-slate-900/80 p-2.5 rounded-2xl border border-slate-800">
            <span className="text-[10px] text-slate-400 block font-sans">Major Project Avg</span>
            <span className="text-base font-bold text-purple-300">93.4 / 100M</span>
            <span className="text-[9px] text-slate-500 block">Course: 25MCC214</span>
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
                  className="bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 rounded-2xl p-4.5 transition-all space-y-3 group relative"
                >
                  {/* Top Bar: Student Name, Roll No, CGPA & Actions */}
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

                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <div className="flex items-baseline gap-1 justify-end">
                          <span className="text-xs font-bold text-amber-300">{senior.cgpa}</span>
                          <span className="text-[10px] text-slate-500">CGPA</span>
                        </div>
                        <span className="text-[10px] text-emerald-400 block">
                          {senior.attendance}% Attendance
                        </span>
                      </div>

                      {/* Card Edit & Delete Actions */}
                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                        <button
                          onClick={() => handleOpenEdit(senior)}
                          title="Edit Senior Record"
                          className="p-1 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmRoll(senior.rollNo)}
                          title="Delete Senior Record"
                          className="p-1 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Inline Delete Confirmation */}
                  {deleteConfirmRoll === senior.rollNo && (
                    <div className="bg-rose-950/80 border border-rose-800 p-2.5 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
                      <span className="text-rose-200">Remove scholar from senior cohort?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDeleteStudent(senior.rollNo)}
                          className="px-2.5 py-1 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-[11px]"
                        >
                          Yes, Delete
                        </button>
                        <button
                          onClick={() => setDeleteConfirmRoll(null)}
                          className="px-2 py-1 bg-slate-800 text-slate-300 rounded-lg text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Major Project Information */}
                  <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-800 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-400 font-bold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Major Project (25MCC214):</span>
                      </span>
                      <span className="text-amber-300 font-mono font-bold text-[10px]">
                        CIE: {senior.majorProject?.cieScore || 95}/100M · SEE: {senior.majorProject?.seeScore || 96}/100M
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
                        LeetCode: <strong>{senior.leetcode || 350} Qs</strong>
                      </span>
                      {senior.github && (
                        <a
                          href={`https://github.com/${senior.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                          <GitBranch className="w-3 h-3 text-slate-400" />
                          <span>GitHub</span>
                        </a>
                      )}
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

      {/* SUB-MODAL 1: ADD / EDIT SENIOR SCHOLAR */}
      {isAddEditOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-lg">
                  {editingStudent ? '✏️' : '➕'}
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">
                    {editingStudent ? `Edit Senior Record (${editingStudent.rollNo})` : 'Add New Senior Scholar'}
                  </h3>
                  <p className="text-xs text-slate-400">MCA Senior Cohort (2023–2025) · Chaitanya Bharathi Institute of Technology</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddEditOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveStudent} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Roll Number (Hall Ticket)</label>
                  <input
                    type="text"
                    required
                    value={formData.rollNo}
                    disabled={!!editingStudent}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    placeholder="1601-24-862-061"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. M. Rithvik Sharma"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="M">Male (M)</option>
                    <option value="F">Female (F)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Graduation CGPA (10.0)</label>
                  <input
                    type="number"
                    step="0.01"
                    min="5.0"
                    max="10.0"
                    required
                    value={formData.cgpa}
                    onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Attendance %</label>
                  <input
                    type="number"
                    min="65"
                    max="100"
                    required
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              {/* Placement Details */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Campus Placement Record</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Recruiting Company</label>
                    <input
                      type="text"
                      value={formData.placementCompany}
                      onChange={(e) => setFormData({ ...formData, placementCompany: e.target.value })}
                      placeholder="e.g. Google / Oracle / TCS"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Designation / Role</label>
                    <input
                      type="text"
                      value={formData.placementRole}
                      onChange={(e) => setFormData({ ...formData, placementRole: e.target.value })}
                      placeholder="Associate Software Engg"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Package CTC (LPA)</label>
                    <input
                      type="text"
                      value={formData.placementPackage}
                      onChange={(e) => setFormData({ ...formData, placementPackage: e.target.value })}
                      placeholder="₹16.0 LPA"
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Major Project Details */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Major Capstone Project (25MCC214 · 14 Credits)</span>
                </span>
                <div>
                  <label className="block text-slate-400 text-[10px] mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    placeholder="e.g. Autonomous Multi-Cloud Kubernetes Orchestrator"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-semibold"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Project Domain</label>
                    <select
                      value={formData.projectDomain}
                      onChange={(e) => setFormData({ ...formData, projectDomain: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    >
                      <option value="Cloud Native & DevOps">Cloud Native & DevOps</option>
                      <option value="AI/ML & Deep Learning">AI/ML & Deep Learning</option>
                      <option value="Distributed Systems & Cloud">Distributed Systems & Cloud</option>
                      <option value="Full-Stack & Cloud Architecture">Full-Stack & Cloud Architecture</option>
                      <option value="Cybersecurity & Network Defense">Cybersecurity & Network Defense</option>
                      <option value="Blockchain & Web3 FinTech">Blockchain & Web3 FinTech</option>
                      <option value="Big Data & IoT Analytics">Big Data & IoT Analytics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Designated Faculty Guide</label>
                    <select
                      value={formData.projectGuide}
                      onChange={(e) => setFormData({ ...formData, projectGuide: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white"
                    >
                      <option value="Dr. B. Indira (HoD)">Dr. B. Indira (HoD)</option>
                      <option value="Smt. B. Swathi Sowmya">Smt. B. Swathi Sowmya</option>
                      <option value="Sri P. Ramesh">Sri P. Ramesh</option>
                      <option value="Dr. K. Radhika">Dr. K. Radhika</option>
                      <option value="Dr. B. Ramana Reddy">Dr. B. Ramana Reddy</option>
                      <option value="Dr. M. Ramchander">Dr. M. Ramchander</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Project CIE Score (Max 100)</label>
                    <input
                      type="number"
                      min="60"
                      max="100"
                      value={formData.cieScore}
                      onChange={(e) => setFormData({ ...formData, cieScore: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 text-[10px] mb-1">Project SEE Score (Max 100)</label>
                    <input
                      type="number"
                      min="60"
                      max="100"
                      value={formData.seeScore}
                      onChange={(e) => setFormData({ ...formData, seeScore: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">GitHub Username</label>
                  <input
                    type="text"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    placeholder="github-username"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">LeetCode Questions Solved</label>
                  <input
                    type="number"
                    value={formData.leetcode}
                    onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
                    placeholder="450"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddEditOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>{editingStudent ? 'Update Senior Scholar' : 'Save Senior to Archive'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUB-MODAL 2: BULK IMPORT SENIORS (CSV / JSON) */}
      {isImportOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 text-white shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-lg">
                  📥
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Import Senior Batch Records</h3>
                  <p className="text-xs text-slate-400">Bulk upload or paste your senior cohort records via CSV or JSON</p>
                </div>
              </div>
              <button
                onClick={() => setIsImportOpen(false)}
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-300">Need the standard spreadsheet format?</span>
              <button
                onClick={handleDownloadTemplate}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-300 font-semibold rounded-xl border border-indigo-500/30 flex items-center gap-1.5 transition"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                <span>Download Sample CSV Template</span>
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <label className="text-slate-300 font-semibold">Upload CSV / JSON File</label>
                <input
                  type="file"
                  accept=".csv,.txt,.json"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-xs file:bg-slate-800 file:text-indigo-300 file:cursor-pointer"
                />
              </div>

              <label className="block text-slate-400 font-semibold pt-1">Or Paste CSV / JSON Data Below:</label>
              <textarea
                rows={8}
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="RollNo,StudentName,CGPA,PlacementCompany,Role,Package,MajorProjectTitle,Domain,FacultyGuide,CIEScore,SEEScore
1601-24-862-061,M. Rithvik Sharma,9.25,Google Cloud,Cloud Solutions Engineer,₹22.0 LPA,High-Throughput Kubernetes Microservices Observability Engine,Cloud & DevOps,Dr. B. Indira (HoD),97,98"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono text-[11px] placeholder-slate-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
              <input
                type="checkbox"
                id="replaceCheck"
                checked={replaceMode}
                onChange={(e) => setReplaceMode(e.target.checked)}
                className="rounded border-slate-700 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="replaceCheck" className="text-slate-300 cursor-pointer">
                <strong>Replace entire senior dataset</strong> (Unchecked = Appends to existing batch)
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setIsImportOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleExecuteImport}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 text-xs"
              >
                <Check className="w-4 h-4" />
                <span>Parse & Import Senior Scholars</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
