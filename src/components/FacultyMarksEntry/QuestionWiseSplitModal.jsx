import React from 'react';
import { useApp } from '../../context/AppContext';
import { BLOOMS_LEVELS, COURSE_OUTCOMES } from '../../data/mockCbitData';
import { Tag, BookOpen, Layers, X, Info } from 'lucide-react';

export const QuestionWiseSplitModal = ({ isOpen, onClose }) => {
  const { selectedCourse } = useApp();

  if (!isOpen || !selectedCourse || selectedCourse.type === 'Practical') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Layers className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">
                OBE Question Blueprint & Bloom's Taxonomy Matrix
              </h3>
              <p className="text-xs text-blue-200">
                {selectedCourse.code} · {selectedCourse.name}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Note Banner */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Each Mid-Term question is formally mapped to a Bloom's Cognitive Domain Level (L1 to L6) and Course Outcome (CO1 to CO5). Every mark entered automatically computes real-time NBA attainment.
            </span>
          </div>

          {/* Mid 1 Mapping */}
          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              Mid-Term Test 1 (20 Marks Max - 4 Marks / Question)
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Q.No</th>
                    <th className="p-2.5">Question Topic / Concept</th>
                    <th className="p-2.5 text-center">Max Marks</th>
                    <th className="p-2.5 text-center">Course Outcome</th>
                    <th className="p-2.5 text-center">Bloom's Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCourse.examQuestions?.mid1?.map(q => (
                    <tr key={q.qNo} className="hover:bg-slate-50 font-medium">
                      <td className="p-2.5 font-bold text-blue-700 font-mono">{q.qNo}</td>
                      <td className="p-2.5 text-slate-800">{q.title}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-slate-700">{q.maxMarks}m</td>
                      <td className="p-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                          {q.co}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {q.bloom}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mid 2 Mapping */}
          <div>
            <h4 className="font-bold text-sm text-slate-800 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              Mid-Term Test 2 (20 Marks Max - 4 Marks / Question)
            </h4>
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 text-slate-700 font-semibold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">Q.No</th>
                    <th className="p-2.5">Question Topic / Concept</th>
                    <th className="p-2.5 text-center">Max Marks</th>
                    <th className="p-2.5 text-center">Course Outcome</th>
                    <th className="p-2.5 text-center">Bloom's Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCourse.examQuestions?.mid2?.map(q => (
                    <tr key={q.qNo} className="hover:bg-slate-50 font-medium">
                      <td className="p-2.5 font-bold text-indigo-700 font-mono">{q.qNo}</td>
                      <td className="p-2.5 text-slate-800">{q.title}</td>
                      <td className="p-2.5 text-center font-mono font-bold text-slate-700">{q.maxMarks}m</td>
                      <td className="p-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">
                          {q.co}
                        </span>
                      </td>
                      <td className="p-2.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          {q.bloom}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bloom's Reference Glossary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs font-bold text-slate-700 block mb-2">Bloom's Cognitive Taxonomy Reference</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {BLOOMS_LEVELS.map(b => (
                <div key={b.code} className="p-2 rounded-lg bg-white border border-slate-200 text-xs">
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold mr-1.5 border ${b.color}`}>
                    {b.code}
                  </span>
                  <span className="text-slate-700 font-medium">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-medium text-xs rounded-lg transition-colors"
          >
            Close Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};
