import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import AdminNavbar from '../Components/AdminNavbar';
// Fetch
const AdminDashboard = () => {
    const [applications, setApplications] = useState([
        { id: 1, name: 'Abcd', application: 'view', status: 'submitted' },
        { id: 2, name: 'Efgh', application: 'view', status: 'submitted' },
        { id: 3, name: 'Ijkl', application: 'view', status: 'submitted' },
    ]);

    // Fetch applications from API
    //   useEffect(() => {
    //     fetchApplications();
    //   }, []);

    //   const fetchApplications = async () => {
    //     try {
    //       const response = await axios.get('API_ENDPOINT'); // Replace 'API_ENDPOINT' with your actual API endpoint
    //       setApplications(response.data.applications);
    //     } catch (error) {
    //       console.error('Error fetching applications:', error);
    //     }
    //   };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            // await axios.put(`API_ENDPOINT/${id}`, { status: newStatus }); // Replace 'API_ENDPOINT' with your actual API endpoint
            // Update the status in the local state
            setApplications((prevApplications) =>
                prevApplications.map((app) =>
                    app.id === id ? { ...app, status: newStatus } : app
                )
            );
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
                            <th style={{width: '10rem'}}>Name</th>
                            <th>Application</th>
                            <th style={{width: '10rem'}}>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.id}>
                                <td>{application.id}</td>
                                <td style={{width: '10rem'}}>{application.name}</td>
                                <td><a href='#'>{application.application}</a></td>
                                <td style={{width: '10rem'}}>{application.status}</td>
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
