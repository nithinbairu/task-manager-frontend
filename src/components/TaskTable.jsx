// src/components/TaskTable.jsx
import React from 'react';
import TaskItem from './TaskItem'; // Individual row/card
import '../styles/TaskTable.css'; // New CSS file

const TaskTable = ({ tasks, onEdit, onDelete, onComplete }) => {
    return (
        <div className="task-table-container">
            <div className="task-table-header">
                <div className="header-item task-name-header">Task Name</div>
                <div className="header-item task-category-header">Category</div>
                <div className="header-item task-dueDate-header">Due Date</div>
                <div className="header-item task-status-header">Status</div>
                <div className="header-item task-actions-header">Actions</div>
            </div>
            <div className="task-table-body">
                {tasks.map(task => (
                    <TaskItem
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onComplete={onComplete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskTable;