import React, { useState, useEffect } from 'react';

function DelegateRoleForm({ username, initialRoles, onSave }) {
  const [roles, setRoles] = useState('');
  const [editing, setEditing] = useState(false);

  // Load initial roles into the input when the component mounts or when initialRoles change
  useEffect(() => {
    setRoles(initialRoles.join(', '));
  }, [initialRoles]);

  const handleRolesChange = (event) => {
    setRoles(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedRoles = roles.split(',').map(role => role.trim());
    
    try {
      const response = await fetch(`http://127.0.0.1:5000/users/${username}/delegated_roles`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ delegated_roles: updatedRoles }),
        // credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to update delegated roles');
      }

      onSave();  // Call the onSave callback to refresh user data
      setEditing(false);  // Exit editing mode
    } catch (error) {
      console.error('Error updating delegated roles:', error);
      alert('Failed to update delegated roles');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {editing ? (
        <>
          <input
            type="text"
            value={roles}
            onChange={handleRolesChange}
            onBlur={() => setEditing(false)}
          />
          <button type="submit">Save</button>
        </>
      ) : (
        <div onClick={() => setEditing(true)}>{roles || 'Assign Roles'}</div>
      )}
    </form>
  );
}

export default DelegateRoleForm;
