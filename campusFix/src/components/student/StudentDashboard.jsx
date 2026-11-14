import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';

const StudentDashboard = ({ onNavigate, onSelectComplaint }) => {
  const { currentUser } = useAuth();
  const { getStudentComplaints, getStats } = useComplaints();

  const studentComplaints = getStudentComplaints(currentUser);
  const stats = getStats('student', currentUser);

  // Take the first 5 complaints for the recent table
  const recentComplaints = studentComplaints.slice(0, 5);

  const studentFirstName = currentUser?.name?.split(' ')[0] || 'Student';

  return (
    <div className="cc-content-container">
      {/* Welcome Banner */}
      <div className="cc-page-header">
        <h1 className="cc-page-title">Welcome, {studentFirstName}!</h1>
        <p className="cc-page-subtitle">
          Report issues, track updates, and help make our campus better.
        </p>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="cc-stats-grid">
        <StatCard count={stats.total} label="Total Complaints" type="total" />
        <StatCard count={stats.pending} label="Pending" type="pending" />
        <StatCard count={stats.resolved} label="Resolved" type="resolved" />
        <StatCard count={stats.rejected} label="Rejected" type="rejected" />
      </div>

      {/* Recent Complaints Card */}
      <div className="cc-panel-card">
        <div className="cc-panel-card-header">
          <h2 className="cc-panel-card-title">Recent Complaints</h2>
          <span
            className="cc-view-all-link"
            onClick={() => onNavigate('my-complaints')}
            role="button"
          >
            View All
          </span>
        </div>

        <div className="cc-table-responsive">
          <table className="cc-table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-secondary">
                    No complaints logged yet.
                  </td>
                </tr>
              ) : (
                recentComplaints.map((item, index) => (
                  <tr
                    key={item.id}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      onSelectComplaint(item.id);
                      onNavigate('complaint-details');
                    }}
                  >
                    <td className="cc-td-muted">{index + 1}</td>
                    <td className="cc-td-title">{item.title}</td>
                    <td className="cc-td-muted">{item.category}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="cc-td-muted">{item.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
