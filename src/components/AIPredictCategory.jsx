
import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const AIPredictCategory = ({ token, userId }) => { 
  const [newTaskSummary, setNewTaskSummary] = useState(''); 
  const [prediction, setPrediction] = useState('');
  const [error, setError] = useState(''); 

  const handlePredict = async () => {
    setError(''); 
    setPrediction(''); 

    if (!userId || !newTaskSummary.trim()) { 
      setError('Please provide a user ID and a task summary.');
      return;
    }

    try {
      
      const res = await axios.get(
        `${backendUrl}/api/ai/predict-category/${userId}`, 
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
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