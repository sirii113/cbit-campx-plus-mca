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
      <MainContent />
    </AppProvider>
  );
}

export default App;
