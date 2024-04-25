// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    salutation: '',
    name: '',
    gender: '',
    contactNo: '',
    email: '',
    password: '',
    retypePassword: '',
    captcha: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <div className='values'>
        <label htmlFor="name">Salutation *</label>
        <select
          name="salutation"
          value={formData.salutation}
          onChange={handleChange}
        >
          <option value="">Select Salutation</option>
          <option value="Mr.">Mr.</option>
          <option value="Ms.">Ms.</option>
          <option value="Mrs.">Mrs.</option>
          <option value="Dr.">Dr.</option>
        </select>
      </div>
      <div className='values'>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className='values'>
        <label htmlFor="gender">Gender *</label>
        <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className='values'>
        <label htmlFor="contactNo">Contact No. *</label>
        <input
          type="tel"
          id="contactNo"
          name="contactNo"
          value={formData.contactNo}
          onChange={handleChange}
          required
        />
      </div>
      <div className='values'>
        <label htmlFor="email">Email id *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className='values'>
        <label htmlFor="password">Password *</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className='values'>
        <label htmlFor="retypePassword">Retype Password *</label>
        <input
          type="password"
          id="retypePassword"
          name="retypePassword"
          value={formData.retypePassword}
          onChange={handleChange}
          required
        />
      </div>
      <div className='values'>
      <label htmlFor="captcha">Captcha *</label>
        <input type="text" id="captcha" name="captcha" required />
      </div>
      <button type="submit" src='src/Login.js'>Register</button>
    </form>
  );
};

export default RegistrationForm;