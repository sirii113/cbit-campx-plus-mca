import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { 
  KeyRound, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  AlertTriangle
} from 'lucide-react';

export const FacultyPinManagementModal = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    updateFacultyStaffPin
  } = useApp();

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);

  // Restricted: only already-authenticated Faculty can open this modal
  if (!isOpen || currentUser?.role !== 'faculty') return null;

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateMsg(null);

    if (newPin !== confirmPin) {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: 'New PIN and Confirm PIN do not match.' });
      return;
    }

    if (newPin.trim().length < 4) {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: 'PIN must be at least 4 characters long.' });
      return;
    }

    const res = updateFacultyStaffPin(currentPin, newPin);
    if (res.success) {
      sounds.playSuccessChime();
      setUpdateMsg({ type: 'success', text: `Staff Security PIN updated and synced to server database!` });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    } else {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: res.error });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-indigo-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                <span>Change Faculty Security PIN</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  Faculty Only
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Update your confidential Staff PIN (stored in server Security PIN DB)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body (Change PIN Only — No Forgot PIN Option) */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          <form onSubmit={handleUpdate} className="space-y-4">
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter your current Faculty Security PIN to set a new PIN. New PINs are saved to the restricted server database (<code className="text-amber-300 font-mono">data/realtime_security_pins.json</code>).
            </p>

            {/* Current PIN */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Current Staff Security PIN:
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                <input
                  type={showCurrentPin ? "text" : "password"}
                  required
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  placeholder="Enter current PIN..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-amber-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPin(!showCurrentPin)}
                  className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                >
                  {showCurrentPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* New PIN */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  New Security PIN:
                </label>
                <div className="relative">
                  <input
                    type={showNewPin ? "text" : "password"}
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Min. 4 characters..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 pr-9 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-2.5 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showNewPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Confirm New PIN:
                </label>
                <input
                  type={showNewPin ? "text" : "password"}
                  required
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Re-enter new PIN..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>
            </div>

            {updateMsg && (
              <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                updateMsg.type === 'success' 
                  ? 'bg-emerald-950/80 border border-emerald-600/40 text-emerald-300' 
                  : 'bg-rose-950/80 border border-rose-600/40 text-rose-300'
              }`}>
                {updateMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                <span>{updateMsg.text}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-900/30 flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Save New Security PIN</span>
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            CBIT Autonomous MCA · Security Vault Layer
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
