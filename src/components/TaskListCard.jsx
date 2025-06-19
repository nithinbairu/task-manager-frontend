
import React from 'react';
import '../styles/TaskListCard.css'; 

const TaskListCard = ({ title, tasks, emptyMessage }) => {
    return (
        <div className="task-list-card">
            <h3>{title}</h3>
            {tasks && tasks.length > 0 ? (
                <ul>
                    {tasks.map(task => (
                        <li key={task._id} className="task-list-item">
                            <span className="task-name">{task.name || task.summary}</span>
                            {task.dueDate && (
                                <span className="task-due-date">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                            )}
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="empty-message">{emptyMessage}</p>
            )}
        </div>
    );
};

export default TaskListCard;