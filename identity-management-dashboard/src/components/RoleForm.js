import React, { useState, useEffect } from 'react';

function RoleForm({ role = null, fetchRoles }) {
  const [roleName, setRoleName] = useState('');
  const [services, setServices] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // If a role is provided, we're in "edit" mode. Set initial form values.
  useEffect(() => {
    if (role) {
      setRoleName(role.roleName);
      setServices(role.services.join(', ')); // Assuming services is an array
      setIsEditing(true);
    }
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const servicesArray = services.split(',').map(service => service.trim());
    const endpoint = isEditing ? `http://127.0.0.1:5000/roles/${roleName}` : 'http://127.0.0.1:5000/roles';
    const method = isEditing ? 'PUT' : 'POST';
    console.log(roleName);
    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role: roleName, services: servicesArray }),
        // credentials: 'include'
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to save the role: ${response.status} - ${errorMessage}`);
      }
  
      setRoleName('');
      setServices('');
      setIsEditing(false);
      fetchRoles();
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };
  

  const handleCancel = () => {
    // Reset form if canceling edit
    setRoleName('');
    setServices('');
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="roleName">Role Name:</label>
        <input
          id="roleName"
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="services">Services (comma-separated):</label>
        <input
          id="services"
          type="text"
          value={services}
          onChange={(e) => setServices(e.target.value)}
          required
        />
      </div>
      <button type="submit">{isEditing ? 'Update Role' : 'Add Role'}</button>
      {isEditing && <button type="button" onClick={handleCancel}>Cancel</button>}
    </form>
  );
}

export default RoleForm;
