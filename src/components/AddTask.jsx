import React, { useState } from 'react';
import { createTask } from '../services/taskService';

const AddTask = ({ refreshTasks, token }) => {
  const [task, setTask] = useState({ name: '', description: '', category: '', dueDate: '' });

  const handleChange = e => setTask({ ...task, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await createTask(task, token);
      refreshTasks();
      setTask({ name: '', description: '', category: '', dueDate: '' });
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="name" placeholder="Task Name" value={task.name} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={task.description} onChange={handleChange} required />
      <input name="category" placeholder="Category" value={task.category} onChange={handleChange} required />
      <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
