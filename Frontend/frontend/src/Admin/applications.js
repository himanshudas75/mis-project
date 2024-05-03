import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar';
// Fetch
const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/getAllApply', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch job openings');
            }
            const data = await response.json();
            // var dataArray = data.map((ele)=>{return ele.data})
            setApplications(data); 
        } catch (error) {
            console.error('Error fetching job openings:', error);
        }
    };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === id ? { ...app, status: newStatus } : app
                )
            );
            var email = localStorage.getItem('user')
            fetch('http://127.0.0.1:5000/updatestatus', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    status: newStatus,
                }),
            }).then((response) => {
                // Handle response
                if (response.status === 200) {
                    window.location.reload();
                    console.log(200);
                }
            })
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="main-body">
            <AdminNavbar />
            <div className="activity-center">
                <h2>Admin Dashboard</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th style={{ width: '10rem' }}>Name</th>
                            <th>Application</th>
                            <th style={{ width: '10rem' }}>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.applicationId}>
                                <td>{application.applicationId}</td>
                                <td style={{ width: '10rem' }}>{application.email}</td>
                                <td><a href='#'>{application.application}</a></td>
                                <td style={{ width: '10rem' }}>{application.status}</td>
                                <td>
                                    <select
                                        value={application.status}
                                        onChange={(e) =>
                                            handleChangeStatus(application.id, e.target.value)
                                        }
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Rejected">Rejected</option>
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

export default AdminDashboard;
