import React, { useState } from 'react';
import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, form);
      onLogin(res.data.token);
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

  const googleButtonStyle = {
    width: '100%',
    backgroundColor: '#dc2626', // bg-red-600
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '16px',
  };

  const googleButtonHoverStyle = {
    backgroundColor: '#b91c1c', // hover:bg-red-700
  };

  const errorStyle = {
    color: '#ef4444', // text-red-500
    textAlign: 'center',
    marginTop: '16px',
    fontSize: '0.875rem', // text-sm
  };

  const linkTextStyle = {
    textAlign: 'center',
    color: '#4b5563', // text-gray-600
    marginTop: '24px',
    fontSize: '0.875rem',
  };

  const linkStyle = {
    color: '#2563eb', // text-blue-600
    textDecoration: 'none',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        {/* Added TaskWise AI title */}
        <h1 style={{fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', color: '#1a202c', marginBottom: '24px'}}>TaskWise AI</h1>
        <h2 style={headingStyle}>Login</h2>
        
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

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <p style={{ color: '#4b5563', marginBottom: '16px' }}>Or login with Google:</p>
          <a href={`${backendUrl}/api/auth/google`} style={{ textDecoration: 'none' }}> {/* Corrected: Removed extra '}' */}
            <button
              type="button"
              style={googleButtonStyle}
              onMouseOver={e => e.currentTarget.style.backgroundColor = googleButtonHoverStyle.backgroundColor}
              onMouseOut={e => e.currentTarget.style.backgroundColor = googleButtonStyle.backgroundColor}
            >
              <svg style={{ width: '20px', height: '20px', marginRight: '8px' }} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.0003 4.75C14.0133 4.75 15.7953 5.488 17.0513 6.744L20.0883 3.707C18.0693 1.688 15.2283 0.75 12.0003 0.75C7.30032 0.75 3.32732 3.654 1.67332 7.643L5.47432 9.539C6.09632 7.784 8.71832 6.75 12.0003 6.75C14.9393 6.75 17.0603 7.842 17.0603 7.842L20.1703 10.952C20.1703 10.952 18.0603 14.152 12.0003 14.152C8.71832 14.152 6.09632 13.116 5.47432 11.361L1.67332 13.257C3.32732 17.246 7.30032 20.15 12.0003 20.15C15.2283 20.15 18.0693 19.21 20.0883 17.19L17.0513 14.152C15.7953 15.408 14.0133 16.146 12.0003 16.146C8.71832 16.146 6.09632 15.11 5.47432 13.355L1.67332 15.251C3.32732 19.24 7.30032 22.15 12.0003 22.15C16.6993 22.15 20.6723 19.24 22.3263 15.251L18.5253 13.355C17.9033 11.6 15.2813 10.564 12.0003 10.564C8.71832 10.564 6.09632 9.528 5.47432 7.773L1.67332 9.669C3.32732 5.68 7.30032 2.775 12.0003 2.775C14.9393 2.775 17.0603 3.867 17.0603 3.867Z" />
              </svg>
              <span>Login with Google</span>
            </button>
          </a>
        </div>

        {error && (
          <p style={errorStyle}>{error}</p>
        )}

        {/* Signup Link */}
        <p style={linkTextStyle}>
          Don't have an account?{' '}
          <a href="/signup" style={linkStyle}>
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
