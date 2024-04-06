import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';

const Page4 = () => {
    const [formData, setFormData] = useState({})

    const [academicRecords, setAcademicRecords] = useState([
        {
            id: 1,
            degreeName: '',
            branch: '',
            college: '',
            collegeType: '',
            university: '',
            year: '',
            percentage: '',
            classDivision: ''
        }
    ]);

    const [phdDetails, setPhdDetails] = useState([
        {
            id: 1,
            institution: '',
            institutionType: '',
            phdThesisTitle: '',
            dateOfEnrollment: '',
            dateOfAward: '',
            cpiCgpaPercentage: '',
            scaleOfCpiCgpa: ''
        }
    ]);

    const handleChange = (id, field, value, tableName) => {
        switch (tableName) {
            case 'academicRecords':
                setAcademicRecords((prev) =>
                    prev.map((record) =>
                        record.id === id ? { ...record, [field]: value } : record
                    )
                );
                break;
            case 'phdDetails':
                setPhdDetails((prev) =>
                    prev.map((detail) =>
                        detail.id === id ? { ...detail, [field]: value } : detail
                    )
                );
                break;
            default:
                break;
        }
    };

    const handleAddRow = (tableName) => {
        switch (tableName) {
            case 'academicRecords':
                setAcademicRecords((prev) => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        degreeName: '',
                        branch: '',
                        college: '',
                        collegeType: '',
                        university: '',
                        year: '',
                        percentage: '',
                        classDivision: ''
                    }
                ]);
                break;
            case 'phdDetails':
                setPhdDetails((prev) => [
                    ...prev,
                    {
                        id: prev.length + 1,
                        institution: '',
                        institutionType: '',
                        phdThesisTitle: '',
                        dateOfEnrollment: '',
                        dateOfAward: '',
                        cpiCgpaPercentage: '',
                        scaleOfCpiCgpa: ''
                    }
                ]);
                break;
            default:
                break;
        }
    };

    const handleRemoveRow = (id, tableName) => {
        switch (tableName) {
            case 'academicRecords':
                if (academicRecords.length > 1) {
                    setAcademicRecords((prev) => prev.filter((record) => record.id !== id));
                }
                break;
            case 'phdDetails':
                if (phdDetails.length > 1) {
                    setPhdDetails((prev) => prev.filter((detail) => detail.id !== id));
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        console.log({
            "present-employment": formData,
            "Academic Record": academicRecords,
            "Phd Details": phdDetails
        });
        localStorage.setItem('current', 4);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="page2">
            <NavbarSmall current={4}/>
            <form onSubmit={handleSubmit}>
                <h2>Present Employment</h2>
                <div className="values">
                    <label htmlFor="designation">Designation</label>
                    <input
                        type="text"
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="organization">Organization</label>
                    <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="dateOfJoining">Date of Joining at the current position</label>
                    <input
                        type="date"
                        id="dateOfJoining"
                        name="dateOfJoining"
                        value={formData.dateOfJoining}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="scaleOfPay">Scale of Pay (Rs.)</label>
                    <input
                        type="text"
                        id="scaleOfPay"
                        name="scaleOfPay"
                        value={formData.scaleOfPay}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="basicPay">Basic Pay (Rs.)</label>
                    <input
                        type="text"
                        id="basicPay"
                        name="basicPay"
                        value={formData.basicPay}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="totalEmoluments">Total Emoluments (Per month) (Rs.)</label>
                    <input
                        type="text"
                        id="totalEmoluments"
                        name="totalEmoluments"
                        value={formData.totalEmoluments}
                        onChange={handleFormChange}
                    />
                </div>
                <hr></hr>
                <div className="values">
                    <label htmlFor="totalYearsOfExperience">Total years of experiences</label>
                    <input
                        type="text"
                        id="totalYearsOfExperience"
                        name="totalYearsOfExperience"
                        value={formData.totalYearsOfExperience}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="areasOfSpecialization">Areas of Specialization</label>
                    <input
                        type="text"
                        id="areasOfSpecialization"
                        name="areasOfSpecialization"
                        value={formData.areasOfSpecialization}
                        onChange={handleFormChange}
                    />
                </div>
                <div className="values">
                    <label htmlFor="currentAreaOfResearch">Current Area of Research</label>
                    <input
                        type="text"
                        id="currentAreaOfResearch"
                        name="currentAreaOfResearch"
                        value={formData.currentAreaOfResearch}
                        onChange={handleFormChange}
                    />
                </div>
                <hr></hr>
                {/* Academic Records Table */}
                <h2>Academic Records</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name of Degree</th>
                            <th>Branch/ Specialization</th>
                            <th>College</th>
                            <th>Type of College</th>
                            <th>University</th>
                            <th>Year</th>
                            <th>Percentage/ Grade</th>
                            <th>Class/ Division</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {academicRecords.map((record) => (
                            <tr key={record.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={record.degreeName}
                                        onChange={(e) =>
                                            handleChange(record.id, 'degreeName', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={record.branch}
                                        onChange={(e) =>
                                            handleChange(record.id, 'branch', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={record.college}
                                        onChange={(e) =>
                                            handleChange(record.id, 'college', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={record.collegeType}
                                        onChange={(e) => handleChange(record.id, 'collegeType', e.target.value, 'professionalBodies')}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="govt">Govt.</option>
                                        <option value="private">Private</option>
                                        <option value="deemed">Deemed</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={record.university}
                                        onChange={(e) =>
                                            handleChange(record.id, 'university', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={record.year}
                                        onChange={(e) =>
                                            handleChange(record.id, 'year', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={record.percentage}
                                        onChange={(e) =>
                                            handleChange(record.id, 'percentage', e.target.value, 'academicRecords')
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={record.classDivision}
                                        onChange={(e) => handleChange(record.id, 'classDivision', e.target.value, 'professionalBodies')}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="1st-Division">1st Division</option>
                                        <option value="2nd-Division">2nd Division</option>
                                        <option value="2nd-Division">3nd Division</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(record.id, 'academicRecords')}>
                                        <span>+</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('academicRecords')}>+</button><p>Add More</p>
                <br></br>
                <br></br>

                {/* Details of Ph.D. Table */}
                <h2>Details of Ph.D.</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Institution/University</th>
                            <th>Type of Institution/University</th>
                            <th>Title of Ph.D Thesis</th>
                            <th>Date of Enrolment in Ph.D.</th>
                            <th>Date of Award of PhD</th>
                            <th>CPI/CGPA Percentage</th>
                            <th>Scale of CPI/CGPA</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phdDetails.map((detail) => (
                            <tr key={detail.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={detail.institution}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'institution', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        value={detail.institutionType}
                                        onChange={(e) => handleChange(detail.id, 'institutionType', e.target.value, 'professionalBodies')}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="govt">Govt.</option>
                                        <option value="private">Private</option>
                                        <option value="deemed">Deemed</option>
                                    </select>
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={detail.phdThesisTitle}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'phdThesisTitle', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={detail.dateOfEnrollment}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'dateOfEnrollment', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={detail.dateOfAward}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'dateOfAward', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={detail.cpiCgpaPercentage}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'cpiCgpaPercentage', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={detail.scaleOfCpiCgpa}
                                        onChange={(e) =>
                                            handleChange(detail.id, 'scaleOfCpiCgpa', e.target.value, 'phdDetails')
                                        }
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(detail.id, 'phdDetails')}>
                                        <span>+</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('phdDetails')}>+</button><p>Add More</p>
                <br></br>
                <br></br>

                <button className='next' type="submit"><a href='/details/page5' style={{color:'white', textDecoration:'none'}}>Click to Next</a></button>
            </form>
        </div>
    );
};

export default Page4;
