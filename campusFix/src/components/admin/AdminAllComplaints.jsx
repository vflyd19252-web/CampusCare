import React, { useState } from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { CATEGORIES } from '../../data/mockData';
import StatusBadge from '../common/StatusBadge';

const AdminAllComplaints = ({ onNavigate, onSelectComplaint, initialFilterStatus = 'All' }) => {
  const { complaints } = useComplaints();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState(initialFilterStatus);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter complaints
  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.studentName.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.rollNo?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === 'All' || c.category === category;
    const matchesStatus =
      status === 'All'
        ? true
        : status === 'Pending'
        ? c.status === 'Pending' || c.status === 'Under Review'
        : c.status === status;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Pagination slice
  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="cc-content-container">
      {/* Header */}
      <div className="cc-page-header">
        <h1 className="cc-page-title">
          {initialFilterStatus !== 'All' ? `${initialFilterStatus} Complaints` : 'All Complaints'}
        </h1>
        <p className="cc-page-subtitle">
          View, filter and manage all complaints.
        </p>
      </div>

      {/* Main Panel Card */}
      <div className="cc-panel-card">
        {/* Filter Bar */}
        <div className="cc-filter-bar">
          {/* Search */}
          <div className="cc-filter-search">
            <input
              type="text"
              className="cc-input-text"
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div className="cc-filter-select">
            <select
              className="cc-select"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="cc-filter-select">
            <select
              className="cc-select"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Filter / Reset Button */}
          <button
            type="button"
            className="cc-btn-yellow"
            style={{ width: 'auto', padding: '0.75rem 1.4rem' }}
            onClick={() => {
              // Trigger filter or refresh
              setCurrentPage(1);
            }}
          >
            <i className="bi bi-funnel-fill"></i>
            <span>Filter</span>
          </button>

          {(search || category !== 'All' || status !== 'All') && (
            <button
              type="button"
              className="btn btn-outline-secondary text-secondary"
              onClick={() => {
                setSearch('');
                setCategory('All');
                setStatus('All');
                setCurrentPage(1);
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Table */}
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
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-secondary">
                    No complaints found matching the selected filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td className="cc-td-muted">{startIndex + index + 1}</td>
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (< 1 2 3 >) */}
        {totalPages > 1 && (
          <div className="cc-pagination">
            <button
              className="cc-page-btn"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <i className="bi bi-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`cc-page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}

            <button
              className="cc-page-btn"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllComplaints;
