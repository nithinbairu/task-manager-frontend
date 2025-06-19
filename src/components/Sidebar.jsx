
import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { FaTachometerAlt, FaTasks, FaCog, FaUserCircle, FaSignOutAlt } from 'react-icons/fa'; 

import '../styles/Sidebar.css';
const Sidebar = ({ userName, userRole, onLogout }) => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>TaskWise AI</h2>
                <p>Smart Task Management</p>
            </div>
            <nav className="sidebar-nav">
                <ul>
                    <li className={location.pathname === '/dashboard' ? 'active' : ''}>
                        <Link to="/dashboard">
                            <FaTachometerAlt className="nav-icon" /> Dashboard
                        </Link>
                    </li>
                    <li className={location.pathname === '/tasks' ? 'active' : ''}>
                        <Link to="/tasks">
                            <FaTasks className="nav-icon" /> Tasks
                        </Link>
                    </li>
                    <li className={location.pathname === '/settings' ? 'active' : ''}>
                        <Link to="/settings">
                            <FaCog className="nav-icon" /> Settings
                        </Link>
                    </li>
                    
                </ul>
            </nav>
            <div className="sidebar-footer">
                <div className="user-info">
                    <FaUserCircle className="user-icon" />
                    <div className="user-details">
                        <span className="user-name">{userName}</span>
                        <span className="user-role">{userRole}</span>
                    </div>
                </div>
                <button onClick={onLogout} className="logout-button">
                    <FaSignOutAlt className="logout-icon" /> Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;