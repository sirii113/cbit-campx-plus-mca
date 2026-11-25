import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LoginScreen } from './components/Auth/LoginScreen';
import { Navbar } from './components/Navbar';
import { MarksEntryTable } from './components/FacultyMarksEntry/MarksEntryTable';
import { ObeAttainmentHeatmap } from './components/PerformanceAnalytics/ObeAttainmentHeatmap';
import { RiskPredictorEWS } from './components/PerformanceAnalytics/RiskPredictorEWS';
import { PlacementReadinessDashboard } from './components/McaPlacementReadiness/PlacementReadinessDashboard';
import { StudentDashboard } from './components/StudentPortal/StudentDashboard';
import { CbitCoEReport } from './components/Reports/CbitCoEReport';
import { LoginAlertModal } from './components/Notifications/LoginAlertModal';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('CBIT App Error Caught:', error, errorInfo);
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-2xl border border-rose-500/30 p-6 text-center shadow-2xl">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400 text-2xl font-bold">
              ⚠️
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Display Recovery Gate</h2>
            <p className="text-slate-300 text-sm mb-4">
              A temporary interface issue was prevented from interrupting your session.
            </p>
            <div className="bg-slate-950 rounded-lg p-3 text-left font-mono text-xs text-rose-300 mb-6 max-h-32 overflow-auto border border-slate-800">
              {this.state.error?.message || 'Unknown runtime state'}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2.5 px-4 rounded-xl transition text-sm shadow-md"
              >
                Reload Webpage
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold py-2.5 px-4 rounded-xl transition text-sm"
              >
                Reset Session
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MainContent = () => {
  const { isAuthenticated, currentUser, activeTab, cbitInfo, loginAlert, dismissLoginAlert } = useApp();

  // If user is not logged in, show the futuristic Login Portal
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  // If student is logged in, show their personalized 360° Portal directly
  if (currentUser?.role === 'student') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <div>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <StudentDashboard />
          </main>
        </div>

        {/* Real-time Login Notification Alert Modal */}
        <LoginAlertModal alertData={loginAlert} onClose={dismissLoginAlert} />

        <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 no-print mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white tracking-wider">CBIT CampX+</span>
              <span className="text-slate-600">·</span>
              <span>Department of Computer Applications (MCA)</span>
              <span className="text-slate-600">·</span>
              <span className="text-amber-400">R-25 Autonomous</span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="text-emerald-400">🟢 Real-Time Database Synced</span>
              <span>Accredited NAAC A++ & NBA Tier-1</span>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Faculty / HOD view
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'marks-entry' && <MarksEntryTable />}
          {activeTab === 'analytics' && <ObeAttainmentHeatmap />}
          {activeTab === 'risk-ews' && <RiskPredictorEWS />}
          {activeTab === 'placement' && <PlacementReadinessDashboard />}
          {activeTab === 'student-view' && <StudentDashboard />}
          {activeTab === 'coe-report' && <CbitCoEReport />}
        </main>
      </div>

      {/* Real-time Login Notification Alert Modal */}
      <LoginAlertModal alertData={loginAlert} onClose={dismissLoginAlert} />

      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 no-print mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white tracking-wider">CBIT CampX+</span>
            <span className="text-slate-600">·</span>
            <span>Department of Computer Applications (MCA)</span>
            <span className="text-slate-600">·</span>
            <span className="text-amber-400 font-bold">R-25 Autonomous Syllabus</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="text-emerald-400">🟢 Free Real-Time DB Connected</span>
            <span>Gandipet, Hyderabad - 500075</span>
            <span>Accredited NAAC A++ & NBA Tier-1</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <MainContent />
      </ErrorBoundary>
    </AppProvider>
  );
}

export default App;
