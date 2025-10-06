import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import AddTaskForm from './components/AddTaskForm';
import Stats from './components/Stats';
import FilterButtons from './components/FilterButtons';
import TaskList from './components/TaskList';
import ClearButton from './components/ClearButton';
import ThemeToggle from './components/ThemeToggle';

function App() {
  // State management
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save theme to localStorage and apply to document
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Task operations
  const addTask = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveEdit = (id) => {
    if (editingText.trim() === '') return;
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editingText } : task
    ));
    setEditingId(null);
    setEditingText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Computed values
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="container">
        <Header />

        <AddTaskForm
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTask={addTask}
        />

        <Stats
          total={tasks.length}
          active={activeCount}
          completed={completedCount}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

        <TaskList
          filteredTasks={filteredTasks}
          filter={filter}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEditing={startEditing}
          editingId={editingId}
          editingText={editingText}
          setEditingText={setEditingText}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />

        <ClearButton
          clearCompleted={clearCompleted}
          completedCount={completedCount}
        />
      </div>
    </div>
  );
}

export default App;
