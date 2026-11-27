import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { sounds } from '../../utils/soundEffects';
import {
  Pin,
  Calendar,
  BookOpen,
  Plus,
  Trash2,
  RefreshCw,
  CheckCircle2,
  Clock,
  Sparkles,
  FileText,
  Filter
} from 'lucide-react';

const DEFAULT_NOTICES = [
  {
    id: 'notice_slip_1',
    category: 'Slip Test',
    courseCode: '25MCC101',
    title: 'Slip Test-1: Data Structures Using C++ (5 Marks)',
    examDate: '2026-12-02 · 10:00 AM',
    revisionTopics: 'Asymptotic Notations, Linked Lists, Stacks & Queues, Infix-to-Postfix Conversion',
    message: 'Best 2 out of 3 Slip Tests (5M) count toward the 40M CBIT Theory CIE. Bring blue/black pen only.',
    postedBy: 'Dr. B. Indira (HoD)',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: 'notice_mid_1',
    category: 'Mid Exam',
    courseCode: 'ALL-MCA',
    title: 'Mid-Term Examination-I (20 Marks · R-25 / R-23)',
    examDate: '2026-12-14 to 2026-12-18',
    revisionTopics: 'Units 1 & 2 of all Core Theory Courses (Computer Architecture, OOP Java, DS Using C++, DBMS)',
    message: 'Average of Mid-1 (20M) and Mid-2 (20M) forms 20 Marks of Theory CIE. Hall tickets & seating chart will be posted 2 days prior.',
    postedBy: 'CBIT MCA Exam Cell',
    createdAt: new Date(Date.now() - 43200000).toISOString()
  },
  {
    id: 'notice_assign_1',
    category: 'Assignment',
    courseCode: '25MCC103',
    title: 'Assignment-1 Submission: OOP using Java (10 Marks)',
    examDate: 'Due: 2026-12-06 · 5:00 PM',
    revisionTopics: 'Inheritance, Polymorphism, Exception Handling, Multithreading & Collections Framework',
    message: 'Upload clean source code + UML class diagram PDF. Average of Assignment-1 & Assignment-2 carries 10M in CIE.',
    postedBy: 'Sri P. Krishna Prasad',
    createdAt: new Date(Date.now() - 21600000).toISOString()
  },
  {
    id: 'notice_lab_1',
    category: 'Lab Exam',
    courseCode: '25MCC104',
    title: 'Lab Internal-1: Data Structures Using C++ Lab (20M + 30M Record)',
    examDate: '2026-12-09 · 2:00 PM',
    revisionTopics: 'Binary Search Trees, AVL Rotations, BFS/DFS Graph Traversals, Dijkstra Shortest Path',
    message: 'Bring completed Observation & Record book signed up to Week 6. Viva-voce carries 5M.',
    postedBy: 'Dr. M. Ramchander',
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

const CATEGORIES = ['All', 'Slip Test', 'Mid Exam', 'Assignment', 'Lab Exam', 'Project', 'General'];

const CATEGORY_STYLES = {
  'Slip Test': 'bg-emerald-100 text-emerald-800 border-emerald-300',
  'Mid Exam': 'bg-rose-100 text-rose-800 border-rose-300',
  'Assignment': 'bg-purple-100 text-purple-800 border-purple-300',
  'Lab Exam': 'bg-blue-100 text-blue-800 border-blue-300',
  'Project': 'bg-amber-100 text-amber-800 border-amber-300',
  'General': 'bg-slate-100 text-slate-800 border-slate-300'
};

export const NoticeboardPanel = () => {
  const { currentUser, allCourses, showToast } = useApp();
  const isFaculty = currentUser?.role === 'faculty';

  const [notices, setNotices] = useState(() => {
    try {
      const cached = localStorage.getItem('cbit_campx_notices');
      return cached ? JSON.parse(cached) : DEFAULT_NOTICES;
    } catch {
      return DEFAULT_NOTICES;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [form, setForm] = useState({
    category: 'Slip Test',
    courseCode: allCourses?.[0]?.code || '25MCC101',
    title: '',
    examDate: '',
    revisionTopics: '',
    message: ''
  });

  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/realtime/notices').then(r => r.json()).catch(() => null);
      if (res?.success && Array.isArray(res.notices) && res.notices.length > 0) {
        setNotices(res.notices);
        localStorage.setItem('cbit_campx_notices', JSON.stringify(res.notices));
      }
    } catch {
      // Keep local cache
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  const handleAddNotice = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Please enter a notice title.', 'error');
      return;
    }
    sounds.playSuccessChime();
    const newNotice = {
      id: `notice_${Date.now()}`,
      category: form.category,
      courseCode: form.courseCode,
      title: form.title.trim(),
      examDate: form.examDate.trim() || 'Scheduled This Week',
      revisionTopics: form.revisionTopics.trim() || 'Refer to Course Outcomes & Lecture Notes',
      message: form.message.trim() || 'Please prepare accordingly.',
      postedBy: currentUser?.name || 'CBIT MCA Faculty',
      createdAt: new Date().toISOString()
    };

    const updated = [newNotice, ...notices];
    setNotices(updated);
    localStorage.setItem('cbit_campx_notices', JSON.stringify(updated));

    try {
      await fetch('/api/realtime/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotice)
      });
    } catch {
      // Saved locally even if offline
    }

    setForm({
      category: 'Slip Test',
      courseCode: allCourses?.[0]?.code || '25MCC101',
      title: '',
      examDate: '',
      revisionTopics: '',
      message: ''
    });
    setIsFormOpen(false);
    showToast(`📌 Notice posted to CBIT MCA Noticeboard!`, 'success');
  };

  const handleDeleteNotice = async (id) => {
    sounds.playTick();
    const updated = notices.filter(n => n.id !== id);
    setNotices(updated);
    localStorage.setItem('cbit_campx_notices', JSON.stringify(updated));
    try {
      await fetch(`/api/realtime/notices/${encodeURIComponent(id)}`, { method: 'DELETE' });
    } catch {
      // Ignore network error
    }
    showToast('Notice removed from Noticeboard.', 'info');
  };

  const filteredNotices = selectedCategory === 'All'
    ? notices
    : notices.filter(n => n.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-gradient-to-br from-amber-500/20 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-950 text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full font-mono">
                Live Noticeboard
              </span>
              <span className="text-xs text-emerald-300 font-mono flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Real-Time Exam & Revision Feed</span>
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              📌 CBIT MCA Exam, Slip Test & Quick Revision Board
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              Stay updated on Slip Tests, Mid-Term Exams, Assignments, Lab Internals, and key revision topics for quick preparation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                sounds.playTick();
                fetchNotices();
              }}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-400' : 'text-indigo-400'}`} />
              <span>Sync Updates</span>
            </button>

            {isFaculty && (
              <button
                type="button"
                onClick={() => {
                  sounds.playTick();
                  setIsFormOpen(!isFormOpen);
                }}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg shadow-amber-500/20 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{isFormOpen ? 'Close Form' : 'Post Exam / Revision Notice'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Faculty-Only Post Notice Form */}
      {isFaculty && isFormOpen && (
        <form
          onSubmit={handleAddNotice}
          className="bg-white border-2 border-indigo-200 rounded-3xl p-6 shadow-lg space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Pin className="w-4 h-4 text-indigo-600" />
              <span>Publish New Slip Test / Mid Exam / Revision Reminder</span>
            </h3>
            <span className="text-[11px] font-mono text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full font-bold">
              Visible to All Students & Faculty
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 font-semibold text-slate-800"
              >
                {CATEGORIES.filter(c => c !== 'All').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Course Code</label>
              <select
                value={form.courseCode}
                onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
                className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 font-mono text-slate-800"
              >
                <option value="ALL-MCA">ALL-MCA (Department-Wide)</option>
                {(allCourses || []).map(c => (
                  <option key={c.code} value={c.code}>{c.code} · {c.short || c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Exam / Deadline Date & Time</label>
              <input
                type="text"
                value={form.examDate}
                onChange={(e) => setForm({ ...form, examDate: e.target.value })}
                placeholder="e.g. 2026-12-05 · 11:00 AM"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Notice Title *</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Slip Test-2: Trees & Graphs (5 Marks)"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-900 font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Quick Revision Topics (Syllabus Focus)</label>
              <input
                type="text"
                value={form.revisionTopics}
                onChange={(e) => setForm({ ...form, revisionTopics: e.target.value })}
                placeholder="e.g. AVL Trees, B-Trees, Dijkstra, Kruskal MST"
                className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">Instructions / Reminder Details</label>
            <textarea
              rows={2}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Any instructions, room number, or CIE weightage reminder..."
              className="w-full border border-slate-300 rounded-xl px-3 py-2 bg-slate-50 text-slate-800"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish Notice</span>
            </button>
          </div>
        </form>
      )}

      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter:</span>
          </span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sounds.playTick();
                setSelectedCategory(cat);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className="text-xs font-mono text-slate-500">
          Showing <strong>{filteredNotices.length}</strong> active notices
        </span>
      </div>

      {/* Notice Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotices.map((notice) => {
          const badgeStyle = CATEGORY_STYLES[notice.category] || CATEGORY_STYLES['General'];
          return (
            <div
              key={notice.id}
              className="bg-white border border-slate-200 hover:border-indigo-300 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                      {notice.category}
                    </span>
                    <span className="text-[11px] font-mono font-bold bg-indigo-50 text-indigo-800 px-2.5 py-0.5 rounded-full border border-indigo-200">
                      {notice.courseCode}
                    </span>
                  </div>

                  {isFaculty && (
                    <button
                      type="button"
                      onClick={() => handleDeleteNotice(notice.id)}
                      title="Delete notice"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">
                  {notice.title}
                </h3>

                <div className="flex items-center gap-2 text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="font-bold">{notice.examDate}</span>
                </div>

                {/* Quick Revision Box */}
                <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 space-y-1">
                  <div className="text-[11px] font-extrabold text-indigo-900 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Quick Revision Topics:</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {notice.revisionTopics}
                  </p>
                </div>

                {notice.message && (
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {notice.message}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Posted by: <strong className="text-slate-700 font-sans">{notice.postedBy}</strong></span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Today'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
