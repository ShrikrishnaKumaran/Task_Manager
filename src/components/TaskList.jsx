import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({
  filteredTasks,
  filter,
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
    <ul className="task-list">
      {filteredTasks.length === 0 ? (
        <li className="empty-state">
          {filter === 'all' && '🎉 No tasks yet. Add one to get started!'}
          {filter === 'active' && '✨ No active tasks. Great job!'}
          {filter === 'completed' && '📋 No completed tasks yet.'}
        </li>
      ) : (
        filteredTasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            startEditing={startEditing}
            editingId={editingId}
            editingText={editingText}
            setEditingText={setEditingText}
            saveEdit={saveEdit}
            cancelEdit={cancelEdit}
          />
        ))
      )}
    </ul>
  );
}

export default TaskList;
