import React from 'react';

const StatusBadge = ({ status }) => {
  const normalized = status ? status.toLowerCase().replace(/\s+/g, '-') : 'pending';

  return (
    <span className={`cc-status-badge cc-status-${normalized}`}>
      {status || 'Pending'}
    </span>
  );
};

export default StatusBadge;
