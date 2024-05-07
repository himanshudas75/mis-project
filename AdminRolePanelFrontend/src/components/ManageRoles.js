import React, { useState, useEffect } from 'react';
import RoleForm from './RoleForm'; // Assume RoleForm is a component for adding/modifying roles

function ManageRoles() {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/roles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Necessary for cookies to be sent with requests
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      setRoles(data);
    } catch (err) {
      setError('Failed to fetch roles');
      console.error('Error fetching roles:', err);
    }
  };

  const deleteRole = async (roleName) => {
    try {
      const response = await fetch(`/roles/${roleName}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' // Necessary for cookies to be sent with requests
      });
      if (!response.ok) throw new Error('Failed to delete role.');
      fetchRoles(); // Re-fetch roles after deletion
    } catch (err) {
      setError('Failed to delete role');
      console.error('Error deleting role:', err);
    }
  };

  return (
    <div>
      <h1>Manage Roles</h1>
      <RoleForm fetchRoles={fetchRoles} />
      {error && <p className="error">{error}</p>}
      <ul>
        {roles.map((role, index) => (
          <li key={index}>
            {role.role} - Services: {role.services.join(', ')}
            <button onClick={() => deleteRole(role.role)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageRoles;
