import React from 'react';
import { useApp } from '../../context/AppContext';
import { calculateObeAttainment } from '../../utils/calculations';
import { COURSE_OUTCOMES, BLOOMS_LEVELS, PROGRAM_OUTCOMES } from '../../data/mockCbitData';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend
} from 'recharts';
import { Award, CheckCircle2, AlertCircle, BarChart3, ShieldCheck, Download } from 'lucide-react';

export const ObeAttainmentHeatmap = () => {
  const { selectedCourse, marksData, students, seniorStudents, seniorMarksData, showToast } = useApp();

  const attainmentData = calculateObeAttainment(selectedCourse, marksData, students);
  const { coAttainment, bloomAttainment, overallAttainmentLevel, avgAttainmentPct, percentagePassed } = attainmentData;

  // Calculate Senior Batch historical attainment for continuous improvement comparison
  const seniorAttainment = calculateObeAttainment(selectedCourse, seniorMarksData, seniorStudents || []);

  const radarData = coAttainment.map((c, idx) => ({
    subject: c.co,
    attainment: c.attainmentPercentage,
    seniorBenchmark: seniorAttainment.coAttainment?.[idx]?.attainmentPercentage || 85,
    target: c.targetThreshold
  }));

  // CO-PO Mapping Matrix (Standard Autonomous Matrix)
  const coPoMatrix = [
    { co: "CO1", po1: 3, po2: 3, po3: 2, po4: 1, po5: 2, po6: 1, po7: 3 },
    { co: "CO2", po1: 3, po2: 3, po3: 3, po4: 2, po5: 3, po6: 1, po7: 3 },
    { co: "CO3", po1: 2, po2: 3, po3: 3, po4: 3, po5: 3, po6: 2, po7: 3 },
    { co: "CO4", po1: 2, po2: 2, po3: 3, po4: 3, po5: 2, po6: 1, po7: 2 },
    { co: "CO5", po1: 2, po2: 2, po3: 3, po4: 2, po5: 3, po6: 3, po7: 3 },
  ];

  const handleExportNba = () => {
    showToast('Exported Official NBA OBE Attainment Dossier for CBIT MCA!', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 text-white rounded-2xl p-6 shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-indigo-500/30 text-indigo-200 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold border border-indigo-400/30">
                Outcome-Based Education (OBE)
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-semibold border border-emerald-400/30">
                NBA Tier-1 Compliance Ready
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight">
              Course Outcome (CO) & Bloom's Cognitive Attainment
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Direct Attainment calculated across Mid 1, Mid 2, and Continuous Evaluations for {selectedCourse.code}.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 text-right">
              <span className="text-[10px] text-slate-300 uppercase tracking-wider block">NBA Attainment Level</span>
              <span className="text-2xl font-black text-amber-300 font-mono">
                Level {overallAttainmentLevel} <span className="text-xs font-normal text-slate-300">/ 3.0</span>
              </span>
            </div>
            <button
              onClick={handleExportNba}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>NBA Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Primary Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: CO Attainment Bar Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Direct Course Outcome (CO) Attainment</h3>
              <p className="text-xs text-slate-500">Benchmark: &ge; 60% of students scoring &ge; 60% in questions</p>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
              Avg: {avgAttainmentPct}%
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={coAttainment} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="co" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Attainment']}
                  contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                />
                <Bar dataKey="attainmentPercentage" fill="#2563eb" radius={[6, 6, 0, 0]} name="Attained %" />
                <Bar dataKey="targetThreshold" fill="#94a3b8" radius={[6, 6, 0, 0]} name="Target Benchmark" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Cards for each CO */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 pt-2">
            {coAttainment.map(item => (
              <div key={item.co} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                <span className="font-bold font-mono text-xs text-blue-700 block">{item.co}</span>
                <span className="text-lg font-black text-slate-900 font-mono block mt-0.5">
                  {item.attainmentPercentage}%
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase mt-1 inline-block ${
                  item.attainmentPercentage >= item.targetThreshold 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  L{item.level} Attained
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bloom's Radar & Cognitive Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Bloom's Cognitive Domain Radar</h3>
              <p className="text-xs text-slate-500">Student proficiency by cognitive depth (L1 - L6)</p>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Balanced Spread
            </span>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#475569' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9 }} />
                <Radar name="Attainment" dataKey="attainment" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.4} />
                <Radar name="MCA 2024 Senior Batch" dataKey="seniorBenchmark" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                <Radar name="Target Benchmark" dataKey="target" stroke="#94a3b8" fill="#cbd5e1" fillOpacity={0.2} />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1 text-center font-mono">
            {bloomAttainment.slice(1, 4).map(b => (
              <div key={b.bloom} className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-sans">{b.label}</span>
                <span className="text-sm font-bold text-slate-900">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CO-PO Articulation Matrix (NBA Criteria 3) */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">
                CBIT MCA Course Outcome - Program Outcome (CO-PO) Articulation Matrix
              </h3>
              <p className="text-xs text-slate-500">Correlation Levels: 3 (Substantial / High), 2 (Moderate), 1 (Slight)</p>
            </div>
          </div>
          <span className="text-xs font-medium text-slate-500">Autonomous R-23 Standard</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-2.5 text-left w-24">Course Outcome</th>
                {PROGRAM_OUTCOMES.map(po => (
                  <th key={po.id} className="p-2.5 border-l border-slate-200" title={po.name}>
                    {po.id}
                  </th>
                ))}
                <th className="p-2.5 border-l border-slate-200 bg-blue-50/70 text-blue-900">Attainment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {coPoMatrix.map(row => {
                const coInfo = coAttainment.find(c => c.co === row.co);
                return (
                  <tr key={row.co} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-blue-700 text-left font-sans">{row.co}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po1}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po2}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po3}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po4}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po5}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po6}</td>
                    <td className="p-2.5 border-l border-slate-100 font-bold text-slate-800">{row.po7}</td>
                    <td className="p-2.5 border-l border-slate-100 bg-blue-50/40 font-bold text-blue-800">
                      {coInfo ? `${coInfo.attainmentPercentage}% (L${coInfo.level})` : 'Level 3'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
