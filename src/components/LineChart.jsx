// src/components/LineChart.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ labels, data }) => {
    const chartData = {
        labels: labels, // e.g., ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        datasets: [
            {
                label: 'Tasks Completed',
                data: data, // e.g., [0, 0, 1, 2, 1, 3, 4]
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                tension: 0.1,
                fill: false,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false, // Don't show legend for single dataset
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax: 4, // Example: Adjust based on your data scale
                ticks: {
                    stepSize: 1,
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;