import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        <li><Link to="/manage-roles">Manage Roles</Link></li>
        <li><Link to="/manage-users">Manage Users</Link></li>
        <li><Link to="/delegate-roles">Delegate Roles</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;
