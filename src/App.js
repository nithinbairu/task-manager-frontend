import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Signup from './pages/SignUp';
import Dashboard from './pages/DashBoard'; 
import Login from './pages/Login';
import OAuthSuccess from './pages/OAuthSuccess';
import TasksPage from './pages/TasksPage'; 
import AdminLogin from './pages/AdminLogin';
import AdminDashBoard from './pages/AdminDashBoard';

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [adminToken,setAdminToken]=useState(localStorage.getItem('adminToken'))
  const navigate = useNavigate();

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
    navigate('/'); 
  };
  const handleadminLogin=(jwt)=>{
    localStorage.setItem('adminToken',jwt)
    setAdminToken(jwt)
    navigate('/admin')
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login'); 
  };
  const handleAdminLogout=()=>{
    localStorage.removeItem('adminToken')
    setAdminToken(null)
    navigate('/admin-login')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Dashboard token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />

      <Route
        path="/tasks"
        element={token ? <TasksPage token={token} onLogout={handleLogout} /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route path="/signup" element={<Signup />} />

      <Route path="/oauth-success" element={<OAuthSuccess onLogin={handleLogin} />} />

      <Route
        path="*"
        element={token ? <Navigate to="/" /> : <Navigate to="/login" />}
      />
      <Route path='/admin-login' element={<AdminLogin onAdminLogin={handleadminLogin} />}
      />

      <Route 
        path='/admin'
        element={adminToken?<AdminDashBoard adminToken={adminToken} onLogout={handleAdminLogout} />:<Navigate to='/admin-login'/>}/>
    </Routes>
  );
};

export default AppWrapper;