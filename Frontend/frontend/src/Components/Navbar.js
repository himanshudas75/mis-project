// Navbar.js
import React from 'react';
import '../Styles/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src='./logo512.png' alt='logo'></img>
      </div>
      <h2>Hi, There</h2>
      <ul className="nav-links">
        <li id='home'>
          <a href="/home">Home</a>
        </li>
        <li id='instruction'>
          <a href="/instructions">Instructions</a>
        </li>
        <li id='details'>
          <a href="/details">Details</a>
        </li>
        <li id='edit-details'>
          <a href="/edit">Edit Details</a>
        </li>
        <li id='view'>
          <a href="/view">View Details</a>
        </li>
        <li id='apply'>
          <a href="/apply">Apply</a>
        </li>
        <li>
          <a href="/print">Print</a>
        </li>
        <li>
          <a href="/">Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
