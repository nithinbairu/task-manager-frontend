import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './pages/SignUp';
import Dashboard from './pages/DashBoard'; // Corrected capitalization from DashBoard to Dashboard for consistency
import Login from './pages/Login';
import OAuthSuccess from './pages/OAuthSuccess';
import TasksPage from './pages/TasksPage'; // <--- NEW: Import your TasksPage component

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    navigate('/'); // Redirect after login
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <Routes>
      {/* Route for Dashboard - accessible if token exists */}
      <Route
        path="/"
        element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />

      {/* NEW: Route for TasksPage - accessible if token exists */}
      <Route
        path="/tasks"
        element={token ? <TasksPage token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />

      {/* Login Page */}
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* OAuth Success Page */}
      <Route path="/oauth-success" element={<OAuthSuccess onLogin={handleLogin} />} />

      {/* Fallback for unmatched routes - redirect to dashboard if logged in, otherwise to login */}
      <Route
        path="*"
        element={token ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default AppWrapper;