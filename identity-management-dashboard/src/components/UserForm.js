import React, { useState, useEffect } from 'react';

function UserForm({ user = null, fetchUsers }) {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    phone_number: '',
    roles: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Load user data into form when editing
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone_number: user.phone_number || '',
        roles: user.roles.join(', ')
      });
      setIsEditing(true);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditing ? `/users/${formData.username}` : '/users';
    const method = isEditing ? 'PUT' : 'POST';
    const data = {
      ...formData,
      roles: formData.roles.split(',').map(role => role.trim())
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to save the user');
      }

      // Reset form and refresh user list
      setFormData({
        username: '',
        name: '',
        email: '',
        password: '',
        phone_number: '',
        roles: ''
      });
      setIsEditing(false);
      fetchUsers();
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  const handleCancel = () => {
    // Reset form if canceling edit
    setFormData({
      username: '',
      name: '',
      email: '',
      password: '',
      phone_number: '',
      roles: ''
    });
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={isEditing}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required={!isEditing}
        />
      </label>
      <label>
        Phone Number:
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </label>
      <label>
        Roles (comma-separated):
        <input
          type="text"
          name="roles"
          value={formData.roles}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
      {isEditing && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
}

export default UserForm;
