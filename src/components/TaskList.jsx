import React, { useState } from 'react';
import { updateTask, deleteTask } from '../services/taskService';
import { exportToCSV, exportToExcel, exportToPDF } from '../utils/exportUtils';

const TaskList = ({ tasks, refreshTasks, token }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleStatusToggle = async (task) => {
    await updateTask(task._id, { status: task.status === 'pending' ? 'completed' : 'pending' }, token);
    refreshTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    refreshTasks();
  };

  const sortedTasks = [...tasks];
  if (sortField) {
    sortedTasks.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (sortField === 'dueDate') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h3>Tasks</h3>

      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => exportToCSV(tasks)}>Download CSV</button>
        <button onClick={() => exportToExcel(tasks)}>Download Excel</button>
        <button onClick={() => exportToPDF(tasks)}>Download PDF</button>
      </div>

      <table border="1" cellPadding="5" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
              Name {sortField === 'name' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('category')} style={{ cursor: 'pointer' }}>
              Category {sortField === 'category' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th onClick={() => handleSort('dueDate')} style={{ cursor: 'pointer' }}>
              Due Date {sortField === 'dueDate' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTasks.length > 0 ? (
            sortedTasks.map(task => (
              <tr key={task._id}>
                <td>{task.name}</td>
                <td>{task.category}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.status}</td>
                <td>
                  <button onClick={() => handleStatusToggle(task)}>
                    {task.status === 'pending' ? 'Complete' : 'Undo'}
                  </button>{' '}
                  <button onClick={() => handleDelete(task._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center' }}>
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
