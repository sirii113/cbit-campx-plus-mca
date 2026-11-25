import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { simulateTargetRequirements } from '../../utils/calculations';
import { sounds } from '../../utils/soundEffects';
import { Calculator, Target, Sparkles, TrendingUp, CheckCircle2, AlertCircle, Zap } from 'lucide-react';

export const WhatIfSimulator = ({ student }) => {
  const [targetCgpa, setTargetCgpa] = useState(8.5);
  const [completedCredits, setCompletedCredits] = useState(24);
  const [currentSemCredits, setCurrentSemCredits] = useState(20);

  const simulation = simulateTargetRequirements(
    student.cgpa,
    targetCgpa,
    completedCredits,
    currentSemCredits
  );

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-500/25">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base">What-If CGPA & Exam Flight Simulator</h3>
            <p className="text-xs text-slate-500">Calculate exact marks required in upcoming Mid-2 and SEE exams</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-3 py-1.5 rounded-xl border border-purple-200">
          Current CGPA: {student.cgpa}
        </span>
      </div>

      {/* Target CGPA Range Slider */}
      <div className="space-y-4 bg-gradient-to-br from-slate-50 to-purple-50/30 p-5 rounded-2xl border border-purple-100/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-purple-600" />
            <span>Target Desired CGPA:</span>
          </label>
          <div className="flex items-baseline gap-1 font-mono">
            <span className="text-3xl font-black text-purple-700">
              {targetCgpa.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500">/ 10.0</span>
          </div>
        </div>

        <input
          type="range"
          min="6.0"
          max="10.0"
          step="0.05"
          value={targetCgpa}
          onChange={(e) => {
            sounds.playTick();
            setTargetCgpa(parseFloat(e.target.value));
          }}
          className="w-full accent-purple-600 cursor-pointer h-2.5 bg-slate-200 rounded-lg"
        />

        <div className="flex justify-between text-[11px] text-slate-500 font-mono">
          <span>6.0 Pass</span>
          <span>7.5 First Class</span>
          <span className="text-purple-700 font-bold">8.5 Tier-1 Eligibility</span>
          <span>10.0 Max</span>
        </div>
      </div>

      {/* Result Simulation Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Required SGPA card */}
        <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-1">
          <span className="text-[10px] font-bold text-purple-800 uppercase tracking-widest block">
            Required Semester SGPA
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-purple-950">
              {simulation.requiredSgpa}
            </span>
            <span className="text-xs text-purple-700">/ 10.0 Grade Point</span>
          </div>
          <span className="text-xs text-slate-600 block mt-1">
            Feasibility: <strong className="text-purple-900">{simulation.feasibility}</strong>
          </span>
        </div>

        {/* Required Average Marks Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">
            Target Overall Exam Score
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black font-mono text-slate-900">
              {simulation.requiredAverageScore}%
            </span>
            <span className="text-xs text-slate-500">across Theory & Labs</span>
          </div>
          <span className="text-xs text-slate-600 block mt-1">
            Approx. <strong className="text-slate-800">26+/30 in CIE</strong> & <strong className="text-slate-800">55+/70 in SEE</strong>
          </span>
        </div>
      </div>

      {/* Strategic Advice */}
      <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-sm mb-0.5">CampX+ Strategic Advice:</span>
          <span className="leading-relaxed text-slate-700">{simulation.advice}</span>
        </div>
      </div>
    </div>
  );
};
