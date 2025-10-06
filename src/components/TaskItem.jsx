import React from 'react';
import './TaskItem.css';

function TaskItem({
  task,
  toggleTask,
  deleteTask,
  startEditing,
  editingId,
  editingText,
  setEditingText,
  saveEdit,
  cancelEdit
}) {
  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTask(task.id)}
        className="task-checkbox"
      />
      
      {editingId === task.id ? (
        <div className="edit-container">
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            className="edit-input"
            autoFocus
          />
          <div className="edit-buttons">
            <button onClick={() => saveEdit(task.id)} className="save-button">
              ✓
            </button>
            <button onClick={cancelEdit} className="cancel-button">
              ✕
            </button>
          </div>
        </div>
      ) : (
        <>
          <span className="task-text">{task.text}</span>
          <div className="task-actions">
            <button
              onClick={() => startEditing(task.id, task.text)}
              className="edit-button"
              disabled={task.completed}
            >
              ✎
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="delete-button"
            >
              🗑
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
