import React, { useState } from 'react';
import '../Styles/login.css';
import '../Styles/forms.css';

const AdminLogin = () => {
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
        console.log('Login Form Data:', formData);
    };

    return (
        <div className="body">
            <div className="text">
                <img src='../logo512.png' alt='logo'></img>
                <h2> Indian Institute of Technology</h2>
                <h2>(Indian School of Mines)</h2>
                <h2>Dhanbad</h2>

                <h1>Faculty Recruitment Admin</h1>
            </div>
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
                <button type="submit" style={{marginBottom: '2rem'}}>Sign in</button>
            </form>
        </div>
    );
};

export default AdminLogin;
