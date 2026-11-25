import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import { 
  KeyRound, 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  CheckCircle2, 
  X, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  AlertTriangle,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';

export const FacultyPinManagementModal = ({ isOpen, onClose }) => {
  const { 
    currentUser, 
    updateFacultyStaffPin, 
    recoverFacultyStaffPin, 
    getAuthorizedStaffPins 
  } = useApp();

  const [activeTab, setActiveTab] = useState('update'); // 'update' or 'recover'
  
  // Update state
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showCurrentPin, setShowCurrentPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [updateMsg, setUpdateMsg] = useState(null);

  // Recovery state (if faculty forgot PIN)
  const [recoveryKey, setRecoveryKey] = useState('');
  const [facultyEmail, setFacultyEmail] = useState(currentUser?.email || '');
  const [recoveredNewPin, setRecoveredNewPin] = useState('');
  const [showRecoveredPin, setShowRecoveredPin] = useState(false);
  const [recoverMsg, setRecoverMsg] = useState(null);

  const [copiedPin, setCopiedPin] = useState(false);

  if (!isOpen) return null;

  const currentPins = getAuthorizedStaffPins();

  const handleUpdate = (e) => {
    e.preventDefault();
    setUpdateMsg(null);

    if (newPin !== confirmPin) {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: 'New PIN and Confirm PIN do not match.' });
      return;
    }

    if (newPin.length < 4) {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: 'PIN must be at least 4 characters long.' });
      return;
    }

    const res = updateFacultyStaffPin(currentPin, newPin);
    if (res.success) {
      sounds.playSuccessChime();
      setUpdateMsg({ type: 'success', text: `Staff Security PIN updated successfully! Active PIN: ${res.newPin}` });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
    } else {
      sounds.playAlertTone();
      setUpdateMsg({ type: 'error', text: res.error });
    }
  };

  const handleRecover = (e) => {
    e.preventDefault();
    setRecoverMsg(null);

    if (recoveredNewPin.length < 4) {
      sounds.playAlertTone();
      setRecoverMsg({ type: 'error', text: 'New PIN must be at least 4 characters long.' });
      return;
    }

    const res = recoverFacultyStaffPin(recoveryKey, recoveredNewPin, facultyEmail);
    if (res.success) {
      sounds.playSuccessChime();
      setRecoverMsg({ type: 'success', text: res.message });
      setRecoveryKey('');
      setRecoveredNewPin('');
    } else {
      sounds.playAlertTone();
      setRecoverMsg({ type: 'error', text: res.error });
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2000);
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
                <span>Faculty Staff Security PIN Portal</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-mono">
                  Administrative
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage, edit, or recover confidential staff PINs for CBIT MCA faculty
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-3 bg-slate-950/90 border-b border-slate-800 flex gap-2">
          <button
            type="button"
            onClick={() => {
              sounds.playTick();
              setActiveTab('update');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'update'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            ✏️ Change / Edit PIN
          </button>

          <button
            type="button"
            onClick={() => {
              sounds.playTick();
              setActiveTab('recover');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'recover'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-900/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🆘 Forgot PIN? Emergency Recovery
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Active Authorized PINs Reference Box */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 text-amber-300">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Authorized Active Staff PINs:</span>
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(currentPins[0])}
                className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
              >
                {copiedPin ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPin ? 'Copied!' : 'Copy Master PIN'}</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {currentPins.map(pin => (
                <span 
                  key={pin}
                  className="bg-amber-950/60 border border-amber-600/40 text-amber-300 font-mono text-xs font-bold px-2.5 py-1 rounded-xl"
                >
                  {pin}
                </span>
              ))}
            </div>
          </div>

          {/* TAB 1: UPDATE PIN */}
          {activeTab === 'update' && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your current faculty security PIN to define a new custom PIN for your account or department.
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
                    placeholder="Enter current PIN (e.g. CBIT-FAC-2025)..."
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
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  New Custom Staff PIN:
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-emerald-500 absolute left-3.5 top-3" />
                  <input
                    type={showNewPin ? "text" : "password"}
                    required
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="Enter new PIN (e.g. FAC-2026, CBIT-INDIRA)..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-emerald-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPin(!showNewPin)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showNewPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Confirm New PIN */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Confirm New PIN:
                </label>
                <input
                  type="password"
                  required
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  placeholder="Re-type new PIN..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
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
                className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-900/40 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save & Activate New Staff PIN</span>
              </button>
            </form>
          )}

          {/* TAB 2: RECOVER FORGOTTEN PIN */}
          {activeTab === 'recover' && (
            <form onSubmit={handleRecover} className="space-y-4">
              <div className="bg-rose-950/40 border border-rose-700/40 rounded-2xl p-3.5 text-xs text-rose-200">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-rose-300">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span>Forgot your Staff PIN? Emergency Recovery:</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  If a faculty member forgets their security PIN, they can unlock and reset it using the <strong>Master HoD Recovery Key</strong>: <code className="bg-rose-950 text-rose-300 px-1 py-0.5 rounded font-mono font-bold">CBIT-HOD-RECOVERY</code> or Department Code <code className="bg-rose-950 text-rose-300 px-1 py-0.5 rounded font-mono font-bold">CBIT-MCA</code> with their registered email.
                </p>
              </div>

              {/* Master Recovery Key */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                  <span>Emergency HoD Recovery Key:</span>
                  <button
                    type="button"
                    onClick={() => setRecoveryKey('CBIT-HOD-RECOVERY')}
                    className="text-[10px] text-rose-400 hover:text-rose-300 underline font-semibold font-mono"
                  >
                    ⚡ Fill HoD Key
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={recoveryKey}
                  onChange={(e) => setRecoveryKey(e.target.value)}
                  placeholder="Enter Master Recovery Key (e.g. CBIT-HOD-RECOVERY)..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-rose-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 font-mono"
                />
              </div>

              {/* Faculty Email */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Registered Faculty Email:
                </label>
                <input
                  type="email"
                  required
                  value={facultyEmail}
                  onChange={(e) => setFacultyEmail(e.target.value)}
                  placeholder="e.g. b.indira@cbit.ac.in..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono"
                />
              </div>

              {/* New Staff PIN to Set */}
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Set Your New Staff Security PIN:
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-amber-500 absolute left-3.5 top-3" />
                  <input
                    type={showRecoveredPin ? "text" : "password"}
                    required
                    value={recoveredNewPin}
                    onChange={(e) => setRecoveredNewPin(e.target.value)}
                    placeholder="Enter new PIN (e.g. CBIT-FAC-2025)..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-amber-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRecoveredPin(!showRecoveredPin)}
                    className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                  >
                    {showRecoveredPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {recoverMsg && (
                <div className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  recoverMsg.type === 'success' 
                    ? 'bg-emerald-950/80 border border-emerald-600/40 text-emerald-300' 
                    : 'bg-rose-950/80 border border-rose-600/40 text-rose-300'
                }`}>
                  {recoverMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                  <span>{recoverMsg.text}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Master Key & Restore Staff PIN</span>
              </button>
            </form>
          )}

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
