import React, { useState, useEffect } from 'react';
import DelegateRoleForm from './DelegateRoleForm';  // Import the DelegateRoleForm component

function DelegateRoles() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsersWithDelegatedRoles();
  }, []);

  const fetchUsersWithDelegatedRoles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users');
    }
  };

  const refreshUsers = () => {
    fetchUsersWithDelegatedRoles();  // Refresh user data after update in DelegateRoleForm
  };

  return (
    <div>
      <h1>Delegate Roles</h1>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Delegated Roles</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>
                <DelegateRoleForm
                  username={user.username}
                  initialRoles={user.delegated_roles}
                  onSave={refreshUsers}
                />
              </td>
              <td>
                {/* Additional actions can be added here if needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DelegateRoles;
