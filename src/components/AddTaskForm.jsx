import React from 'react';
import './AddTaskForm.css';

function AddTaskForm({ inputValue, setInputValue, addTask }) {
  return (
    <form onSubmit={addTask} className="add-task-form">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
        className="task-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
