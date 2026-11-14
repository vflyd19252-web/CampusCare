import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const StudentRegister = ({ onBack, onGoToLogin }) => {
  const { registerStudent } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    department: 'Information Technology',
    semester: '1st Semester',
    room: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.rollNo || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = registerStudent(formData);
    if (!res.success) {
      setError(res.message);
    }
  };

  return (
    <div className="cc-auth-page">
      <div className="cc-auth-nav">
        <button className="cc-back-btn" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </div>

      <div className="cc-auth-center" style={{ maxWidth: '480px' }}>
        <div className="cc-brand-badge">
          <i className="bi bi-bank cc-brand-temple-icon"></i>
          <h1 className="cc-brand-title">Campus Care</h1>
          <p className="cc-brand-subtitle">Student Registration</p>
        </div>

        <div className="cc-auth-card">
          <div className="cc-auth-card-header">
            <i className="bi bi-person-plus-fill fs-3 text-white"></i>
            <h2>Create Student Account</h2>
          </div>

          {error && (
            <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cc-form-group">
              <label className="cc-form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="cc-input ps-3"
                placeholder="e.g. Ketan Arora"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="cc-form-label">Roll Number *</label>
                <input
                  type="text"
                  name="rollNo"
                  className="cc-input ps-3"
                  placeholder="e.g. 2101"
                  value={formData.rollNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-6">
                <label className="cc-form-label">Semester</label>
                <select
                  name="semester"
                  className="cc-select"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                  <option>3rd Semester</option>
                  <option>4th Semester</option>
                  <option>5th Semester</option>
                  <option>6th Semester</option>
                  <option>7th Semester</option>
                  <option>8th Semester</option>
                </select>
              </div>
            </div>

            <div className="cc-form-group">
              <label className="cc-form-label">College Email *</label>
              <input
                type="email"
                name="email"
                className="cc-input ps-3"
                placeholder="student@jimsindia.org"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="cc-form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="cc-input ps-3"
                  placeholder="e.g. IT / BCA"
                  value={formData.department}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <label className="cc-form-label">Room / Hostel</label>
                <input
                  type="text"
                  name="room"
                  className="cc-input ps-3"
                  placeholder="Block A, 101"
                  value={formData.room}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-2 mb-3">
              <div className="col-6">
                <label className="cc-form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="cc-input ps-3"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-6">
                <label className="cc-form-label">Confirm *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="cc-input ps-3"
                  placeholder="Re-enter"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="cc-btn-yellow mt-2">
              Complete Registration
            </button>
          </form>

          <div className="cc-auth-footer">
            Already registered?{' '}
            <button
              className="btn btn-link p-0 text-warning text-decoration-none fw-semibold"
              onClick={onGoToLogin}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegister;
