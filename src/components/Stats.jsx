import React from 'react';
import './Stats.css';

function Stats({ total, active, completed }) {
  return (
    <div className="stats">
      <span className="stat-item">Total: {total}</span>
      <span className="stat-item">Active: {active}</span>
      <span className="stat-item">Completed: {completed}</span>
    </div>
  );
}

export default Stats;
