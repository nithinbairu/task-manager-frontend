import React, { useState, useEffect } from 'react';
import { getCategories } from '../services/taskService'; 
import '../styles/TaskFilters.css';

const TaskFilters = ({ filters, onFilterChange, token }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            if (!token) {
                setCategories(['all', 'Work', 'Personal', 'Shopping', 'Learning', 'General']);
                return;
            }
            try {
                const fetchedCategories = await getCategories(token);

               
                if (Array.isArray(fetchedCategories)) {
                    setCategories(['all', ...fetchedCategories]);
                } else {
                    
                    console.error("Error: Fetched categories is not an array. Received:", typeof fetchedCategories, fetchedCategories);
                    setCategories(['all', 'Work', 'Personal', 'Shopping', 'Learning', 'General']); 
                }
              

            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories(['all', 'Work', 'Personal', 'Shopping', 'Learning', 'General']); 
            }
        };
        fetchCategories();
    }, [token]);

    const handleSearchChange = (e) => { onFilterChange({ search: e.target.value }); };
    const handleStatusChange = (e) => { onFilterChange({ status: e.target.value }); };
    const handleCategoryChange = (e) => { onFilterChange({ category: e.target.value }); };
    const handleDueDateChange = (e) => { onFilterChange({ dueDate: e.target.value }); };

    return (
        <div className="task-filters-bar">
            <div className="search-input-group">
                <i className="fas fa-search search-icon"></i>
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={filters.search}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="filter-dropdown-group">
                <select value={filters.status} onChange={handleStatusChange}>
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
            </div>
            <div className="filter-dropdown-group">
                <select value={filters.category} onChange={handleCategoryChange}>
                    {categories.map(cat => (
                        <option key={cat} value={cat === 'all' ? 'all' : cat}>
                            {cat === 'all' ? 'All Categories' : cat}
                        </option>
                    ))}
                </select>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
            </div>
            <div className="filter-dropdown-group">
                <select value={filters.dueDate} onChange={handleDueDateChange}>
                    <option value="all">Due Date</option>
                    <option value="today">Today</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="overdue">Overdue</option>
                </select>
                <i className="fas fa-chevron-down dropdown-arrow"></i>
            </div>
        </div>
    );
};

export default TaskFilters;