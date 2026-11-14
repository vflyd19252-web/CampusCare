import React from 'react';
import jimsCampusImg from '../../assets/jims-campus.webp';

const LoginChoice = ({ onSelectRole }) => {
  return (
    <div
      className="cc-login-choice-wrapper"
      style={{ backgroundImage: `url(${jimsCampusImg})` }}
    >
      <div className="cc-login-choice-overlay"></div>

      <div className="cc-login-choice-content">
        {/* Header */}
        <div className="cc-choice-header position-relative">
          <div className="cc-choice-brand">
            <i className="bi bi-bank cc-brand-temple-icon"></i>
            <h1 className="cc-brand-title">Campus Care</h1>
            <p className="cc-brand-subtitle">College Complaint Portal</p>
          </div>

          <div className="cc-choice-tagline d-none d-md-block">
            Better Campus<br />Brighter Tomorrow
          </div>
        </div>

        {/* Login Choice Cards */}
        <div className="cc-choice-cards-container">
          {/* Student Login Card */}
          <div
            className="cc-choice-card"
            onClick={() => onSelectRole('student')}
            role="button"
            tabIndex={0}
          >
            <div className="cc-choice-icon-wrap">
              <i className="bi bi-mortarboard-fill"></i>
            </div>
            <h3 className="cc-choice-title">Student Login</h3>
            <p className="cc-choice-desc">
              Register and track your complaints
            </p>
          </div>

          {/* Admin Login Card */}
          <div
            className="cc-choice-card"
            onClick={() => onSelectRole('admin')}
            role="button"
            tabIndex={0}
          >
            <div className="cc-choice-icon-wrap">
              <i className="bi bi-shield-fill-check"></i>
            </div>
            <h3 className="cc-choice-title">Admin Login</h3>
            <p className="cc-choice-desc">
              Manage and resolve complaints
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-secondary small py-2">
          Jagan Institute of Management Studies (JIMS), Rohini &bull; Campus Care Portal &copy; 2026
        </div>
      </div>
    </div>
  );
};

export default LoginChoice;
