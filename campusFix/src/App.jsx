import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ComplaintProvider } from './context/ComplaintContext';

// Common Components
import Sidebar from './components/common/Sidebar';
import Navbar from './components/common/Navbar';

// Auth Components
import LoginChoice from './components/auth/LoginChoice';
import StudentLogin from './components/auth/StudentLogin';
import AdminLogin from './components/auth/AdminLogin';
import StudentRegister from './components/auth/StudentRegister';

// Student Components
import StudentDashboard from './components/student/StudentDashboard';
import RegisterComplaint from './components/student/RegisterComplaint';
import MyComplaints from './components/student/MyComplaints';
import StudentComplaintDetails from './components/student/StudentComplaintDetails';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminAllComplaints from './components/admin/AdminAllComplaints';
import AdminComplaintDetails from './components/admin/AdminComplaintDetails';
import AdminUsers from './components/admin/AdminUsers';

// Profile Component
import UserProfile from './components/profile/UserProfile';

// Styles
import './styles/campus-care.css';

const MainApp = () => {
  const { currentUser } = useAuth();

  // Auth routing state
  const [authView, setAuthView] = useState('choice'); // 'choice' | 'student-login' | 'admin-login' | 'student-register'

  // Dashboard routing state
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedComplaintId, setSelectedComplaintId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If not logged in, render authentication screens
  if (!currentUser) {
    if (authView === 'choice') {
      return (
        <LoginChoice
          onSelectRole={(role) =>
            setAuthView(role === 'student' ? 'student-login' : 'admin-login')
          }
        />
      );
    }

    if (authView === 'student-login') {
      return (
        <StudentLogin
          onBack={() => setAuthView('choice')}
          onGoToRegister={() => setAuthView('student-register')}
        />
      );
    }

    if (authView === 'admin-login') {
      return <AdminLogin onBack={() => setAuthView('choice')} />;
    }

    if (authView === 'student-register') {
      return (
        <StudentRegister
          onBack={() => setAuthView('student-login')}
          onGoToLogin={() => setAuthView('student-login')}
        />
      );
    }
  }

  // If logged in, render the dashboard shell
  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="cc-app-layout">
      {/* Sidebar */}
      <Sidebar
        currentView={currentView}
        onViewChange={(view) => {
          setCurrentView(view);
          setSidebarOpen(false);
        }}
        isOpen={sidebarOpen}
        closeMobileSidebar={() => setSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="cc-main-wrapper">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onNavigate={(view) => setCurrentView(view)}
        />

        <main className="flex-grow-1">
          {/* Student Views */}
          {!isAdmin && (
            <>
              {currentView === 'dashboard' && (
                <StudentDashboard
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                />
              )}
              {currentView === 'register-complaint' && (
                <RegisterComplaint onNavigate={setCurrentView} />
              )}
              {currentView === 'my-complaints' && (
                <MyComplaints
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                />
              )}
              {currentView === 'complaint-details' && (
                <StudentComplaintDetails
                  complaintId={selectedComplaintId}
                  onBack={() => setCurrentView('my-complaints')}
                />
              )}
              {currentView === 'profile' && <UserProfile />}
            </>
          )}

          {/* Admin Views */}
          {isAdmin && (
            <>
              {currentView === 'dashboard' && (
                <AdminDashboard
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                />
              )}
              {currentView === 'all-complaints' && (
                <AdminAllComplaints
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                  initialFilterStatus="All"
                />
              )}
              {currentView === 'pending-complaints' && (
                <AdminAllComplaints
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                  initialFilterStatus="Pending"
                />
              )}
              {currentView === 'resolved-complaints' && (
                <AdminAllComplaints
                  onNavigate={setCurrentView}
                  onSelectComplaint={(id) => setSelectedComplaintId(id)}
                  initialFilterStatus="Resolved"
                />
              )}
              {currentView === 'admin-complaint-details' && (
                <AdminComplaintDetails
                  complaintId={selectedComplaintId}
                  onBack={() => setCurrentView('all-complaints')}
                />
              )}
              {currentView === 'users' && <AdminUsers />}
              {currentView === 'profile' && <UserProfile />}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ComplaintProvider>
        <MainApp />
      </ComplaintProvider>
    </AuthProvider>
  );
}

export default App;
