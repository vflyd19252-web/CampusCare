import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ toggleSidebar, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'Complaint #1 Under Review', time: '10 mins ago', unread: true },
    { id: 2, title: 'Complaint #2 Marked Resolved', time: '2 hours ago', unread: false },
    { id: 3, title: 'Campus maintenance alert scheduled for Sunday', time: '1 day ago', unread: false }
  ];

  return (
    <header className="cc-topbar">
      <div className="cc-topbar-left">
        <button
          className="cc-mobile-menu-btn"
          onClick={toggleSidebar}
          aria-label="Toggle Navigation"
        >
          <i className="bi bi-list"></i>
        </button>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Notification Bell */}
        <div className="position-relative">
          <button
            className="cc-notification-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setDropdownOpen(false);
            }}
            aria-label="Notifications"
          >
            <i className="bi bi-bell"></i>
            <span className="cc-notif-dot"></span>
          </button>

          {showNotifications && (
            <div
              className="position-absolute end-0 mt-2 p-3 shadow-lg"
              style={{
                width: '300px',
                background: '#151B28',
                border: '1px solid #232E45',
                borderRadius: '10px',
                zIndex: 1000
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom border-secondary">
                <span className="fw-bold text-white small">Campus Notifications</span>
                <span className="badge bg-warning text-dark small">New</span>
              </div>
              <div className="d-flex flex-column gap-2">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-2 rounded"
                    style={{ background: n.unread ? 'rgba(255, 210, 51, 0.08)' : 'transparent' }}
                  >
                    <p className="m-0 text-white small fw-semibold">{n.title}</p>
                    <span className="text-secondary" style={{ fontSize: '0.75rem' }}>{n.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="position-relative">
          <button
            className="cc-user-dropdown-btn"
            onClick={() => {
              setDropdownOpen(!dropdownOpen);
              setShowNotifications(false);
            }}
          >
            <div className="cc-user-avatar">
              {currentUser?.avatar || (currentUser?.role === 'admin' ? 'AU' : 'KA')}
            </div>
            <div className="cc-user-meta d-none d-sm-block">
              <div className="cc-user-name">{currentUser?.name || 'Ketan Arora'}</div>
              <div className="cc-user-role">
                {currentUser?.role === 'admin' ? 'Administrator' : 'Student'}
              </div>
            </div>
            <i className="bi bi-chevron-down text-secondary small ms-1"></i>
          </button>

          {dropdownOpen && (
            <div
              className="position-absolute end-0 mt-2 py-2 shadow-lg"
              style={{
                width: '180px',
                background: '#151B28',
                border: '1px solid #232E45',
                borderRadius: '8px',
                zIndex: 1000
              }}
            >
              <button
                className="dropdown-item px-3 py-2 text-white d-flex align-items-center gap-2 border-0 bg-transparent w-100 text-start"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setDropdownOpen(false);
                  onNavigate && onNavigate('profile');
                }}
              >
                <i className="bi bi-person"></i> Profile
              </button>
              <div className="dropdown-divider my-1 border-secondary"></div>
              <button
                className="dropdown-item px-3 py-2 text-danger d-flex align-items-center gap-2 border-0 bg-transparent w-100 text-start"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setDropdownOpen(false);
                  logout();
                }}
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
