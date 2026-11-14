import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import StatCard from '../common/StatCard';
import StatusBadge from '../common/StatusBadge';

const AdminDashboard = ({ onNavigate, onSelectComplaint }) => {
  const { complaints, getStats } = useComplaints();
  const stats = getStats('admin');

  // Display top 5 recent complaints
  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="cc-content-container">
      {/* Page Header */}
      <div className="cc-page-header">
        <h1 className="cc-page-title">Admin Dashboard</h1>
        <p className="cc-page-subtitle">
          Manage and monitor all campus complaints.
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
            onClick={() => onNavigate('all-complaints')}
            role="button"
          >
            View All
          </span>
        </div>

        <div className="cc-table-responsive">
          <table className="cc-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}>#</th>
                <th>Title</th>
                <th>Student</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th style={{ width: '90px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentComplaints.map((item, index) => (
                <tr key={item.id}>
                  <td className="cc-td-muted">{index + 1}</td>
                  <td className="cc-td-title">{item.title}</td>
                  <td className="text-white">{item.studentName}</td>
                  <td className="cc-td-muted">{item.category}</td>
                  <td>
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="cc-td-muted">{item.date}</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      className="cc-action-btn-view"
                      onClick={() => {
                        onSelectComplaint(item.id);
                        onNavigate('admin-complaint-details');
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
