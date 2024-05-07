// MainBody.js
import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import './Styles/apply.css';
import './Styles/forms.css'

const options = [ 
    { value: 'Applied Geology', label: 'Applied Geology' },
    { value: 'Applied Geophysics', label: 'Applied Geophysics' },
    { value: 'Chemical Engineering', label: 'Chemical Engineering' },
    { value: 'Chemistry and Chemical Biology', label: 'Chemistry and Chemical Biology' },
    { value: 'Civil Engineering', label: 'Civil Engineering' },
    { value: 'Computer Science and Engineering', label: 'Computer Science and Engineering' },
    { value: 'Electrical Engineering', label: 'Electrical Engineering' },
    { value: 'Electronics Engineering', label: 'Electronics Engineering' },
    { value: 'Environmental Science & Engineering', label: 'Environmental Science & Engineering' },
    { value: 'Fuel, Minerals and Metallurgical Engineering', label: 'Fuel, Minerals and Metallurgical Engineering' },
    { value: 'Humanities and Social Sciences', label: 'Humanities and Social Sciences' },
    { value: 'Management Studies and Industrial Engineering', label: 'Management Studies and Industrial Engineering' },
    { value: 'Mathematics and Computing', label: 'Mathematics and Computing' },
    { value: 'Mechanical Engineering', label: 'Mechanical Engineering' },
    { value: 'Mining Engineering', label: 'Mining Engineering' },
    { value: 'Petroleum Engineering', label: 'Petroleum Engineering' },
    { value: 'Physics', label: 'Physics' },
];

const Apply = () => {
    const [formData, setFormData] = useState({
        adv: '',
        post: '',
        dept: '',
        status: 'Pending',
    });
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        fetchJobs()
      }, []);
      const fetchJobs = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_PROXY}jobopeningget`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch job openings');
            }
            const data = await response.json();
            var dataArray = data.map((ele)=>{return ele.data})
            setJobs(dataArray); 
        } catch (error) {
            console.error('Error fetching job openings:', error);
        }
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login form submission here (e.g., send data to server)
        fetch(`${process.env.BACKEND_PROXY}apply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Ensure 'Content-Type' header is set
            },
            body: JSON.stringify({
                email: localStorage.getItem('user'),
                jobId: formData.adv,
                post: formData.post,
                department: formData.dept,
                status: formData.status
            }),
        })
            .then(response => {
                // Handle response
                alert("Application Submitted!")
                window.location.href = '/home'
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
                    <label htmlFor="post">Post Applied for</label>
                    <select name="post" id="post" value={formData.post} onChange={handleChange} required>
                        <option value="">Select an Option</option>
                        {jobs.map((job) => (
                            <option key={job.data} value={job.data}>
                                {job.data}
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
