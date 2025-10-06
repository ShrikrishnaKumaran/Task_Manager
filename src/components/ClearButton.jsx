import React from 'react';
import './ClearButton.css';

function ClearButton({ clearCompleted, completedCount }) {
  if (completedCount === 0) return null;

  return (
    <button onClick={clearCompleted} className="clear-button">
      Clear Completed ({completedCount})
    </button>
  );
}

export default ClearButton;
