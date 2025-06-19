// src/services/dashboardService.js
import axios from 'axios';

const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const API_URL = `${BACKEND_BASE_URL}/api/dashboard`; // This is the base for dashboard routes

const getConfig = (token) => {
    
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const getDashboardStats = async (token) => {
    try {
        // CORRECTED: The API_URL already ends with /api/dashboard, so just append /stats
        const response = await axios.get(`${API_URL}/stats`, getConfig(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        throw error;
    }
};

export const getTasksByDate = async (token) => {
    try {
        // CORRECTED: The API_URL already ends with /api/dashboard, so just append /tasks-completed-7-days
        const response = await axios.get(`${API_URL}/tasks-completed-7-days`, getConfig(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks completed by date:', error);
        throw error;
    }
};

export const getTaskCategoryDistribution = async (token) => {
    try {
        // CORRECTED: The API_URL already ends with /api/dashboard, so just append /category-distribution
        const response = await axios.get(`${API_URL}/category-distribution`, getConfig(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching task category distribution:', error);
        throw error;
    }
};

export const getRecentTasks = async (token) => {
    try {
        // CORRECTED: The API_URL already ends with /api/dashboard, so just append /recent-tasks
        const response = await axios.get(`${API_URL}/recent-tasks`, getConfig(token));
        return response.data;
    } catch (error) {
        console.error('Error fetching recent tasks:', error);
        throw error;
    }
};

// You might already have getTasks in taskService.js
// If getTasks can take filters for 'today' or 'overdue', use that
// If not, you'll need a new backend endpoint for tasks due today