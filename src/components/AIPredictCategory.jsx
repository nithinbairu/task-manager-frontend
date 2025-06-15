// components/AIPredictCategory.jsx
import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// You need to pass the userId as a prop to this component
const AIPredictCategory = ({ token, userId }) => { // <--- Added userId prop
  const [newTaskSummary, setNewTaskSummary] = useState(''); // Changed from 'tasks' to 'newTaskSummary'
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState(''); // To show error messages

  const handlePredict = async () => {
    setError(''); // Clear previous errors
    setPrediction(''); // Clear previous prediction

    if (!userId || !newTaskSummary.trim()) { // Check if userId and summary are present
      setError('Please provide a user ID and a task summary.');
      return;
    }

    try {
      // Make a GET request to the correct URL with userId
      const res = await axios.get(
        `${backendUrl}/api/ai/predict-category/${userId}`, // userId in URL parameter
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { // Sending newTaskSummary as a query parameter for a GET request
            newTaskSummary: newTaskSummary
          }
        }
      );
      setPrediction(res.data.predictedCategory);
    } catch (err) {
      console.error('Prediction failed:', err.response ? err.response.data : err.message);
      setError('Error predicting category. See console for details.');
      setPrediction('Error predicting category.');
    }
  };

  return (
    <div>
      <h3>Predict Next Category (AI-Powered)</h3>
      {/* You might need to add an input for userId if it's not passed as a prop */}
      <input
        type="text"
        value={newTaskSummary}
        onChange={(e) => setNewTaskSummary(e.target.value)}
        placeholder="Enter new task summary (e.g., 'Plan vacation')"
      />
      <button onClick={handlePredict}>Predict Category</button>
      {prediction && <p><strong>Prediction:</strong> {prediction}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AIPredictCategory;