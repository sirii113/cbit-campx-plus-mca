import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { Mic, MicOff, Volume2, Sparkles, Check, AlertCircle, X, Radio, ArrowRight } from 'lucide-react';

export const VoiceMarksModal = ({ isOpen, onClose, examType }) => {
  const { 
    students, 
    selectedCourseCode, 
    updateQuestionMark, 
    updateSlipTestMark,
    updateAssignmentR25,
    showToast 
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [parsedStatus, setParsedStatus] = useState(null);
  const [history, setHistory] = useState([]);
  const [activeRoll, setActiveRoll] = useState('1601-24-862-001');

  useEffect(() => {
    let recognition = null;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const text = event.results[current][0].transcript;
        setTranscript(text);
        if (event.results[current].isFinal) {
          processVoiceCommand(text);
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };
    }

    if (isListening && recognition) {
      try {
        recognition.start();
      } catch (err) {}
    } else if (recognition) {
      recognition.stop();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  const processVoiceCommand = (text) => {
    const raw = text.toLowerCase();
    
    let targetRoll = activeRoll;
    const rollMatch = raw.match(/roll\s*(number\s*)?(\d+)/i) || raw.match(/student\s*(\d+)/i);
    if (rollMatch) {
      const num = parseInt(rollMatch[2], 10);
      const padded = String(num).padStart(3, '0');
      const found = students.find(s => s.rollNo.endsWith(padded));
      if (found) targetRoll = found.rollNo;
    }

    const numberMatches = raw.match(/\b([0-9]|10)\b/g);

    if (numberMatches && numberMatches.length >= 1) {
      const applied = {};
      const studentObj = students.find(s => s.rollNo === targetRoll);
      const studentName = studentObj ? studentObj.name : targetRoll;

      if (examType === 'slip-tests') {
        const sKeys = ['slip1', 'slip2', 'slip3'];
        numberMatches.slice(0, 3).forEach((val, idx) => {
          const k = sKeys[idx];
          const markVal = Math.min(5, Number(val));
          updateSlipTestMark(selectedCourseCode, targetRoll, k, markVal);
          applied[k] = `${markVal}/5`;
        });
      } else if (examType === 'assignments') {
        const aKeys = ['assign1', 'assign2'];
        numberMatches.slice(0, 2).forEach((val, idx) => {
          const k = aKeys[idx];
          const markVal = Math.min(10, Number(val));
          updateAssignmentR25(selectedCourseCode, targetRoll, k, markVal);
          applied[k] = `${markVal}/10`;
        });
      } else {
        // Questions or General Mid
        const qKeys = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5'];
        numberMatches.slice(0, 5).forEach((val, idx) => {
          const qKey = qKeys[idx];
          const markVal = Math.min(4, Number(val));
          updateQuestionMark(selectedCourseCode, targetRoll, 'mid1', qKey, markVal);
          applied[qKey] = `${markVal}/4`;
        });
      }

      sounds.playSuccessChime();

      setParsedStatus({
        success: true,
        message: `Saved R25 marks for ${studentName} (${targetRoll})`,
        applied
      });

      setHistory(prev => [
        {
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          roll: targetRoll,
          name: studentName,
          marks: applied
        },
        ...prev.slice(0, 4)
      ]);

      showToast(`Voice entered marks for ${studentName}`, 'success');

      // Auto-advance to next student
      const currentIndex = students.findIndex(s => s.rollNo === targetRoll);
      if (currentIndex !== -1 && currentIndex + 1 < students.length) {
        setActiveRoll(students[currentIndex + 1].rollNo);
      }
    } else {
      sounds.playAlertTone();
      setParsedStatus({
        success: false,
        message: `Could not parse numbers from "${text}". Try: "Roll 1, 5, 4, 5"`
      });
    }
  };

  const triggerSimulation = (cmd) => {
    setTranscript(cmd);
    processVoiceCommand(cmd);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden flex flex-col text-white animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
              <Radio className="w-6 h-6 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg tracking-tight">R-25 AI Voice Grading Cockpit</h3>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Multimodal
                </span>
              </div>
              <p className="text-xs text-indigo-200">Hands-free entry for Slip Tests (5M), Mids (20M), & Assignments (10M)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Target Student Floating Pill */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700">
            <div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest block">Active Target Student</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono font-bold text-sm text-amber-300">{activeRoll}</span>
                <span className="text-sm font-semibold text-white">
                  {students.find(s => s.rollNo === activeRoll)?.name}
                </span>
              </div>
            </div>
            <select
              value={activeRoll}
              onChange={(e) => setActiveRoll(e.target.value)}
              className="text-xs border border-slate-700 rounded-xl p-2 bg-slate-900 text-slate-200 font-mono focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              {students.map(s => (
                <option key={s.rollNo} value={s.rollNo}>
                  {s.rollNo.slice(-3)}: {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Interactive Equalizer & Mic Orb */}
          <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-slate-800/40 to-slate-950/60 rounded-3xl border border-slate-800 p-6 relative overflow-hidden">
            {/* Audio Waveform Equalizer Bars */}
            <div className="flex items-center gap-1.5 h-10 mb-4">
              {[12, 24, 36, 18, 30, 42, 20, 32, 14, 28, 40, 16].map((h, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isListening 
                      ? 'bg-gradient-to-t from-indigo-500 to-amber-400 animate-pulse' 
                      : 'bg-slate-700 h-2'
                  }`}
                  style={{
                    height: isListening ? `${Math.max(8, (h + (i % 3) * 6))}px` : '4px',
                    animationDelay: `${i * 0.08}s`
                  }}
                />
              ))}
            </div>

            {/* Glowing Mic Button */}
            <button
              onClick={() => {
                sounds.playTick();
                setIsListening(!isListening);
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-105 active:scale-95 z-10 ${
                isListening 
                  ? 'bg-gradient-to-tr from-rose-600 to-red-500 text-white shadow-rose-500/50 ring-4 ring-rose-500/30 animate-pulse' 
                  : 'bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-indigo-600/40 hover:from-indigo-500 hover:to-blue-500'
              }`}
            >
              {isListening ? <Mic className="w-9 h-9" /> : <MicOff className="w-9 h-9 text-slate-300" />}
            </button>

            <span className="text-xs font-bold mt-4 text-slate-200 z-10">
              {isListening ? 'Listening for faculty voice dictation...' : 'Click Mic to Start Hands-Free Dictation'}
            </span>
            <p className="text-[11px] text-slate-400 mt-1 z-10">
              Speak: <span className="text-amber-300 font-mono">"Roll 1, 5, 4, 5"</span> (Slip Tests) or <span className="text-blue-300 font-mono">"Roll 1, 9, 8"</span> (Assignments)
            </p>

            {transcript && (
              <div className="mt-4 w-full bg-slate-900/90 p-3 rounded-2xl border border-slate-700 text-center font-mono text-xs text-amber-300 shadow-inner z-10">
                "{transcript}"
              </div>
            )}
          </div>

          {/* Parsed Status Feedback */}
          {parsedStatus && (
            <div className={`p-3.5 rounded-2xl text-xs flex items-start gap-3 border ${
              parsedStatus.success 
                ? 'bg-emerald-950/40 text-emerald-200 border-emerald-500/40' 
                : 'bg-amber-950/40 text-amber-200 border-amber-500/40'
            }`}>
              {parsedStatus.success ? <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
              <div className="flex-1">
                <span className="font-bold">{parsedStatus.message}</span>
                {parsedStatus.applied && (
                  <div className="flex gap-2 mt-1.5 font-mono text-[11px]">
                    {Object.entries(parsedStatus.applied).map(([k, val]) => (
                      <span key={k} className="bg-slate-900 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-300">
                        {k.toUpperCase()}: {val}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* R25 Voice Simulation Presets */}
          <div className="border-t border-slate-800 pt-3">
            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              R25 One-Click Simulation Presets:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => triggerSimulation("Roll 1, 5, 5, 5")}
                className="text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-emerald-500/50 text-xs transition-all group"
              >
                <div className="font-mono font-bold text-emerald-300 group-hover:text-amber-300">"Roll 1, 5, 5, 5"</div>
                <div className="text-[10px] text-slate-400">Slip Tests: Perfect 15/15</div>
              </button>

              <button
                onClick={() => triggerSimulation("Roll 2, 9, 10")}
                className="text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-purple-500/50 text-xs transition-all group"
              >
                <div className="font-mono font-bold text-purple-300 group-hover:text-amber-300">"Roll 2, 9, 10"</div>
                <div className="text-[10px] text-slate-400">Assignments: Avg 9.5/10</div>
              </button>

              <button
                onClick={() => triggerSimulation("Roll 9, 2, 1, 2")}
                className="text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-rose-500/50 text-xs transition-all group"
              >
                <div className="font-mono font-bold text-rose-300 group-hover:text-rose-200">"Roll 9, 2, 1, 2"</div>
                <div className="text-[10px] text-slate-400">Low Slip Tests: Triggers Remedial</div>
              </button>

              <button
                onClick={() => triggerSimulation("Roll 15, 4, 4, 3, 4, 4")}
                className="text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/80 hover:border-indigo-500/50 text-xs transition-all group"
              >
                <div className="font-mono font-bold text-indigo-300 group-hover:text-amber-300">"Roll 15, 4, 4, 3, 4, 4"</div>
                <div className="text-[10px] text-slate-400">Mid Exam: 19/20</div>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>R25 Voice Assistant advances to next student automatically</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all"
          >
            Done Grading
          </button>
        </div>
      </div>
    </div>
  );
};
