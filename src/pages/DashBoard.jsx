// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Ensure this is correctly imported
import Sidebar from '../components/Sidebar';
import StatsCard from '../components/StatsCard';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import TaskListCard from '../components/TaskListCard';

// Assume these services exist for fetching dashboard data
import { getDashboardStats, getTasksByDate, getTaskCategoryDistribution, getRecentTasks } from '../services/dashboardService'; // You'll need to create this service
import { getTasks } from '../services/taskService'; // Existing service for general task list

import '../styles/Dashboard.css'; // Import the CSS file

const Dashboard = ({ token, onLogout }) => {
    console.log("Dashboard component received token:", token);
    const [stats, setStats] = useState({
        totalTasks: 0,
        completedTasks: 0,
        completionRate: 0, // Calculated as a percentage
        dueTodayTasks: 0,
        overdueTasks: 0,
    });
    const [tasksCompletedData, setTasksCompletedData] = useState({ labels: [], data: [] });
    const [categoryDistributionData, setCategoryDistributionData] = useState({ labels: [], data: [] });
    const [dueTodayTasks, setDueTodayTasks] = useState([]);
    const [recentTasks, setRecentTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userRole, setUserRole] = useState('');
    const [userName, setUserName] = useState('Demo User'); // Default or extract from token

    useEffect(() => {
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUserName(decoded.name || decoded.username || 'Demo User'); // Adjust based on your token payload
                setUserRole(decoded.role || 'user');
                // You might also get user ID here if needed for specific data fetches
            } catch (error) {
                console.error("Error decoding token:", error);
                onLogout();
            }
        }
        fetchDashboardData();
    }, [token, onLogout]);

    const fetchDashboardData = async () => {
        setLoading(true);
        try {
            // Fetch overall stats
            const statsData = await getDashboardStats(token);
            setStats(statsData);

            // Fetch tasks completed for chart
            const completedData = await getTasksByDate(token); // Example: fetches last 7 days completed tasks
            setTasksCompletedData(completedData);

            // Fetch category distribution for chart
            const categoryData = await getTaskCategoryDistribution(token);
            setCategoryDistributionData(categoryData);

            // Fetch tasks due today
            // Note: getTasksDueToday is a specific dashboard controller, so use that service call
            // assuming you create a dashboardService that exposes getTasksDueToday
            // If getTasksDueToday is part of taskService, adjust import and call accordingly
            const dueToday = await getTasks({ status: 'pending', dueDate: 'today' }, token); // Assuming getTasks can take filters
            
            setDueTodayTasks(dueToday);

            // Fetch recent tasks
            const recent = await getRecentTasks(token); // Example: fetches last 5-10 recently created/updated tasks
            setRecentTasks(recent);

        } catch (err) {
            console.error("Error fetching dashboard data:", err);
            // Consider more granular error handling or just re-login
            // onLogout(); // Uncomment if you want to force logout on any dashboard data fetch error
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <p>Loading dashboard...</p>
                {/* You can add a spinner here */}
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <Sidebar userName={userName} userRole={userRole} onLogout={onLogout} />
            <div className="dashboard-content">
                <header className="dashboard-header">
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening with your tasks.</p>
                </header>

                <section className="dashboard-stats-grid">
                    <StatsCard
                        title="Total Tasks"
                        value={stats.totalTasks}
                        icon="✅" // Placeholder for an icon
                        description="All tasks created"
                        color="#4CAF50" // Example color
                    />
                    <StatsCard
                        title="Completed"
                        value={stats.completedTasks}
                        icon="📈"
                        description={`${isNaN(stats.completionRate) ? '0' : stats.completionRate.toFixed(0)}% completion rate`}
                        color="#2196F3"
                    />
                    <StatsCard
                        title="Due Today"
                        value={stats.dueTodayTasks}
                        icon="📅"
                        description="Tasks requiring attention"
                        color="#FFC107"
                    />
                    <StatsCard
                        title="Overdue"
                        value={stats.overdueTasks}
                        icon="⚠️"
                        description="Immediate action needed"
                        color="#F44336"
                    />
                </section>

                <section className="dashboard-charts-grid">
                    <div className="chart-card">
                        <h3>Tasks Completed (Last 7 Days)</h3>
                        <LineChart data={tasksCompletedData.data} labels={tasksCompletedData.labels} />
                    </div>
                    <div className="chart-card">
                        <h3>Task Categories Distribution</h3>
                        <PieChart data={categoryDistributionData.data} labels={categoryDistributionData.labels} />
                    </div>
                </section>

                <section className="dashboard-lists-grid">
                    <TaskListCard title="Tasks Due Today" tasks={dueTodayTasks} emptyMessage="No tasks due today" />
                    <TaskListCard title="Recent Tasks" tasks={recentTasks} emptyMessage="No recent tasks" />
                </section>

                {/* You can re-integrate your AI components here if needed */}
                {/* <AIPredictCategory token={token} userId={userId} /> */}
                {/* <AIGenerateDescription token={token} /> */}
                {/* {userRole === 'admin' && <AIAdminReport token={token} />} */}
            </div>
        </div>
    );
};

export default Dashboard;