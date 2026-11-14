import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import StatusBadge from '../common/StatusBadge';

const MyComplaints = ({ onNavigate, onSelectComplaint }) => {
  const { currentUser } = useAuth();
  const { getStudentComplaints } = useComplaints();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const studentComplaints = getStudentComplaints(currentUser);

  const filteredComplaints = studentComplaints.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="cc-content-container">
      {/* Header */}
      <div className="cc-page-header d-flex justify-content-between align-items-center flex-wrap gap-3">
        <div>
          <h1 className="cc-page-title">My Complaints</h1>
          <p className="cc-page-subtitle">
            View and track the status of your submitted complaints.
          </p>
        </div>
        <button
          className="cc-btn-yellow"
          style={{ width: 'auto', padding: '0.65rem 1.25rem' }}
          onClick={() => onNavigate('register-complaint')}
        >
          <i className="bi bi-plus-lg"></i>
          <span>New Complaint</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="cc-panel-card">
        {/* Quick Search & Status Filter */}
        <div className="p-3 border-bottom border-secondary d-flex gap-2 flex-wrap" style={{ background: '#111723' }}>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text bg-dark border-secondary text-secondary">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              className="form-control bg-dark border-secondary text-white"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="form-select bg-dark border-secondary text-white"
            style={{ maxWidth: '160px' }}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Under Review">Under Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Rejected">Rejected</option>
          </select>
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
                <th style={{ width: '100px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-secondary">
                    No complaints match your criteria.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((item, index) => (
                  <tr key={item.id}>
                    <td className="cc-td-muted">{index + 1}</td>
                    <td className="cc-td-title">{item.title}</td>
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
                          onNavigate('complaint-details');
                        }}
                      >
                        View
                      </button>
                    </td>
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

export default MyComplaints;
