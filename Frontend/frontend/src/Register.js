import './App.css';
import React from 'react';
import RegistrationForm from './Components/RegistrationForm';
import './Styles/register.css';

function Register() {
  const text = 'It will only take up a few minutes to get started'

  return (
    <div className="container">
      <div className="institution">
        <img src='./logo512.png' alt='logo'></img>
        <h2> Indian Institute of Technology</h2>
        <h2>(Indian School of Mines)</h2>
        <h2>Dhanbad</h2>

        <h1>Faculty Recruitment Portal</h1>
        <p>{text}</p>
      </div>
      <RegistrationForm />
    </div>
  );
}

export default Register;
