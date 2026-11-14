import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = ({ onBack }) => {
  const { loginAdmin } = useAuth();
  const [adminId, setAdminId] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!adminId.trim()) {
      setError('Please enter Admin ID');
      return;
    }

    const result = loginAdmin(adminId, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const fillDemoAdmin = () => {
    setAdminId('admin');
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="cc-auth-page">
      {/* Top Nav Back */}
      <div className="cc-auth-nav">
        <button className="cc-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>

      <div className="cc-auth-center">
        {/* Brand */}
        <div className="cc-brand-badge">
          <i className="bi bi-shield-lock-fill cc-brand-temple-icon"></i>
          <h1 className="cc-brand-title">Campus Care</h1>
          <p className="cc-brand-subtitle">College Complaint Portal</p>
        </div>

        {/* Login Card */}
        <div className="cc-auth-card">
          <div className="cc-auth-card-header">
            <i className="bi bi-shield-fill-check fs-3 text-white"></i>
            <h2>Admin Login</h2>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Admin ID */}
            <div className="cc-form-group">
              <div className="cc-input-wrapper">
                <i className="bi bi-person-gear cc-input-icon"></i>
                <input
                  type="text"
                  className="cc-input"
                  placeholder="Admin ID"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="cc-form-group">
              <div className="cc-input-wrapper">
                <i className="bi bi-lock cc-input-icon"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="cc-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="cc-input-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="cc-btn-yellow mt-2">
              Login
            </button>
          </form>

          {/* Demo Hint */}
          <div className="cc-demo-hint mt-4">
            <span>Demo: Admin User (admin)</span>
            <button
              type="button"
              className="cc-demo-fill-btn"
              onClick={fillDemoAdmin}
            >
              Fill Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
