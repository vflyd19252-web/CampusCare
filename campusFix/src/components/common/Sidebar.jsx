import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ currentView, onViewChange, isOpen, closeMobileSidebar }) => {
  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === 'admin';

  const handleNavClick = (viewName) => {
    onViewChange(viewName);
    if (closeMobileSidebar) closeMobileSidebar();
  };

  return (
    <aside className={`cc-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="cc-sidebar-header">
        <i className="bi bi-bank cc-sidebar-brand-icon"></i>
        <div className="cc-sidebar-brand-text">
          <h1>Campus Care</h1>
          <p>College Complaint Portal</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="cc-sidebar-nav">
        {/* Dashboard */}
        <button
          className={`cc-nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNavClick('dashboard')}
        >
          <i className="bi bi-house-door-fill"></i>
          <span>Dashboard</span>
        </button>

        {/* Role-Specific Navigation */}
        {!isAdmin ? (
          <>
            <button
              className={`cc-nav-item ${currentView === 'register-complaint' ? 'active' : ''}`}
              onClick={() => handleNavClick('register-complaint')}
            >
              <i className="bi bi-pencil-square"></i>
              <span>Register Complaint</span>
            </button>
            <button
              className={`cc-nav-item ${['my-complaints', 'complaint-details'].includes(currentView) ? 'active' : ''}`}
              onClick={() => handleNavClick('my-complaints')}
            >
              <i className="bi bi-file-earmark-text-fill"></i>
              <span>My Complaints</span>
            </button>
          </>
        ) : (
          <>
            <button
              className={`cc-nav-item ${['all-complaints', 'admin-complaint-details'].includes(currentView) ? 'active' : ''}`}
              onClick={() => handleNavClick('all-complaints')}
            >
              <i className="bi bi-card-checklist"></i>
              <span>All Complaints</span>
            </button>
            <button
              className={`cc-nav-item ${currentView === 'pending-complaints' ? 'active' : ''}`}
              onClick={() => handleNavClick('pending-complaints')}
            >
              <i className="bi bi-hourglass-split"></i>
              <span>Pending Complaints</span>
            </button>
            <button
              className={`cc-nav-item ${currentView === 'resolved-complaints' ? 'active' : ''}`}
              onClick={() => handleNavClick('resolved-complaints')}
            >
              <i className="bi bi-check2-circle"></i>
              <span>Resolved Complaints</span>
            </button>
            <button
              className={`cc-nav-item ${currentView === 'users' ? 'active' : ''}`}
              onClick={() => handleNavClick('users')}
            >
              <i className="bi bi-people-fill"></i>
              <span>Users</span>
            </button>
          </>
        )}

        {/* Profile */}
        <button
          className={`cc-nav-item ${currentView === 'profile' ? 'active' : ''}`}
          onClick={() => handleNavClick('profile')}
        >
          <i className="bi bi-person-fill"></i>
          <span>Profile</span>
        </button>
      </nav>

      {/* Footer / Logout */}
      <div className="cc-sidebar-footer">
        <button
          className="cc-nav-item text-danger"
          onClick={() => {
            if (closeMobileSidebar) closeMobileSidebar();
            logout();
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
