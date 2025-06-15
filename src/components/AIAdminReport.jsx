// components/AIAdminReport.jsx
import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const AIAdminReport = ({ token }) => {
  const [report, setReport] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/ai/generate-report`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(res.data.report);
    } catch (err) {
      setReport('Error generating report.');
    }
  };

  return (
    <div>
      <h3>Generate Admin Report</h3>
      <button onClick={handleGenerate}>Generate</button>
      <pre style={{ whiteSpace: 'pre-wrap', background: '#f4f4f4', padding: '10px' }}>{report}</pre>
    </div>
  );
};

export default AIAdminReport;
