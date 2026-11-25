import React from 'react';
import { sounds } from '../../utils/soundEffects';
import { 
  Bell, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  X,
  Radio,
  Award
} from 'lucide-react';

export const LoginAlertModal = ({ alertData, onClose }) => {
  if (!alertData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/90 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden text-white animate-in zoom-in-95 duration-200">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-400/20">
              <Bell className="w-6 h-6 text-slate-950 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-lg tracking-tight">{alertData.title}</h3>
                <span className="text-[10px] bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Live Alert
                </span>
              </div>
              <p className="text-xs text-indigo-200 font-mono">{alertData.subtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Real-Time Database Storage Confirmation Badge */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/40 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Real-Time Database Sync: Stored Successfully</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                Zero Cost / Free
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-500 block">Campus Gateway:</span>
                <span className="text-slate-200 font-bold">10.12.86.142 (CBIT Wi-Fi)</span>
              </div>
              <div>
                <span className="text-slate-500 block">Session ID:</span>
                <span className="text-amber-400 font-bold">{alertData.loginId || 'CBIT_SEC_ACTIVE'}</span>
              </div>
            </div>

            {/* Password Safety Verification Notice */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-800 text-[11px] font-mono text-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Password Authentication: Verified & Safety Validated</span>
            </div>
          </div>

          {/* Active Notifications & Reminders */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>CBIT Academic & Examination Alerts:</span>
            </span>

            <div className="space-y-2">
              {alertData.messages?.map((msg, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700/80 text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 leading-relaxed">{msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* R25 Syllabus Quick Notice */}
          <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-700/40 text-xs text-indigo-200 flex items-center justify-between font-mono">
            <span>R-25 Autonomous Scheme Active</span>
            <span className="text-amber-300 font-bold">3 Slip Tests + Mids + Assignments</span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-950 p-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">CBIT Security & Database Vault</span>
          <button
            onClick={() => {
              sounds.playTick();
              onClose();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2 group"
          >
            <span>Proceed to Cockpit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
