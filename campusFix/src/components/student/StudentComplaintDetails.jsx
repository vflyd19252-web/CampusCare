import React from 'react';
import { useComplaints } from '../../context/ComplaintContext';
import StatusBadge from '../common/StatusBadge';
import StatusTimeline from '../common/StatusTimeline';
import ceilingFanSvg from '../../assets/ceiling-fan.svg';

const StudentComplaintDetails = ({ complaintId, onBack }) => {
  const { getComplaintById } = useComplaints();
  const complaint = getComplaintById(complaintId);

  if (!complaint) {
    return (
      <div className="cc-content-container text-center py-5">
        <h3 className="text-white mb-3">Complaint Not Found</h3>
        <button className="cc-btn-yellow" style={{ width: 'auto' }} onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back to My Complaints
        </button>
      </div>
    );
  }

  // Fallback image if image is empty or fan
  const displayImage = complaint.image || ceilingFanSvg;

  return (
    <div className="cc-content-container">
      {/* Back Button */}
      <div className="mb-4">
        <button className="cc-back-btn p-0" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Back to My Complaints
        </button>
      </div>

      <div className="cc-details-grid">
        {/* Left Column: Complaint Details Card */}
        <div className="cc-detail-card">
          <div className="cc-detail-header">
            <h2 className="cc-detail-title">{complaint.title}</h2>
            <StatusBadge status={complaint.status} />
          </div>

          <div className="cc-detail-rows">
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

        {/* Right Column: Status Timeline Card */}
        <div className="cc-detail-card" style={{ height: 'fit-content' }}>
          <h3 className="cc-panel-card-title mb-3">Status Timeline</h3>
          <StatusTimeline
            timeline={complaint.timeline}
            currentStatus={complaint.status}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentComplaintDetails;
