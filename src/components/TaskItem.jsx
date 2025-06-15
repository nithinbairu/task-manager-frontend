// src/components/TaskItem.jsx
import React from 'react';
import moment from 'moment'; // npm install moment
import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from 'react-icons/fa'; // Install react-icons
import '../styles/TaskItem.css'; // New CSS file

const TaskItem = ({ task, onEdit, onDelete, onComplete }) => {
    const isOverdue = task.status !== 'completed' && moment(task.dueDate).isBefore(moment(), 'day');

    return (
        <div className={`task-item ${task.status} ${isOverdue ? 'overdue' : ''}`}>
            <div className="task-details">
                <span className="task-name">{task.name || task.summary}</span>
                <span className="task-category">{task.category || 'N/A'}</span>
                <span className="task-dueDate">
                    {task.dueDate ? moment(task.dueDate).format('MMM DD, YYYY') : 'No Due Date'}
                </span>
                <span className={`task-status ${task.status}`}>
                    {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
            </div>
            <div className="task-actions">
                <button
                    className="action-btn complete-btn"
                    onClick={() => onComplete(task)}
                    title={task.status === 'completed' ? 'Mark as Pending' : 'Mark as Complete'}
                >
                    {task.status === 'completed' ? <FaCheckCircle /> : <FaRegCircle />}
                </button>
                <button className="action-btn edit-btn" onClick={() => onEdit(task)} title="Edit Task">
                    <FaEdit />
                </button>
                <button className="action-btn delete-btn" onClick={() => onDelete(task._id)} title="Delete Task">
                    <FaTrash />
                </button>
            </div>
        </div>
    );
};

export default TaskItem;