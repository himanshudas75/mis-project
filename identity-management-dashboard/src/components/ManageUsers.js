import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';  // Assume UserForm is a component for adding/modifying users
import './ManageUsers.css'

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include' // if cookies are used for the session
      });
      if (!response.ok) throw new Error('Network response was not ok.');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Error fetching users:', err);
    }
  };

  const deleteUser = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        // credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete user.');
      fetchUsers();  // Re-fetch users after deletion
    } catch (err) {
      setError('Failed to delete user');
      console.error('Error deleting user:', err);
    }
  };

  const filteredUsers = users.filter(user => user.username.includes(filter) || user.name.includes(filter));

  return (
    <div>
      <h1>Manage Users</h1>
      <UserForm fetchUsers={fetchUsers} />
      <input
        type="text"
        placeholder="Filter by username or name"
        value={filter}
        onChange={e => setFilter(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user.username)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageUsers;
