import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar';
//FETCH
const AdminJobOpenings = () => {
    const [jobOpenings, setJobOpenings] = useState([
        {id: 1, title: 'abcd', status: 'Open'}
    ]);

    // Fetch job openings from API
    // useEffect(() => {
    //     fetchJobOpenings();
    // }, []);

    // const fetchJobOpenings = async () => {
    //     try {
    //         const response = await axios.get('API_ENDPOINT/jobOpenings'); // Replace 'API_ENDPOINT' with your actual API endpoint
    //         setJobOpenings(response.data.jobOpenings);
    //     } catch (error) {
    //         console.error('Error fetching job openings:', error);
    //     }
    // };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            // await axios.put(`API_ENDPOINT/jobOpenings/${id}`, { status: newStatus }); // Replace 'API_ENDPOINT' with your actual API endpoint
            // Update the status in the local state
            setJobOpenings((prevJobOpenings) =>
                prevJobOpenings.map((job) =>
                    job.id === id ? { ...job, status: newStatus } : job
                )
            );
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className='main-body'>
            <AdminNavbar />
            <div className='activity-center'>
                <h2>Job Openings</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobOpenings.map((job) => (
                            <tr key={job.id}>
                                <td>{job.title}</td>
                                <td>{job.status}</td>
                                <td>
                                    <select
                                        value={job.status}
                                        onChange={(e) =>
                                            handleChangeStatus(job.id, e.target.value)
                                        }
                                    >
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminJobOpenings;
