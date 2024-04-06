import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small'

const Page2 = () => {
    const [formData, setFormData] = useState({
        payScaleDate: '',
        Detained: '',
    });
    const [sponsoredProjects, setSponsoredProjects] = useState([
        {
            id: 1,
            projectTitle: '',
            amount: '',
            role: '',
            numOfCOPI: '',
            fundingAgency: '',
            sanctionedDate: '',
            status: ''
        }
    ]);

    const [consultancyProjects, setConsultancyProjects] = useState([
        {
            id: 1,
            projectTitle: '',
            amount: '',
            role: '',
            numOfCOPI: '',
            fundingAgency: '',
            sanctionedDate: '',
            status: ''
        }
    ]);

    const [outreachPrograms, setOutreachPrograms] = useState([
        {
            id: 1,
            title: '',
            funding: '',
            fundingAgency: '',
            role: '',
            duration: '',
            status: ''
        }
    ]);

    const [phdSupervisionCurrent, setPhdSupervisionCurrent] = useState([
        {
            id: 1,
            awarded: {
                soleGuide: '',
                jointGuide: {
                    principalGuide: '',
                    coGuide: ''
                }
            },
            ongoing: {
                soleGuide: '',
                jointGuide: {
                    principalGuide: '',
                    coGuide: ''
                }
            }
        }
    ]);

    const [phdSupervisionCareer, setPhdSupervisionCareer] = useState([
        {
            id: 1,
            awarded: {
                soleGuide: '',
                jointGuide: {
                    principalGuide: '',
                    coGuide: ''
                }
            },
            ongoing: {
                soleGuide: '',
                jointGuide: {
                    principalGuide: '',
                    coGuide: ''
                }
            }

        }
    ]);

    const [intellectualProperties, setIntellectualProperties] = useState([
        {
            id: 1,
            ipType: '',
            ipTitle: '',
            presentStatus: ''
        }
    ]);

    const [innovationDevelopment, setInnovationDevelopment] = useState([
        {
            id: 1,
            name: '',
            presentStatus: ''
        }
    ]);

    const [facultyMobilityPrograms, setFacultyMobilityPrograms] = useState([
        {
            id: 1,
            name: '',
            projectProposal: ''
        }
    ]);

    const [employments, setEmployments] = useState([
        {
            id: 1,
            employer: '',
            position: '',
            dateOfJoining: '',
            dateOfLeaving: '',
            payScale: '',
            basicPay: '',
            totalSalary: ''
        }
    ]);

    const handleAddRow = (type) => {
        let newId;
        let newRow = {};

        // Determine the type of table and generate a new row accordingly
        switch (type) {
            case 'sponsored':
                newId = sponsoredProjects.length + 1;
                newRow = {
                    id: newId,
                    projectTitle: '',
                    amount: '',
                    role: '',
                    numOfCOPI: '',
                    fundingAgency: '',
                    sanctionedDate: '',
                    status: ''
                };
                setSponsoredProjects([...sponsoredProjects, newRow]);
                break;
            case 'consultancy':
                newId = consultancyProjects.length + 1;
                newRow = {
                    id: newId,
                    projectTitle: '',
                    amount: '',
                    role: '',
                    numOfCOPI: '',
                    fundingAgency: '',
                    sanctionedDate: '',
                    status: ''
                };
                setConsultancyProjects([...consultancyProjects, newRow]);
                break;
            case 'outreach':
                newId = outreachPrograms.length + 1;
                newRow = {
                    id: newId,
                    title: '',
                    funding: '',
                    fundingAgency: '',
                    role: '',
                    duration: '',
                    status: ''
                };
                setOutreachPrograms([...outreachPrograms, newRow]);
                break;
            case 'intellectualProperties':
                newId = intellectualProperties.length + 1;
                newRow = {
                    id: newId,
                    ipType: '',
                    ipTitle: '',
                    presentStatus: ''
                };
                setIntellectualProperties([...intellectualProperties, newRow]);
                break;
            case 'innovationDevelopment':
                newId = innovationDevelopment.length + 1;
                newRow = {
                    id: newId,
                    name: '',
                    presentStatus: ''
                };
                setInnovationDevelopment([...innovationDevelopment, newRow]);
                break;
            case 'facultyMobilityPrograms':
                newId = facultyMobilityPrograms.length + 1;
                newRow = {
                    id: newId,
                    name: '',
                    projectProposal: ''
                };
                setFacultyMobilityPrograms([...facultyMobilityPrograms, newRow]);
                break;
            case 'employments':
                newId = employments.length + 1;
                newRow = {
                    id: newId,
                    employer: '',
                    position: '',
                    dateOfJoining: '',
                    dateOfLeaving: '',
                    payScale: '',
                    basicPay: '',
                    totalSalary: ''
                };
                setEmployments([...employments, newRow]);
                break;
            default:
                break;
        }
    };


    const handleInputChange = (id, field, value, type) => {
        let updatedData;
        switch (type) {
            case 'sponsored':
                updatedData = sponsoredProjects.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setSponsoredProjects(updatedData);
                break;
            case 'consultancy':
                updatedData = consultancyProjects.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setConsultancyProjects(updatedData);
                break;
            case 'outreach':
                updatedData = outreachPrograms.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setOutreachPrograms(updatedData);
                break;
            case 'phdCurrent':
                updatedData = phdSupervisionCurrent.map((row) => {
                    const newData = { ...row };
                    if (field === 'awarded.soleGuide') {
                        newData.awarded.soleGuide = value;
                    } else if (field === 'awarded.jointGuide.principalGuide') {
                        newData.awarded.jointGuide.principalGuide = value;
                    } else if (field === 'awarded.jointGuide.coGuide') {
                        newData.awarded.jointGuide.coGuide = value;
                    } else if (field === 'ongoing.soleGuide') {
                        newData.ongoing.soleGuide = value;
                    } else if (field === 'ongoing.jointGuide.principalGuide') {
                        newData.ongoing.jointGuide.principalGuide = value;
                    } else if (field === 'ongoing.jointGuide.coGuide') {
                        newData.ongoing.jointGuide.coGuide = value;
                    }
                    return newData;
                });
                setPhdSupervisionCurrent(updatedData);
                break;
            case 'phdCareer':
                updatedData = phdSupervisionCareer.map((row) => {
                    const newData = { ...row };
                    if (field === 'awarded.soleGuide') {
                        newData.awarded.soleGuide = value;
                    } else if (field === 'awarded.jointGuide.principalGuide') {
                        newData.awarded.jointGuide.principalGuide = value;
                    } else if (field === 'awarded.jointGuide.coGuide') {
                        newData.awarded.jointGuide.coGuide = value;
                    } else if (field === 'ongoing.soleGuide') {
                        newData.ongoing.soleGuide = value;
                    } else if (field === 'ongoing.jointGuide.principalGuide') {
                        newData.ongoing.jointGuide.principalGuide = value;
                    } else if (field === 'ongoing.jointGuide.coGuide') {
                        newData.ongoing.jointGuide.coGuide = value;
                    }
                    return newData;
                });
                setPhdSupervisionCareer(updatedData);
                break;
            case 'intellectualProperties':
                updatedData = intellectualProperties.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setIntellectualProperties(updatedData);
                break;
            case 'innovationDevelopment':
                updatedData = innovationDevelopment.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setInnovationDevelopment(updatedData);
                break;
            case 'facultyMobilityPrograms':
                updatedData = facultyMobilityPrograms.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setFacultyMobilityPrograms(updatedData);
                break;
            case 'employments':
                updatedData = employments.map(row => (row.id === id ? { ...row, [field]: value } : row));
                setEmployments(updatedData);
                break;
            case 'payScaleDate':
                setFormData({...formData, payScaleDate: [value]})
                break;
            case 'detained':
                setFormData({...formData, Detained:[value]})
                break;
            default:
                break;
        }
    };

    const handleRemoveRow = (id, type) => {
        if (id !== 1) {
            let updatedData;
            switch (type) {
                case 'sponsored':
                    updatedData = sponsoredProjects.filter(row => row.id !== id);
                    setSponsoredProjects(updatedData);
                    break;
                case 'consultancy':
                    updatedData = consultancyProjects.filter(row => row.id !== id);
                    setConsultancyProjects(updatedData);
                    break;
                case 'outreach':
                    updatedData = outreachPrograms.filter(row => row.id !== id);
                    setOutreachPrograms(updatedData);
                    break;
                case 'intellectualProperties':
                    updatedData = intellectualProperties.filter(row => row.id !== id);
                    setIntellectualProperties(updatedData);
                    break;
                case 'innovationDevelopment':
                    updatedData = innovationDevelopment.filter(row => row.id !== id);
                    setInnovationDevelopment(updatedData);
                    break;
                case 'facultyMobilityPrograms':
                    updatedData = facultyMobilityPrograms.filter(row => row.id !== id);
                    setFacultyMobilityPrograms(updatedData);
                    break;
                case 'employments':
                    updatedData = employments.filter(row => row.id !== id);
                    setEmployments(updatedData);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Format the table data as needed (e.g., for submission to server)
        const formattedData = {
            'Details of Sponsored Projects': sponsoredProjects,
            'Details of Consultancy Projects': consultancyProjects,
            'Details of Outreach Program': outreachPrograms,
            'Details of Phd supervision (in current positions)': phdSupervisionCurrent,
            'Details of Phd supervision (in entire Career)': phdSupervisionCareer,
            'Details of Intellectual Properties': intellectualProperties,
            'Innovation and Product Development': innovationDevelopment,
            'Faculty Mobility Program': facultyMobilityPrograms,
            'Employment': employments,
            'Pay Scale Date': formData.payScaleDate,
            'Discharged': formData.Detained
        };
        console.log('Formatted Data:', formattedData);
        localStorage.setItem('current', 2);
    };

    return (
        <div className='page2'>
            <NavbarSmall current = {2}/>
            <form onSubmit={handleSubmit}>
                <h2>Details of Sponsored Projects</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Amount in Rs.(Lakh)</th>
                            <th>Role (PI/CO-PI)</th>
                            <th>No. of CO-PI</th>
                            <th>Funding Agency</th>
                            <th>Sanctioned Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sponsoredProjects.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.projectTitle}
                                        onChange={(e) => handleInputChange(row.id, 'projectTitle', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.amount}
                                        onChange={(e) => handleInputChange(row.id, 'amount', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.role}
                                        onChange={(e) => handleInputChange(row.id, 'role', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.numOfCOPI}
                                        onChange={(e) => handleInputChange(row.id, 'numOfCOPI', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.fundingAgency}
                                        onChange={(e) => handleInputChange(row.id, 'fundingAgency', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.sanctionedDate}
                                        onChange={(e) => handleInputChange(row.id, 'sanctionedDate', e.target.value, 'sponsored')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.status}
                                        onChange={(e) => handleInputChange(row.id, 'status', e.target.value, 'sponsored')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'sponsored')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('sponsored')}>+</button><p>Add More</p>
                <br /><br />
                <h2>Details of Consultancy Projects</h2>
                <table>

                    <thead>
                        <tr>
                            <th>Project Title</th>
                            <th>Amount in Rs. (Lakh)</th>
                            <th>Role (PI/CO-PI)</th>
                            <th>No. of CO-PI</th>
                            <th>Funding Agency</th>
                            <th>Sanctioned Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {consultancyProjects.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.projectTitle}
                                        onChange={(e) => handleInputChange(row.id, 'projectTitle', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.amount}
                                        onChange={(e) => handleInputChange(row.id, 'amount', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.role}
                                        onChange={(e) => handleInputChange(row.id, 'role', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.numOfCOPI}
                                        onChange={(e) => handleInputChange(row.id, 'numOfCOPI', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.fundingAgency}
                                        onChange={(e) => handleInputChange(row.id, 'fundingAgency', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.sanctionedDate}
                                        onChange={(e) => handleInputChange(row.id, 'sanctionedDate', e.target.value, 'consultancy')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.status}
                                        onChange={(e) => handleInputChange(row.id, 'status', e.target.value, 'consultancy')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'consultancy')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('consultancy')}>+</button><p>Add More</p>
                <br /><br />
                <h2>Details of Outreach Program</h2>
                <table>

                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>External Funding in Rs. (Lakh)</th>
                            <th>Funding Agency</th>
                            <th>Role (CI/CO-CI)</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {outreachPrograms.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.title}
                                        onChange={(e) => handleInputChange(row.id, 'title', e.target.value, 'outreach')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.funding}
                                        onChange={(e) => handleInputChange(row.id, 'funding', e.target.value, 'outreach')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.fundingAgency}
                                        onChange={(e) => handleInputChange(row.id, 'fundingAgency', e.target.value, 'outreach')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.role}
                                        onChange={(e) => handleInputChange(row.id, 'role', e.target.value, 'outreach')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.duration}
                                        onChange={(e) => handleInputChange(row.id, 'duration', e.target.value, 'outreach')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.status}
                                        onChange={(e) => handleInputChange(row.id, 'status', e.target.value, 'outreach')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'outreach')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('outreach')}>+</button><p>Add More</p>
                <br /><br />

                {/* Additional Tables */}
                {/* Table: Details of Phd supervision(in current positions) */}
                <h2>Details of Phd supervision(in current positions)</h2>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">No. of Phd Supervised/Awarded</th>
                            <th colSpan="3">No.of Phds Supervising as</th>
                        </tr>
                        <tr>
                            <th>Sole Guide</th>
                            <th colSpan="2">Joint Guide</th>
                            <th>Sole Guide</th>
                            <th colSpan="2">Joint Guide</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>Principal Guide</th>
                            <th>Co-Guide</th>
                            <th></th>
                            <th>Principal Guide</th>
                            <th>Co-Guide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phdSupervisionCurrent.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.soleGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.soleGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.jointGuide.principalGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.jointGuide.principalGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.jointGuide.coGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.jointGuide.coGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.soleGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.soleGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.jointGuide.principalGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.jointGuide.principalGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.jointGuide.coGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.jointGuide.coGuide', e.target.value, 'phdCurrent')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <h2>Details of Phd supervision(in entire career)</h2>
                <table>
                    <thead>
                        <tr>
                            <th colSpan="3">No. of Phd Supervised/Awarded</th>
                            <th colSpan="3">No.of Phds Supervising as</th>
                        </tr>
                        <tr>
                            <th>Sole Guide</th>
                            <th colSpan="2">Joint Guide</th>
                            <th>Sole Guide</th>
                            <th colSpan="2">Joint Guide</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>Principal Guide</th>
                            <th>Co-Guide</th>
                            <th></th>
                            <th>Principal Guide</th>
                            <th>Co-Guide</th>
                        </tr>
                    </thead>
                    <tbody>
                        {phdSupervisionCareer.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.soleGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.soleGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.jointGuide.principalGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.jointGuide.principalGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.awarded.jointGuide.coGuide}
                                        onChange={(e) => handleInputChange(row.id, 'awarded.jointGuide.coGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.soleGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.soleGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.jointGuide.principalGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.jointGuide.principalGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.ongoing.jointGuide.coGuide}
                                        onChange={(e) => handleInputChange(row.id, 'ongoing.jointGuide.coGuide', e.target.value, 'phdCareer')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br ></br>

                {/* Table: Details of Intellectual Properties */}
                <h2>Details of Intellectual Properties</h2>
                <table>

                    <thead>
                        <tr>
                            <th>IP Type</th>
                            <th>IP Title</th>
                            <th>Present Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {intellectualProperties.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.ipType}
                                        onChange={(e) => handleInputChange(row.id, 'ipType', e.target.value, 'intellectualProperties')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.ipTitle}
                                        onChange={(e) => handleInputChange(row.id, 'ipTitle', e.target.value, 'intellectualProperties')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.presentStatus}
                                        onChange={(e) => handleInputChange(row.id, 'presentStatus', e.target.value, 'intellectualProperties')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Published">Published</option>
                                        <option value="Granted">Granted</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'intellectualProperties')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('intellectualProperties')}>+</button><p>Add More</p>
                <br /><br />

                {/* Table: Innovation and Product Development */}
                <h2>Innovation and Product Development</h2>
                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Present Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {innovationDevelopment.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) => handleInputChange(row.id, 'name', e.target.value, 'innovationDevelopment')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.presentStatus}
                                        onChange={(e) => handleInputChange(row.id, 'presentStatus', e.target.value, 'innovationDevelopment')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Submitted">Submitted</option>
                                        <option value="Published">Published</option>
                                        <option value="Granted">Granted</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'facultyMobilityPrograms')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('facultyMobilityPrograms')}>+</button><p>Add More</p>
                <br /><br />

                {/* Table: Faculty Mobility Program */}
                <h2>Faculty Mobility Program</h2>
                <table>

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Results to Project Proposal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {facultyMobilityPrograms.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) => handleInputChange(row.id, 'name', e.target.value, 'facultyMobilityPrograms')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.projectProposal}
                                        onChange={(e) => handleInputChange(row.id, 'projectProposal', e.target.value, 'facultyMobilityPrograms')}
                                    >
                                        <option value="">--Select--</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'facultyMobilityPrograms')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('facultyMobilityPrograms')}>+</button><p>Add More</p>
                <br /><br />

                {/* Table: Employment */}
                <h2>Employment</h2>
                <table>

                    <thead>
                        <tr>
                            <th>Employer</th>
                            <th>Position</th>
                            <th>Date of Joining</th>
                            <th>Date of Leaving</th>
                            <th>Pay Scale</th>
                            <th>Basic Pay</th>
                            <th>Total Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employments.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.employer}
                                        onChange={(e) => handleInputChange(row.id, 'employer', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.position}
                                        onChange={(e) => handleInputChange(row.id, 'position', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.dateOfJoining}
                                        onChange={(e) => handleInputChange(row.id, 'dateOfJoining', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.dateOfLeaving}
                                        onChange={(e) => handleInputChange(row.id, 'dateOfLeaving', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.payScale}
                                        onChange={(e) => handleInputChange(row.id, 'payScale', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.basicPay}
                                        onChange={(e) => handleInputChange(row.id, 'basicPay', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.totalSalary}
                                        onChange={(e) => handleInputChange(row.id, 'totalSalary', e.target.value, 'employments')}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'employments')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('employments')}>+</button><p>Add More</p>
                <br /><br />
                <hr></hr>
                <h2>Date of Upgradation/Pay Level 12</h2>
                <div className='values' style={{ padding: '1.1rem 0rem' }}>
                    <label>Select Date</label>
                    <input value={formData.payScaleDate}
                    type='date' style={{ width: '10rem' }} onChange={(e)=>{handleInputChange(0,0,e.target.value,'payScaleDate')}}></input>
                </div>
                <hr></hr>
                <h3 style={{ color: '#1C2864', fontWeight:400, padding: '1.1rem 0rem' }}>Have you ever been Discharged/Suspended during your earlier employment ?</h3>
                <textarea value={formData.Detained} onChange={(e)=>{handleInputChange(0,0,e.target.value,'detained')}}
                style={{ width: '100%', margin:'1.1rem 0', padding: '1.2rem' }} placeholder='If Yes Give Reasons else / N.A'>
                    
                </textarea>
                <button className='next' type="submit"><a href='/details/page3' style={{color:'white', textDecoration:'none'}}>Click to Next</a></button>
            </form>
        </div>
    );
};

export default Page2;
