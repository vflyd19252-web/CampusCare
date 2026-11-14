import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentLogin = ({ onBack, onGoToRegister }) => {
  const { loginStudent } = useAuth();
  const [identifier, setIdentifier] = useState('2101');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your Roll Number or College Email');
      return;
    }

    const result = loginStudent(identifier, password);
    if (!result.success) {
      setError(result.message);
    }
  };

  const fillDemoStudent = () => {
    setIdentifier('2101');
    setPassword('password123');
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
          <i className="bi bi-bank cc-brand-temple-icon"></i>
          <h1 className="cc-brand-title">Campus Care</h1>
          <p className="cc-brand-subtitle">College Complaint Portal</p>
        </div>

        {/* Login Card */}
        <div className="cc-auth-card">
          <div className="cc-auth-card-header">
            <i className="bi bi-mortarboard-fill fs-3 text-white"></i>
            <h2>Student Login</h2>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Roll Number or Email */}
            <div className="cc-form-group">
              <div className="cc-input-wrapper">
                <i className="bi bi-person-badge cc-input-icon"></i>
                <input
                  type="text"
                  className="cc-input"
                  placeholder="Roll Number / Email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
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

          {/* Register Link */}
          <div className="cc-auth-footer">
            Don't have an account?{' '}
            <button
              className="btn btn-link p-0 text-warning text-decoration-none fw-semibold"
              onClick={onGoToRegister}
            >
              Register here
            </button>
          </div>

          {/* Demo Hint */}
          <div className="cc-demo-hint">
            <span>Demo: Ketan Arora (2101)</span>
            <button
              type="button"
              className="cc-demo-fill-btn"
              onClick={fillDemoStudent}
            >
              Fill Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
