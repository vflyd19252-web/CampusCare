import React from 'react';

const StatCard = ({ count, label, type }) => {
  // Determine icon and color variant
  let iconClass = 'bi-stack';
  let variantClass = 'cc-stat-icon-blue';

  if (type === 'pending') {
    iconClass = 'bi-clock-fill';
    variantClass = 'cc-stat-icon-yellow';
  } else if (type === 'resolved') {
    iconClass = 'bi-check-lg';
    variantClass = 'cc-stat-icon-green';
  } else if (type === 'rejected') {
    iconClass = 'bi-x-lg';
    variantClass = 'cc-stat-icon-red';
  }

  return (
    <div className="cc-stat-card">
      <div className={`cc-stat-icon-wrapper ${variantClass}`}>
        <i className={`bi ${iconClass}`}></i>
      </div>
      <div className="cc-stat-number">{count}</div>
      <p className="cc-stat-label">{label}</p>
    </div>
  );
};

export default StatCard;
