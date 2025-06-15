    // src/components/PieChart.jsx
    import React from 'react';
    import { Pie } from 'react-chartjs-2';
    import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

    ChartJS.register(ArcElement, Tooltip, Legend);

    const PieChart = ({ labels, data }) => {
        const chartData = {
            labels: labels, // e.g., ['Work', 'Personal', 'Shopping', 'Learning']
            datasets: [
                {
                    data: data, // e.g., [12, 19, 3, 5]
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right', // or 'top', 'bottom', 'left'
                    labels: {
                        boxWidth: 12,
                        padding: 10,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += context.parsed;
                            }
                            return label;
                        }
                    }
                }
            },
        };

        return <Pie data={chartData} options={options} />;
    };

    export default PieChart;