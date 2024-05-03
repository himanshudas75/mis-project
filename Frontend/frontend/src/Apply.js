// MainBody.js
import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './Styles/apply.css';
import './Styles/forms.css'

const options = [ // Example dropdown options
    { value: 'Electrical', label: 'Electrical Engineering' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
];

const Apply = () => {
    const [formData, setFormData] = useState({
        adv: '',
        post: '',
        dept: '',
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login form submission here (e.g., send data to server)
        fetch('http://127.0.0.1:5000/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure 'Content-Type' header is set
            },
            body: JSON.stringify({
                email: localStorage.getItem('user').email,
                jobId: formData.adv,
                post: formData.post,
                department: formData.dept,
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
        console.log('Form Data:', formData);
    };

    return (
        <main className="main-body">
            <Navbar />
            <form className="application-form" onSubmit={handleSubmit}>
                <h2>Final Submission</h2>
                <div className='values'>
                    <label htmlFor="adv">Advertisement no.</label>
                    <input
                        type="text"
                        id="adv"
                        name="adv"
                        value={formData.adv}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='values'>
                    <label htmlFor="dept">Post Applied for</label>
                    <select name="dept" id="dept" value={formData.dept} onChange={handleChange} required>
                        <option value="">Select an Option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="dept">Department</label>
                    <select name="dept" id="dept" value={formData.dept} onChange={handleChange} required>
                        <option value="">Select an Option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </main>
    );
};

export default Apply;
