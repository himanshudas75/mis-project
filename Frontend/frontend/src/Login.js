import './App.css';
import React from 'react';
import './Styles/login.css';
import './Styles/forms.css';
import LoginForm from './Components/LoginForm';

function Login() {
    return (
        <div className="body">
            <div className="text">
                <img src='./logo512.png' alt='logo'></img>
                <h2> Indian Institute of Technology</h2>
                <h2>(Indian School of Mines)</h2>
                <h2>Dhanbad</h2>

                <h1>Faculty Recruitment Portal</h1>
            </div>
            <LoginForm />
        </div>
    );
}

export default Login;