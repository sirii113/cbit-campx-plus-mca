import React, { useState } from 'react';
import { realtimeDb } from '../../utils/realtimeDb';
import { sounds } from '../../utils/soundEffects';
import { 
  Bell, 
  Database, 
  Clock, 
  ShieldCheck, 
  User, 
  Radio, 
  X, 
  CheckCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState('alerts'); // 'alerts' | 'logins' | 'db-status'
  
  if (!isOpen) return null;

  const logins = realtimeDb.getLoginHistory();
  const notifications = realtimeDb.getNotifications();

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl text-white">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
              <Bell className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Live Notification & Real-Time DB</h3>
              <p className="text-[11px] text-slate-400">CBIT Department of Computer Applications</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center p-2 bg-slate-950/60 border-b border-slate-800 text-xs">
          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('alerts');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              activeSubTab === 'alerts' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📢 Alerts ({notifications.length})
          </button>

          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('logins');
            }}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeSubTab === 'logins' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>DB Logins ({logins.length})</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
          {activeSubTab === 'alerts' && (
            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{n.message}</p>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'logins' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>Real-Time Database Feed Live</span>
                </span>
                <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-emerald-400 border border-emerald-700/50">
                  Zero-Cost Storage
                </span>
              </div>

              {logins.map(log => (
                <div key={log.id} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-1 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-xs font-sans">{log.userName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      log.role === 'faculty' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                    }`}>
                      {log.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ID: {log.identifier} · {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    IP: {log.ip}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-slate-400 text-center font-mono text-[10px]">
          CBIT Real-Time Storage · Fully Free Forever · Auto-Synchronized
        </div>
      </div>
    </div>
  );
};
