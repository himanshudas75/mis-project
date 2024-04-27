// Navbar.js
import React from 'react';
import '../Styles/navbar.css';

const Navbar = () => {
  const handleLogout =()=>{
    localStorage.clear();
    fetch("http://127.0.0.1:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Ensure 'Content-Type' header is set
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    })
      .then((response) => {
        // Handle response
        if (response.status === 200) {
          window.location.href = "/";
          console.log(200);
        }
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };
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
          <a href="/" onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
