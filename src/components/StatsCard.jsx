// src/components/StatsCard.jsx
import React from 'react';
import '../styles/StatsCard.css'; // Create this CSS file

const StatsCard = ({ title, value, icon, description, color }) => {
    return (
        <div className="stats-card" style={{ '--card-color': color }}>
            <div className="stats-header">
                <span className="stats-icon">{icon}</span>
                <h4 className="stats-title">{title}</h4>
            </div>
            <div className="stats-body">
                <span className="stats-value">{value}</span>
                <p className="stats-description">{description}</p>
            </div>
        </div>
    );
};

export default StatsCard;