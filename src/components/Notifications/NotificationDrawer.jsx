import React, { useState, useEffect, useCallback } from 'react';
import { realtimeDb } from '../../utils/realtimeDb';
import { sounds } from '../../utils/soundEffects';
import { 
  Bell, 
  Database, 
  User, 
  Radio, 
  X, 
  RefreshCw,
  Users
} from 'lucide-react';

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState('alerts'); // 'alerts' | 'logins' | 'users'
  const [serverLogins, setServerLogins] = useState([]);
  const [serverUsers, setServerUsers] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const fetchServerActivity = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [loginsRes, usersRes] = await Promise.all([
        fetch('/api/realtime/logins').then(r => r.json()).catch(() => null),
        fetch('/api/realtime/users').then(r => r.json()).catch(() => null)
      ]);
      if (loginsRes?.success && Array.isArray(loginsRes.logins)) {
        setServerLogins(loginsRes.logins);
      }
      if (usersRes?.success && Array.isArray(usersRes.users)) {
        setServerUsers(usersRes.users);
      }
      setLastSyncedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      // Fallback to localStorage data
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchServerActivity();
    }
  }, [isOpen, fetchServerActivity]);

  if (!isOpen) return null;

  const localLogins = realtimeDb.getLoginHistory();
  const logins = serverLogins.length > 0 ? serverLogins : localLogins;
  const users = serverUsers.length > 0 ? serverUsers : realtimeDb.getRegisteredUsers();
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
              <p className="text-[11px] text-slate-400">
                Multi-User Server Feed {lastSyncedAt ? `· Synced ${lastSyncedAt}` : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                sounds.playTick();
                fetchServerActivity();
              }}
              title="Refresh live multi-user data from server"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-400' : ''}`} />
            </button>
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/60 border-b border-slate-800 text-xs">
          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('alerts');
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all cursor-pointer ${
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
              fetchServerActivity();
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeSubTab === 'logins' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Logins ({logins.length})</span>
          </button>

          <button
            onClick={() => {
              sounds.playTick();
              setActiveSubTab('users');
              fetchServerActivity();
            }}
            className={`flex-1 py-1.5 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
              activeSubTab === 'users' 
                ? 'bg-indigo-600 text-white shadow-sm' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Users ({users.length})</span>
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
                  <span>{serverLogins.length > 0 ? 'Live Central Server Feed' : 'Local Browser Cache'}</span>
                </span>
                <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-emerald-400 border border-emerald-700/50">
                  All Devices
                </span>
              </div>

              {logins.map((log, i) => (
                <div key={log.id || i} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-1 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-100 text-xs font-sans">{log.userName}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      log.role === 'faculty' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                    }`}>
                      {log.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    ID: {log.identifier} · {log.timestamp ? new Date(log.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {log.device || log.ip || 'Web Browser'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSubTab === 'users' && (
            <div className="space-y-2.5">
              <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-[11px] text-indigo-300 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-bold">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Registered & Reset Accounts</span>
                </span>
                <span className="font-mono text-[10px] bg-slate-900 px-2 py-0.5 rounded text-indigo-300 border border-indigo-700/50">
                  Hashed Vault
                </span>
              </div>

              {users.length === 0 ? (
                <div className="p-6 text-center text-slate-400 bg-slate-800/40 rounded-2xl border border-slate-800">
                  No custom registered or password-reset accounts recorded on the server yet.
                </div>
              ) : (
                users.map((u, idx) => (
                  <div key={u.id || u.email || idx} className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/70 space-y-1 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-100 text-xs font-sans">{u.name || u.email}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                        u.role === 'faculty' ? 'bg-blue-900 text-blue-200' : 'bg-purple-900 text-purple-200'
                      }`}>
                        {u.role || 'user'}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {u.rollNo ? `Roll: ${u.rollNo} · ` : ''}{u.email}
                    </div>
                    {(u.serverRegisteredAt || u.passwordResetAt) && (
                      <div className="text-[10px] text-slate-500">
                        Updated: {new Date(u.passwordResetAt || u.serverRegisteredAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 text-slate-400 text-center font-mono text-[10px]">
          CBIT Real-Time Storage · Server-Synced Multi-User Audit
        </div>
      </div>
    </div>
  );
};
