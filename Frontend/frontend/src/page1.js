import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';

const Page1 = () => {

    const [formData, setFormData] = useState({
        current_address: {},
        permanent_address: {}
    });

    const [showPermanentAddress, setShowPermanentAddress] = useState(false);

    const handleCheckboxChange = (event) => {
        setShowPermanentAddress(event.target.checked);
    };

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login form submission here (e.g., send data to server)
        console.log('Login Form Data:', formData);
        localStorage.setItem('current', 1);
    };

    const handleCurrentAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            current_address: {
                ...formData.current_address,
                [name]: value
            }
        });
    };

    const handlePermanentAddressChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            permanent_address: {
                ...formData.permanent_address,
                [name]: value
            }
        });
    };

    return (
        <div className='containerpage1'>
            <NavbarSmall current = {1}/>
            <form className="page1" onSubmit={handleSubmit}>
                <h2>Personal Information</h2>
                <div className='values'>
                    <label htmlFor="name">Salutation</label>
                    <select
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleChange}
                    >
                        <option value="">---Select Salutation---</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                    </select>
                </div>
                <div className='values'>
                    <label htmlFor="name">Name</label>
                    <div className='collection'>
                        <input
                            type="text"
                            id="name"
                            name="firstname"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            id="middlename"
                            name="middlename"
                            value={formData.middleName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            required
                        />
                    </div>

                </div>

                <div className='values'>
                    <label>Father's Name</label>
                    <input
                        type="text"
                        id="fathersname"
                        name="fathersname"
                        value={formData.fathersname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='values'>
                    <label>Mother's Name</label>
                    <input
                        type="text"
                        id="mothersname"
                        name="mothersname"
                        value={formData.mothersname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='values'>
                    <label>Date of birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='values'>
                    <label htmlFor="gender">Gender</label>
                    <select name="gender" id="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">---Select Gender---</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="marital_status">Marital Status</label>
                    <select name="marital_status" id="marital_status" value={formData.marital_status} onChange={handleChange} required>
                        <option value="">---Select---</option>
                        <option value="Married">Married</option>
                        <option value="UnMarried">UnMarried</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="category">Category</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required>
                        <option value="">---Select Category---</option>
                        <option value="Gen">Gen</option>
                        <option value="OBC">OBC</option>
                        <option value="SC">SC</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="nationality">Nationality</label>
                    <select name="nationality" id="nationality" value={formData.nationality} onChange={handleChange} required>
                        <option value="">---Select Nationality---</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="physically_challenged">Are You Physically Challenged?</label>
                    <select name="physically_challenged" id="physically_challenged" value={formData.physically_challenged} onChange={handleChange} required>
                        <option value="">---Select---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <hr></hr>

                <div className="address-section">
                    <h2>Current Address</h2>
                    <div className='values'>
                        <label htmlFor="current_address_line_1">Address Line 1</label>
                        <input
                            type="text"
                            id="current_address_line_1"
                            name="address_line_1"
                            value={formData.current_address.address_line_1 || ''}
                            onChange={handleCurrentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="current_address_line_2">Address Line 2</label>
                        <input
                            type="text"
                            id="current_address_line_2"
                            name="address_line_2"
                            value={formData.current_address.address_line_2 || ''}
                            onChange={handleCurrentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="current_address_city">City</label>
                        <input
                            type="text"
                            id="current_address_city"
                            name="city"
                            value={formData.current_address.city || ''}
                            onChange={handleCurrentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="current_address_state">State</label>
                        <input
                            type="text"
                            id="current_address_state"
                            name="state"
                            value={formData.current_address.state || ''}
                            onChange={handleCurrentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="current_address_pin">PIN</label>
                        <input
                            type="text"
                            id="current_address_pin"
                            name="pin"
                            value={formData.current_address.pin || ''}
                            onChange={handleCurrentAddressChange}
                            required
                        />
                    </div>
                </div>

                <div className="checkbox-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPermanentAddress}
                            onChange={handleCheckboxChange}
                            style={{ width: '1.2rem' }}
                        /> Permanent Address is Same as Current Address
                    </label>
                </div>


                {!showPermanentAddress && (<div className="address-section">
                    <h2>Permanent Address</h2>
                    <div className='values'>
                        <label htmlFor="permanent_address_line_1">Address Line 1</label>
                        <input
                            type="text"
                            id="permanent_address_line_1"
                            name="address_line_1"
                            value={formData.permanent_address.address_line_1 || ''}
                            onChange={handlePermanentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="permanent_address_line_2">Address Line 2</label>
                        <input
                            type="text"
                            id="permanent_address_line_2"
                            name="address_line_2"
                            value={formData.permanent_address.address_line_2 || ''}
                            onChange={handlePermanentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="permanent_address_city">City</label>
                        <input
                            type="text"
                            id="permanent_address_city"
                            name="city"
                            value={formData.permanent_address.city || ''}
                            onChange={handlePermanentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="permanent_address_state">State</label>
                        <input
                            type="text"
                            id="permanent_address_state"
                            name="state"
                            value={formData.permanent_address.state || ''}
                            onChange={handlePermanentAddressChange}
                            required
                        />
                    </div>

                    <div className='values'>
                        <label htmlFor="permanent_address_pin">PIN</label>
                        <input
                            type="text"
                            id="permanent_address_pin"
                            name="pin"
                            value={formData.permanent_address.pin || ''}
                            onChange={handlePermanentAddressChange}
                            required
                        />
                    </div>
                </div>)
                }

                <hr></hr>

                <div className='values'>
                    <label>Email id</label>
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
                    <label>Alternate Email id</label>
                    <input
                        type="email"
                        id="alt_email"
                        name="alt_email"
                        value={formData.alt_email}
                        onChange={handleChange}
                    />
                </div>

                <div className='values'>
                    <label>Telephone / Mobile</label>
                    <div className='collection'>
                        <input
                            type="text"
                            id="telephone"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <hr></hr>

                <div className='values'>
                    <label htmlFor="id_proof">Type of id Proof</label>
                    <select name="id_proof" id="id_proof" value={formData.id_proof} onChange={handleChange} required>
                        <option value="">---Select Type---</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>

                <div className='values'>
                    <label>Identity Card No.</label>
                    <input
                        type="text"
                        id="id_no"
                        name="id_no"
                        value={formData.id_no}
                        onChange={handleChange}
                    />
                </div>

                <hr></hr>

                <div className='values'>
                    <label htmlFor="post">Post Applying for</label>
                    <select name="post" id="post" value={formData.post} onChange={handleChange} required>
                        <option value="">---Select Post---</option>
                        <option value="Indian">Indian</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="industry">Are You From Industry?</label>
                    <select name="industry" id="industry" value={formData.industry} onChange={handleChange} required>
                        <option value="">---Select---</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className='values'>
                    <label htmlFor="phd_degree">Status of Phd Degree</label>
                    <select name="phd_degree" id="phd_degree" value={formData.phd_degree} onChange={handleChange} required>
                        <option value="">---Select Type---</option>
                        <option value="Ongoing">Ongoing</option>
                        <option value="Complete">Completed</option>
                        <option value="Not_started">Not Started</option>
                    </select>
                </div>

                <button type="submit"><a href='/details/page2' style={{color:'white', textDecoration:'none'}}>Click to Next</a></button>
            </form>
        </div>

    );
};

export default Page1;
