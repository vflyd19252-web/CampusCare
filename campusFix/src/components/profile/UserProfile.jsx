import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const { getStats } = useComplaints();

  const isAdmin = currentUser?.role === 'admin';
  const stats = getStats(currentUser?.role, currentUser);

  return (
    <div className="cc-content-container">
      <div className="cc-page-header">
        <h1 className="cc-page-title">User Profile</h1>
        <p className="cc-page-subtitle">Personal details and account overview.</p>
      </div>

      <div className="row g-4">
        {/* Left Column: Avatar & Basic Info */}
        <div className="col-12 col-md-4">
          <div className="cc-detail-card text-center">
            <div
              className="cc-user-avatar mx-auto mb-3"
              style={{ width: '90px', height: '90px', fontSize: '2rem' }}
            >
              {currentUser?.avatar || (isAdmin ? 'AU' : 'KA')}
            </div>
            <h2 className="text-white fs-4 fw-bold mb-1">{currentUser?.name || 'Ketan Arora'}</h2>
            <p className="text-secondary mb-3">
              {isAdmin ? 'Chief Administrator' : `Roll No: ${currentUser?.rollNo || '2101'}`}
            </p>
            <span
              className={`badge px-3 py-2 ${
                isAdmin ? 'bg-danger' : 'bg-warning text-dark'
              } fw-bold`}
            >
              {isAdmin ? 'ADMINISTRATOR' : 'STUDENT'}
            </span>

            <div className="border-top border-secondary mt-4 pt-3 text-start small text-secondary">
              <div className="mb-2">
                <i className="bi bi-envelope me-2 text-warning"></i>
                <span className="text-white">{currentUser?.email || 'ketan@jimsindia.org'}</span>
              </div>
              <div className="mb-2">
                <i className="bi bi-telephone me-2 text-warning"></i>
                <span className="text-white">{currentUser?.phone || '+91 98765 43210'}</span>
              </div>
              <div>
                <i className="bi bi-geo-alt me-2 text-warning"></i>
                <span className="text-white">JIMS Sector 5, Rohini, Delhi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed info & activity */}
        <div className="col-12 col-md-8">
          <div className="cc-detail-card mb-4">
            <h3 className="cc-panel-card-title mb-4">Academic & Campus Details</h3>

            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <span className="text-secondary small d-block mb-1">Department</span>
                  <span className="text-white fw-semibold">
                    {currentUser?.department || 'Computer Applications / IT'}
                  </span>
                </div>
              </div>

              {!isAdmin && (
                <div className="col-12 col-sm-6">
                  <div className="p-3 rounded bg-dark border border-secondary">
                    <span className="text-secondary small d-block mb-1">Current Semester</span>
                    <span className="text-white fw-semibold">
                      {currentUser?.semester || '5th Semester'}
                    </span>
                  </div>
                </div>
              )}

              <div className="col-12 col-sm-6">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <span className="text-secondary small d-block mb-1">Campus / Location</span>
                  <span className="text-white fw-semibold">
                    {currentUser?.room || 'Block A, Room 101'}
                  </span>
                </div>
              </div>

              <div className="col-12 col-sm-6">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <span className="text-secondary small d-block mb-1">Account Status</span>
                  <span className="text-success fw-semibold">
                    <i className="bi bi-check-circle-fill me-1"></i> Active Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Summary */}
          <div className="cc-detail-card">
            <h3 className="cc-panel-card-title mb-3">Portal Activity Summary</h3>
            <div className="row text-center g-2">
              <div className="col-6 col-sm-3">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <div className="fs-3 fw-bold text-white">{stats.total}</div>
                  <div className="text-secondary small">Total Tickets</div>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <div className="fs-3 fw-bold text-warning">{stats.pending}</div>
                  <div className="text-secondary small">Pending</div>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <div className="fs-3 fw-bold text-success">{stats.resolved}</div>
                  <div className="text-secondary small">Resolved</div>
                </div>
              </div>
              <div className="col-6 col-sm-3">
                <div className="p-3 rounded bg-dark border border-secondary">
                  <div className="fs-3 fw-bold text-danger">{stats.rejected}</div>
                  <div className="text-secondary small">Rejected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
