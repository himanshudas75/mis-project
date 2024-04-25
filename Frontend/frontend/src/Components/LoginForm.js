import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login form submission here (e.g., send data to server)
        fetch('http://127.0.0.1:5000/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json', // Ensure 'Content-Type' header is set
    },
    body: JSON.stringify({
        username: formData.username,
        password: formData.password,
    }),
})
.then(response => {
    // Handle response
    console.log(response);
})
.catch(error => {
    // Handle error
    console.log(error);
});

        console.log('Login Form Data:', formData);
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className='values'>
                <label htmlFor="username">Username *</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className='values'>
                <label htmlFor="password">Password *</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>

            <a href="www.google.com" className="forgot-password">
                Forgot password?
            </a>
            <button type="submit" onClick={handleSubmit}>Sign in</button>
            <p>Don't Have an Account? <a href="/register" className="forgot-password">Sign Up</a> </p>
        </form>
    );
};

export default LoginForm;
