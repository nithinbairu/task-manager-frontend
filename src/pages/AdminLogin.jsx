import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Login = ({ onAdminLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/adminLogin`, form);
      onAdminLogin(res.data.token);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue', // Changed background color to lightblue
    padding: '16px',
    fontFamily: 'Arial, sans-serif', // Basic font
  };

  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '448px', // Equivalent to max-w-md
    boxSizing: 'border-box', // Include padding in width
  };

  const headingStyle = {
    fontSize: '2rem', // text-3xl
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#374151', // text-gray-800
    marginBottom: '24px', // mb-6
  };

  const formInputStyle = {
    width: '100%',
    padding: '10px 16px', // px-4 py-2
    border: '1px solid #d1d5db', // border border-gray-300
    borderRadius: '6px', // rounded-md
    boxSizing: 'border-box',
    marginBottom: '16px', // space-y-4 for elements
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#2563eb', // bg-blue-600
    color: '#ffffff',
    padding: '8px 16px', // py-2 px-4
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500', // font-medium
    transition: 'background-color 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const buttonHoverStyle = {
    backgroundColor: '#1d4ed8', // hover:bg-blue-700
  };

  const errorStyle = {
    color: '#ef4444', // text-red-500
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '0.875rem', // text-sm
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Added TaskWise AI title */}
        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#1a202c', marginBottom: '24px'}}>TaskWise AI</h1>
        <h2 style={headingStyle}>Login</h2>
        
        <h3 style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
          
          <a href="/login" style={{ color: 'green', textDecoration: 'none', fontWeight: '800' }}>
            User
          </a>
          <a href="/admin-login" style={{ color: 'blue', textDecoration: 'none', fontWeight: '800' }}>
            Admin
          </a>
          
        </h3>

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={formInputStyle}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={formInputStyle}
          />
          <button
            type="submit"
            style={buttonStyle}
            onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
            onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
          >
            Login
          </button>
        </form>



        {error && (
          <p style={errorStyle}>{error}</p>
        )}


      </div>
    </div>
  );
};

export default Login;
