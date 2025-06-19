import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const AIGenerateDescription = ({ token }) => {
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!summary.trim()) return; 
    setLoading(true);
    setDescription('');
    setError('');
    try {
      const res = await axios.post(
        `${backendUrl}/api/ai/generate-description`,
        { summary: summary.trim() },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDescription(res.data.description);
    } catch (err) {
      setError('Error generating description.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Generate Task Description</h3>
      <input
        type="text"
        placeholder="Enter task summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading || !summary.trim()}>
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}
    </div>
  );
};

export default AIGenerateDescription;
