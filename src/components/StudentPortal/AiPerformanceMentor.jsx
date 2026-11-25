import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  Brain, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Compass, 
  Lightbulb, 
  RefreshCw,
  Trophy,
  Zap
} from 'lucide-react';

export const AiPerformanceMentor = ({ student }) => {
  const { marksData, courses, showToast } = useApp();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const handleRefreshAi = () => {
    sounds.playTick();
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      sounds.playSuccessChime();
      showToast('AI Performance Insights synthesized with latest CIE marks!', 'success');
      if (student.cgpa >= 8.5) {
        triggerConfetti();
      }
    }, 700);
  };

  const isHighPerformer = student.cgpa >= 8.5;
  const isAtRisk = student.attendance < 75 || student.cgpa < 7.0;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              CampX+ AI Academic Mentor
              <span className="text-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                GenAI Live
              </span>
            </h3>
            <p className="text-xs text-slate-500">Autonomous diagnostic feedback tailored for {student.name}</p>
          </div>
        </div>

        <button
          onClick={handleRefreshAi}
          disabled={isAnalyzing}
          className="p-2.5 rounded-2xl text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 transition-all flex items-center gap-1.5 text-xs font-bold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin text-indigo-600' : ''}`} />
          <span className="hidden sm:inline">Synthesize AI Advice</span>
        </button>
      </div>

      {/* AI High-Level Verdict */}
      <div className={`p-5 rounded-2xl border text-xs flex items-start gap-3.5 ${
        isHighPerformer 
          ? 'bg-purple-50/80 border-purple-200 text-purple-950' 
          : isAtRisk 
          ? 'bg-rose-50/80 border-rose-200 text-rose-950' 
          : 'bg-blue-50/80 border-blue-200 text-blue-950'
      }`}>
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-black text-sm">
            {isHighPerformer 
              ? 'Academic Distinction & Tier-1 Placement Trajectory' 
              : isAtRisk 
              ? 'Immediate Academic Course-Correction Advised' 
              : 'Steady Performance with Targeted Growth Potential'}
          </div>
          <p className="leading-relaxed text-slate-700">
            {isHighPerformer
              ? `Demonstrates exceptional mastery across Core Algorithms and Web Frameworks. Internal evaluation marks place ${student.name} in the top 10% of the CBIT MCA cohort.`
              : isAtRisk
              ? `Attendance deficit (${student.attendance}%) and marginal CIE margins indicate high risk of condonation fees or semester backlog. Focus required on upcoming Mid-2 tests.`
              : `Consistent academic record with CGPA of ${student.cgpa}. Solid performance in coursework; elevating DSA problem-solving count will unlock premium software engineering opportunities.`}
          </p>
        </div>
      </div>

      {/* Cognitive Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Demonstrated Academic Strengths
          </span>
          <ul className="text-xs space-y-2.5 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>CO1 & CO2 Algorithmic Concepts:</strong> High marks in Asymptotic analysis, Tree structures, and React Hooks.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Practical Lab Discipline:</strong> Verified Git commit history on GitHub ({student.github}) with clean modular code.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
              <span><strong>Continuous Assessment:</strong> Consistent 9+/10 marks in assignments and LMS submissions.</span>
            </li>
          </ul>
        </div>

        {/* Areas for Growth */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-600" />
            Curated Remediation & Focus Areas
          </span>
          <ul className="text-xs space-y-2.5 text-slate-700">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
              <span><strong>CO3 Advanced Problem Solving:</strong> Mid-exam questions on Dynamic Programming and Graph flows had a 20% score drop.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
              <span><strong>NoSQL & Transaction Protocols:</strong> Review ARIES crash recovery and MongoDB aggregation pipelines for SEE prep.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
              <span><strong>Coding Interview Frequency:</strong> Target 20 more LeetCode Medium problems in Graphs and DP before TPO campus season.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Recommended Learning Action Items */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Recommended CBIT Learning Modules:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-indigo-400 hover:shadow-md transition-all">
            <span className="text-[10px] text-indigo-700 font-bold block uppercase">CBIT MCA Library</span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">DP & Greedy Reference Handbook</span>
            <span className="text-[11px] text-slate-500">Cormen / CLRS Chapter 15 & 16</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-[10px] text-emerald-700 font-bold block uppercase">Lab Sandbox</span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">Full Stack Docker CI/CD Starter</span>
            <span className="text-[11px] text-slate-500">GitHub Classroom Assignment 4</span>
          </div>
          <div className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-purple-400 hover:shadow-md transition-all">
            <span className="text-[10px] text-purple-700 font-bold block uppercase">TPO Placement Mock</span>
            <span className="text-xs font-bold text-slate-800 block mt-0.5">MCA Technical Aptitude Test 3</span>
            <span className="text-[11px] text-slate-500">Scheduled on HackerEarth</span>
          </div>
        </div>
      </div>
    </div>
  );
};
