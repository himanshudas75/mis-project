import React, { useState, useEffect } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
//FETCH
const AdminJobOpenings = () => {
    const [jobOpenings, setJobOpenings] = useState([]);

    useEffect(() => {
        fetchJobOpenings();
    }, []);

    const fetchJobOpenings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/jobopeningget', {
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
            setJobOpenings(dataArray); 
        } catch (error) {
            console.error('Error fetching job openings:', error);
        }
    };

    const handleChangeStatus = async (id, newStatus) => {
        try {
            setJobOpenings((prevJobOpenings) =>
                prevJobOpenings.map((job) =>
                    job.id === id ? { ...job, status: newStatus } : job
                )
            );
            fetch('http://127.0.0.1:5000/jobclosing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobId: id
                }),
            }).then((response) => {
                // Handle response
                if (response.status === 200) {
                    window.location.reload();
                    console.log(200);
                }
            })
            .catch((error) => {
                // Handle error
                console.log(error);
            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleAddJob = () => {
        const newJob = { id: '', title: '', status: '', isNew: true };
        setJobOpenings([...jobOpenings, newJob]);
    };

    const handleSaveJob = async (index) => {
        const jobToSave = jobOpenings[index];
        if (jobToSave.isNew) {
            fetch('http://127.0.0.1:5000/jobopeningpost', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure 'Content-Type' header is set
                },
                body: JSON.stringify({
                    jobId: jobToSave.jobId,
                    data: jobToSave.data,
                    jobStatus: 'Open'
                }),
            })
                .then(response => {
                    // Handle response
                    if(response.status===200){
                        window.location.reload();
                    }
                    console.log(response);
                })
                .catch(error => {
                    // Handle error
                    console.log(error);
                });
            console.log('New job saved:', jobToSave);
            // You can make a POST request to save the job data here
        } else {
            // Update the existing job data on the server
            console.log('Job updated:', jobToSave);
            // You can make a PUT request to update the job data here
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
                            <th>JobId</th>
                            <th>Job Title</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jobOpenings.map((job, index) => (
                            <tr key={index}>
                                <td>
                                    {job.isNew ? (
                                        <input
                                            type="text"
                                            value={job.jobId}
                                            onChange={(e) => {
                                                const updatedJobs = [...jobOpenings];
                                                updatedJobs[index].jobId = e.target.value;
                                                setJobOpenings(updatedJobs);
                                            }}
                                        />
                                    ) : (
                                        job.jobId
                                    )}
                                </td>
                                <td>
                                    {job.isNew ? (
                                        <input
                                            type="text"
                                            value={job.data}
                                            onChange={(e) => {
                                                const updatedJobs = [...jobOpenings];
                                                updatedJobs[index].data = e.target.value;
                                                setJobOpenings(updatedJobs);
                                            }}
                                        />
                                    ) : (
                                        job.data
                                    )}
                                </td>
                                <td>{job.isNew ? "Open" : job.jobStatus}</td>
                                <td>
                                    {job.isNew ? (
                                        <button onClick={() => handleSaveJob(index)} style={{marginLeft: '0'}}>Save</button>
                                    ) : (
                                        <select
                                            value={job.status}
                                            onChange={(e) => handleChangeStatus(job.jobId, e.target.value)}
                                        >
                                            <option value="Open">Open</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleAddJob}>Add Job</button>
            </div>
        </div>
    );
};

export default AdminJobOpenings;
