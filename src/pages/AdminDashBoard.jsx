import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const AdminDashboard = ({ adminToken, onLogout }) => {
  const [dashboard, setDashboard] = useState([]);
  const [report, setReport] = useState({ criticalTasks: [], overdueTasks: [] });
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/dashboard`, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setDashboard(res.data.usersSummary);
      setReport(res.data.report);
    } catch (err) {
      console.error('Error loading dashboard:', err);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/api/admin/users`, form, {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      setMessage('User created successfully!');
      setForm({ name: '', email: '', password: '', role: 'user' });
      fetchDashboard();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleToggleActivation = async (userId) => {
  try {
    const res = await axios.patch(`${backendUrl}/api/admin/users/${userId}/deactivate`, {}, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });

    // Use updated active status from backend response
    setDashboard(prev =>
      prev.map(user =>
        user.userId === userId ? { ...user, active: res.data.active } : user
      )
    );

    setMessage(res.data.message);
  } catch (err) {
    setMessage('Failed to update user status');
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Admin Dashboard</h1>
        <button onClick={onLogout} style={styles.logoutBtn}>Logout</button>
      </div>

      {/* Create User Section */}
      <div style={styles.section}>
        <h2 style={{ color: '#2c3e50', marginBottom: '16px' }}>Create New User</h2>
        <form onSubmit={handleCreateUser} style={styles.formBox}>
          <div style={styles.formRow}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              style={styles.input}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formRow}>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={styles.input}
            />
            <select
              name="role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={styles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" style={styles.createBtn}>Create User</button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '8px' }}>{message}</p>}
      </div>

      {/* Users Summary */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>Users Summary</h2>
        {dashboard.map((user) => (
          <div key={user.userId} style={styles.card}>
            <h3>{user.name} ({user.email})</h3>
            <p>
              Total: {user.totalTasks} | Completed: {user.completedTasks} |
              Pending: {user.pendingTasks} | Overdue: {user.overdueTasks}
            </p>
            <button
              onClick={() => handleToggleActivation(user.userId)}
              style={{
                ...styles.toggleBtn,
                backgroundColor: user.active ? '#f97316' : '#10b981'
              }}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>

      {/* Critical Tasks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📌 Critical Tasks (Due in 2 days)</h2>
        {report.criticalTasks.map(task => (
          <div key={task._id} style={styles.taskCard}>
            <p><strong>{task.name}</strong> - {task.user?.name} ({task.user?.email})</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Overdue Tasks */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚠️ Overdue Tasks</h2>
        {report.overdueTasks.map(task => (
          <div key={task._id} style={styles.taskCard}>
            <p><strong>{task.name}</strong> - {task.user?.name} ({task.user?.email})</p>
            <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    color: '#2c3e50',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '10px',
  },
  logoutBtn: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  section: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#2c3e50',
  },
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#2c3e50',
    backgroundColor: '#f0f3f5',
    outline: 'none',
  },
  createBtn: {
    padding: '10px 16px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '150px',
    alignSelf: 'flex-start',
  },
  card: {
    backgroundColor: '#ecf0f1',
    padding: '15px',
    margin: '10px 0',
    borderRadius: '8px',
  },
  toggleBtn: {
    color: 'white',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '8px',
    fontWeight: 'bold'
  },
  taskCard: {
    backgroundColor: '#dfe6e9',
    padding: '12px',
    margin: '6px 0',
    borderRadius: '8px',
  }
};

export default AdminDashboard;
