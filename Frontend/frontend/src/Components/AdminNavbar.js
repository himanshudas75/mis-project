// Navbar.js
import React from 'react';
import '../Styles/navbar.css';

const AdminNavbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src='../logo512.png' alt='logo'></img>
      </div>
      <h2>Hi, There</h2>
      <ul className="nav-links">
        <li id='home'>
          <a href="/admin/applications">Home</a>
        </li>
        <li id='instruction'>
          <a href="/admin/applications">Applications</a>
        </li>
        <li id='details'>
          <a href="/admin/jobs">Job Openings</a>
        </li>
        <li>
          <a href="/admin">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
