import React from 'react';

const Navbar = ({ onLogout }) => (
  <nav style={{ backgroundColor: '#333', padding: '10px', color: 'white' }}>
    <span>Smart Task Manager</span>
    <button onClick={onLogout} style={{ float: 'right', backgroundColor: '#f44336', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
      Logout
    </button>
  </nav>
);

export default Navbar;
