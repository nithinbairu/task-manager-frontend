// src/pages/TasksPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '../components/Sidebar';
import TaskFilters from '../components/TaskFilters';
import TaskTable from '../components/TaskTable';
import TaskModal from '../components/TaskModal'; // For Add/Edit
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService'; // Your existing task services
import { jwtDecode } from 'jwt-decode'; // For user role/name in sidebar

import '../styles/TasksPage.css'; // New CSS file for this page

const TasksPage = ({ token, onLogout }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentTask, setCurrentTask] = useState(null); // For editing a task
    const [filters, setFilters] = useState({
        search: '',
        status: 'all', // 'all', 'pending', 'completed'
        category: 'all', // 'all', 'work', 'personal', etc.
        dueDate: 'all', // 'all', 'today', 'upcoming', 'overdue'
    });
    const [userName, setUserName] = useState('Demo User');
    const [userRole, setUserRole] = useState('user');

    // Fetch tasks based on current filters
    const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
        // CORRECTED LINE: Pass filters object FIRST, token SECOND
        const data = await getTasks(filters, token);
        console.log("TasksPage: Fetched tasks:", data); // Add this log for verification
        setTasks(data);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        // Handle unauthorized or other errors, perhaps redirect to login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
             onLogout(); // This will redirect to login
        }
    } finally {
        setLoading(false);
    }
}, [token, filters, onLogout]);

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.name || decoded.username || 'Demo User');
                setUserRole(decoded.role || 'user');
            } catch (error) {
                console.error("Error decoding token:", error);
                onLogout();
            }
        }
        fetchTasks(); // Initial fetch
    }, [token, onLogout, fetchTasks]);

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
    };

    const handleAddTask = () => {
        setCurrentTask(null); // Clear any previous task for editing
        setIsModalOpen(true);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setIsModalOpen(true);
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            try {
                await deleteTask(taskId, token);
                fetchTasks(); // Refresh tasks after deletion
            } catch (err) {
                console.error("Error deleting task:", err);
                alert("Failed to delete task.");
            }
        }
    };

    const handleCompleteTask = async (task) => {
        try {
            // Assuming your updateTask handles status changes
            await updateTask(task._id, { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }, token);
            fetchTasks(); // Refresh tasks
        } catch (err) {
            console.error("Error completing task:", err);
            alert("Failed to update task status.");
        }
    };

    const handleSaveTask = async (taskData) => {
        try {
            if (currentTask) {
                await updateTask(currentTask._id, taskData, token);
            } else {
                await createTask(taskData, token);
            }
            setIsModalOpen(false);
            fetchTasks(); // Refresh tasks after add/edit
        } catch (err) {
            console.error("Error saving task:", err);
            alert("Failed to save task.");
        }
    };

    const handleExportTasks = () => {
        // Implement export logic here (e.g., to CSV, JSON)
        alert('Export functionality coming soon!');
        console.log('Exporting tasks:', tasks);
    };

    return (
        <div className="tasks-page-container">
            <Sidebar userName={userName} userRole={userRole} onLogout={onLogout} />
            <div className="tasks-content">
                <header className="tasks-header">
                    <h1>Tasks</h1>
                    <p>Manage and organize your tasks efficiently</p>
                    <div className="tasks-actions">
                        <button className="btn-secondary" onClick={handleExportTasks}>
                            <i className="fas fa-download"></i> Export
                        </button>
                        <button className="btn-primary" onClick={handleAddTask}>
                            <i className="fas fa-plus"></i> Add Task
                        </button>
                    </div>
                </header>

                <TaskFilters filters={filters} onFilterChange={handleFilterChange} token={token} />

                {loading ? (
                    <p className="loading-message">Loading tasks...</p>
                ) : (
                    <>
                        {tasks.length === 0 ? (
                            <div className="no-tasks-found">
                                <p>No tasks found matching your criteria</p>
                                <button className="btn-primary" onClick={handleAddTask}>
                                    Create Your First Task
                                </button>
                            </div>
                        ) : (
                            <TaskTable
                                tasks={tasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onComplete={handleCompleteTask}
                            />
                        )}
                    </>
                )}

                {isModalOpen && (
                    <TaskModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSave={handleSaveTask}
                        task={currentTask}
                        token={token} // Pass token for AI description generation
                    />
                )}
            </div>
        </div>
    );
};

export default TasksPage;