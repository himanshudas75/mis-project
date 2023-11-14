import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCookie } from '../utils/helper';
import customFetch from '../utils/axios';
const RegisterProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    employeeId: '',
    dob: '',
    email: '',
    gender: '',
    department: '',
    address: '',
    userType: '',
  });

const usertype=getCookie('auth');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await customFetch.post('http://localhost:5001/register', {
        ...formData, userType:usertype
      });
      console.log(response);
      if (response.status === 200) {
        console.log('User registered successfully');
        console.log(formData);
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  return (

  <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6">Name:
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            </label>
        </div>

        <div className="row d-flex justify-content-center align-items-center my-3">
          <label className="form-group col-md-6">Email Address:
            <input
              type="text"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
        </div>
        
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6">Username:
            <input
              type="text"
              className="form-control"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            </label>
        </div>
        
        <div className="row d-flex justify-content-center align-items-center my-3">
          <label className="form-group col-md-6">EmployeeId:
            <input
              type="text"
              className="form-control"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
          </label>
        </div>
  
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6">Date of Birth:
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </label>
        </div>
        
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6">Gender:
              <input
                type="text"
                className="form-control"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              />
            </label>
        </div>
        
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6">Department:
              <input
                type="text"
                className="form-control"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </label>
        </div>
        
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className='form-group col-md-6'>Address:
              <input
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
        </div>
    
        <div className="row d-flex justify-content-center align-items-center my-3">
            <label className="form-group col-md-6 mr-5">User Type:
              <select name="userType" value={formData.userType} onChange={handleChange} className='form-select'>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </label>
        </div>

        <div className="row d-flex justify-content-center align-items-center">
        <div className="form-group col-md-2">
            <button type="submit" className="btn btn-primary">
              Add user
            </button>
          </div>
        </div>

      </form>
    </div>
  );
};

export default RegisterProfile;