import React, { useState } from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import { STATUS_OPTIONS } from '../../data/mockData';
import StatusBadge from '../common/StatusBadge';
import StatusTimeline from '../common/StatusTimeline';
import ceilingFanSvg from '../../assets/ceiling-fan.svg';

const AdminComplaintDetails = ({ complaintId, onBack }) => {
  const { getComplaintById, updateComplaintStatus } = useComplaints();
  const complaint = getComplaintById(complaintId);

  const [selectedStatus, setSelectedStatus] = useState(complaint?.status || 'Pending');
  const [internalNote, setInternalNote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!complaint) {
    return (
      <div className="cc-content-container text-center py-5">
        <h3 className="text-white mb-3">Complaint Not Found</h3>
        <button className="cc-btn-yellow" style={{ width: 'auto' }} onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back to All Complaints
        </button>
      </div>
    );
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateComplaintStatus(complaint.id, selectedStatus, internalNote);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const displayImage = complaint.image || ceilingFanSvg;

  return (
    <div className="cc-content-container">
      {/* Back Button */}
      <div className="mb-4">
        <button className="cc-back-btn p-0" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back to All Complaints
        </button>
      </div>

      {saveSuccess && (
        <div className="alert alert-success d-flex align-items-center gap-2 mb-4 p-3 rounded-3">
          <i className="bi bi-check-circle-fill fs-5"></i>
          <div>
            <strong>Status Updated Successfully!</strong> Changes saved to system.
          </div>
        </div>
      )}

      <div className="cc-details-grid">
        {/* Left Column: Complaint Details Card */}
        <div className="cc-detail-card">
          <div className="cc-detail-header">
            <h2 className="cc-detail-title">{complaint.title}</h2>
            <StatusBadge status={complaint.status} />
          </div>

          <div className="cc-detail-rows">
            <div className="cc-detail-row">
              <span className="cc-detail-label">Student</span>
              <span className="cc-detail-value">
                : {complaint.studentName} {complaint.rollNo ? `(Roll No: ${complaint.rollNo})` : ''}
              </span>
            </div>

            <div className="cc-detail-row">
              <span className="cc-detail-label">Category</span>
              <span className="cc-detail-value">: {complaint.category}</span>
            </div>

            <div className="cc-detail-row">
              <span className="cc-detail-label">Location</span>
              <span className="cc-detail-value">: {complaint.location}</span>
            </div>

            <div className="cc-detail-row">
              <span className="cc-detail-label">Submitted On</span>
              <span className="cc-detail-value">
                : {complaint.date}, {complaint.time || '11:30 AM'}
              </span>
            </div>

            <div className="cc-detail-row">
              <span className="cc-detail-label">Description</span>
              <span className="cc-detail-value">: {complaint.description}</span>
            </div>

            {complaint.internalNotes && (
              <div className="cc-detail-row">
                <span className="cc-detail-label">Internal Notes</span>
                <span className="cc-detail-value text-warning">: {complaint.internalNotes}</span>
              </div>
            )}
          </div>

          {/* Attached Image Preview */}
          {displayImage && (
            <div className="cc-detail-img-box">
              <img
                src={displayImage}
                alt={complaint.title}
                className="cc-detail-img"
              />
            </div>
          )}
        </div>

        {/* Right Column: Timeline & Update Status Card */}
        <div className="cc-detail-card" style={{ height: 'fit-content' }}>
          <h3 className="cc-panel-card-title mb-3">Status Timeline</h3>
          <StatusTimeline
            timeline={complaint.timeline}
            currentStatus={complaint.status}
          />

          {/* Admin Update Status Form */}
          <div className="cc-update-status-card">
            <h4 className="cc-panel-card-title fs-6 mb-3">Update Status</h4>

            <form onSubmit={handleUpdate}>
              <div className="mb-3">
                <label className="cc-label small">Change Status</label>
                <select
                  className="cc-select"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  {STATUS_OPTIONS.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="cc-label small">Internal Note</label>
                <textarea
                  className="cc-textarea"
                  style={{ minHeight: '80px' }}
                  placeholder="Add an internal note (optional)..."
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                ></textarea>
              </div>

              <button type="submit" className="cc-btn-yellow">
                <i className="bi bi-pencil-square"></i>
                <span>Update Status</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetails;
