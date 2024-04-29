import React, { useState,useEffect } from 'react';
import Navbar from './Components/Navbar';
import './Styles/home.css'

const Dashboard = () => {
  const [activityData,setActivityData] = useState([
    // Replace with your actual data
    { id: 1, post: 'Post 1', department: 'Department 1', advtNo: '12345', status: 'Active' },
    { id: 2, post: 'Post 2', department: 'Department 2', advtNo: '54321', status: 'Inactive' },
    { id: 3, post: 'Post 3', department: 'Department 3', advtNo: '12346', status: 'Active' },
    // ... more data
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([activityData]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/viewStatus', {
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
      setActivityData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = activityData.filter((item) =>
      item.advtNo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <div className="main-body">
      <Navbar />
      <div className="activity-center">
        <h2>Activity Centre</h2>
        <div className="search-bar">
          <p>
            Search by Advertisementno.
          </p>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Advertisement no."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Department</th>
              <th>Advertisement No.</th>
              <th>Current Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.post}</td>
                <td>{item.department}</td>
                <td>{item.advtNo}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;