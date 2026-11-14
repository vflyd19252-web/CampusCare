import React from 'react';

const StatusTimeline = ({ timeline = [], currentStatus = 'Pending' }) => {
  // Fallback default timeline if not provided
  const defaultSteps = [
    { status: 'Complaint Submitted', date: '24 Oct 2026, 11:30 AM', completed: true },
    { status: 'Under Review', date: currentStatus === 'Pending' ? 'Pending' : 'Under Review', completed: currentStatus !== 'Pending' },
    { status: 'In Progress', date: '-', completed: ['In Progress', 'Resolved'].includes(currentStatus) },
    { status: currentStatus === 'Rejected' ? 'Rejected' : 'Resolved', date: '-', completed: ['Resolved', 'Rejected'].includes(currentStatus) }
  ];

  const steps = timeline && timeline.length > 0 ? timeline : defaultSteps;

  return (
    <div className="cc-timeline">
      {steps.map((step, idx) => {
        const isActive = step.completed;
        return (
          <div key={idx} className="cc-timeline-item">
            <div className={`cc-timeline-dot ${isActive ? 'active' : ''}`}></div>
            <div className="cc-timeline-line"></div>
            <h4 className="cc-timeline-title">{step.status}</h4>
            <p className="cc-timeline-time">{step.date || '-'}</p>
            {step.note && <div className="cc-timeline-note">{step.note}</div>}
          </div>
        );
      })}
    </div>
  );
};

export default StatusTimeline;
