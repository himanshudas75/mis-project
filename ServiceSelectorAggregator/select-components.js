import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SelectPage = () => {
  const [dashboardType, setDashboardType] = useState('');

  useEffect(() => {
    // Load user's dashboard type
    axios.get('/select')
      .then(response => {
        const { data } = response;
        // Redirect based on dashboard type
        if (data === 'admin') {
          setDashboardType('admin');
        } else if (data === 'student') {
          setDashboardType('student');
        } else if (data === 'staff') {
          setDashboardType('staff');
        } else {
          // Handle other cases
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error fetching dashboard type:', error);
      });
  }, []);

  const renderDashboard = () => {
    if (dashboardType === 'admin') {
      return <AdminDashboard />;
    } else if (dashboardType === 'student') {
      return <StudentDashboard />;
    } else if (dashboardType === 'staff') {
      return <StaffDashboard />;
    } else {
      // Handle other cases or loading state
      return <div>Loading...</div>;
    }
  };

  return (
    <div>
      <h1>Select Dashboard</h1>
      {/* Render selected dashboard */}
      {renderDashboard()}
    </div>
  );
};

export default SelectPage;
