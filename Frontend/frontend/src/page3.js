import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';

const Page3 = () => {
    // Special Awards/Honors
    const [specialAwards, setSpecialAwards] = useState([
        {
            id: 1,
            year: '',
            awardName: '',
            organization: ''
        }
    ]);

    // Member of Professional Bodies
    const [professionalBodies, setProfessionalBodies] = useState([
        {
            id: 1,
            bodyName: '',
            membershipStatus: ''
        }
    ]);

    // Details of Administrative Experiences
    const [administrativeExperiences, setAdministrativeExperiences] = useState([
        {
            id: 1,
            positionName: '',
            durationFrom: '',
            durationTo: '',
            yearsOfExperience: ''
        }
    ]);

    // Research Publications
    const [researchPublications, setResearchPublications] = useState([
        {
            id: 1,
            publication: '',
            indexedIn: '',
            paidPublication: '',
            authorType: ''
        }
    ]);

    // Total Number of Publications in entire career
    const [totalPublications, setTotalPublications] = useState([
        {
            id: 1,
            q1Journals: '',
            q2Journals: '',
            q3Journals: '',
            q4Journals: '',
            totalPublications: ''
        }
    ]);

    // Number of Publications as Sole Guide/Principal Guide in current position
    const [publicationsSoleGuide, setPublicationsSoleGuide] = useState([
        {
            id: 1,
            q1Journals: '',
            q2Journals: ''
        }
    ]);

    // Number of Publications as Co-Guide in current position
    const [publicationsCoGuide, setPublicationsCoGuide] = useState([
        {
            id: 1,
            q1Journals: '',
            q2Journals: ''
        }
    ]);

    // Name and Address of three Referees
    const [referees, setReferees] = useState([
        {
            id: 1,
            name: '',
            position: '',
            address: '',
            email: '',
            phone: ''
        },
        {
            id: 2,
            name: '',
            position: '',
            address: '',
            email: '',
            phone: ''
        },
        {
            id: 3,
            name: '',
            position: '',
            address: '',
            email: '',
            phone: ''
        }
    ]);

    const handleChange = (id, field, value, tableName) => {
        switch (tableName) {
            case 'specialAwards':
                setSpecialAwards((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'professionalBodies':
                setProfessionalBodies((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'administrativeExperiences':
                setAdministrativeExperiences((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'researchPublications':
                setResearchPublications((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'totalPublications':
                setTotalPublications((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'publicationsSoleGuide':
                setPublicationsSoleGuide((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'publicationsCoGuide':
                setPublicationsCoGuide((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            case 'referees':
                setReferees((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, [field]: value } : item
                    )
                );
                break;
            default:
                break;
        }
    };

    const handleAddRow = (tableType) => {
        switch (tableType) {
            case 'specialAwards':
                setSpecialAwards([
                    ...specialAwards,
                    {
                        id: specialAwards.length + 1,
                        year: '',
                        awardName: '',
                        organization: ''
                    }
                ]);
                break;
            case 'professionalBodies':
                setProfessionalBodies([
                    ...professionalBodies,
                    {
                        id: professionalBodies.length + 1,
                        bodyName: '',
                        membershipStatus: ''
                    }
                ]);
                break;
            case 'administrativeExperiences':
                setAdministrativeExperiences([
                    ...administrativeExperiences,
                    {
                        id: administrativeExperiences.length + 1,
                        positionName: '',
                        durationFrom: '',
                        durationTo: '',
                        yearsOfExperience: ''
                    }
                ]);
                break;
            case 'researchPublications':
                setResearchPublications([
                    ...researchPublications,
                    {
                        id: researchPublications.length + 1,
                        publication: '',
                        indexedIn: '',
                        paidPublication: '',
                        authorType: ''
                    }
                ]);
                break;
            default:
                break;
        }
    };

    const handleRemoveRow = (id, tableType) => {
        switch (tableType) {
            case 'specialAwards':
                if (specialAwards.length > 1) {
                    const updatedData = specialAwards.filter((row) => row.id !== id);
                    setSpecialAwards(updatedData);
                }
                break;
            case 'professionalBodies':
                if (professionalBodies.length > 1) {
                    const updatedData = professionalBodies.filter((row) => row.id !== id);
                    setProfessionalBodies(updatedData);
                }
                break;
            case 'administrativeExperiences':
                if (administrativeExperiences.length > 1) {
                    const updatedData = administrativeExperiences.filter((row) => row.id !== id);
                    setAdministrativeExperiences(updatedData);
                }
                break;
            case 'researchPublications':
                if (researchPublications.length > 1) {
                    const updatedData = researchPublications.filter((row) => row.id !== id);
                    setResearchPublications(updatedData);
                }
                break;
            default:
                break;
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Format the table data as needed (e.g., for submission to server)
        const formattedData = {
            'Special Awards/Honors': specialAwards,
            'Member of Professional Bodies': professionalBodies,
            'Details of Administrative Experiences': administrativeExperiences,
            'Research Publications': researchPublications,
            'Total Number of Publications in entire career': totalPublications,
            'Number of Publications as Sole Guide/Principal Guide in current position': publicationsSoleGuide,
            'Number of Publications as Co-Guide in current position': publicationsCoGuide,
            'Name and Address of three Referees': referees
        };
        console.log('Formatted Data:', formattedData);
        localStorage.setItem('current', 3);
    };

    return (
        <div className='page2'>
            <NavbarSmall current={3}/>
            <form onSubmit={handleSubmit}>
                {/* Special Awards/Honors */}
                <h2>Special Awards/Honors</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Name of Award/Honor</th>
                            <th>Name of Organisation</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specialAwards.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.year}
                                        onChange={(e) => handleChange(row.id, 'year', e.target.value, 'specialAwards')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.awardName}
                                        onChange={(e) => handleChange(row.id, 'awardName', e.target.value, 'specialAwards')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.organization}
                                        onChange={(e) => handleChange(row.id, 'organization', e.target.value, 'specialAwards')}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'specialAwards')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('specialAwards')}>+</button><p>Add More</p>
                <br></br>
                <br></br>

                {/* Member of Professional Bodies */}
                <h2>Member of Professional Bodies</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name of Body</th>
                            <th>Status of Membership</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {professionalBodies.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.bodyName}
                                        onChange={(e) => handleChange(row.id, 'bodyName', e.target.value, 'professionalBodies')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.membershipStatus}
                                        onChange={(e) => handleChange(row.id, 'membershipStatus', e.target.value, 'professionalBodies')}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="Annual">Annual</option>
                                        <option value="Lifetime">Lifetime</option>=
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'professionalBodies')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('professionalBodies')}>+</button><p>Add More</p>
                <br></br>
                <br></br>
                {/* Details of Administrative Experiences */}
                <h2>Details of Administrative Experiences</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name of Position</th>
                            <th colSpan={2}>Duration</th>
                            <th>Years of Experience</th>
                            <th>Action</th>
                        </tr>
                        <tr>
                            <th></th>
                            <th>From</th>
                            <th>To</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {administrativeExperiences.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.positionName}
                                        onChange={(e) => handleChange(row.id, 'positionName', e.target.value, 'administrativeExperiences')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.durationFrom}
                                        onChange={(e) => handleChange(row.id, 'durationFrom', e.target.value, 'administrativeExperiences')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="date"
                                        value={row.durationTo}
                                        onChange={(e) => handleChange(row.id, 'durationTo', e.target.value, 'administrativeExperiences')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.yearsOfExperience}
                                        onChange={(e) => handleChange(row.id, 'yearsOfExperience', e.target.value, 'administrativeExperiences')}
                                    />
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'administrativeExperiences')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('administrativeExperiences')}>+</button><p>Add More</p>
                <br></br>
                <br></br>
                {/* Research Publications */}
                <h2>Research Publications</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Publication Details</th>
                            <th>Indexed In</th>
                            <th>Whether Paid Publication</th>
                            <th>Author Type</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {researchPublications.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.publication}
                                        onChange={(e) => handleChange(row.id, 'publication', e.target.value, 'researchPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.indexedIn}
                                        onChange={(e) => handleChange(row.id, 'indexedIn', e.target.value, 'researchPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.paidPublication}
                                        onChange={(e) => handleChange(row.id, 'paidPublication', e.target.value, 'researchPublications')}
                                    />
                                </td>
                                <td>
                                    <select
                                        value={row.authorType}
                                        onChange={(e) => handleChange(row.id, 'authorType', e.target.value, 'professionalBodies')}
                                    >
                                        <option value="">---Select---</option>
                                        <option value="Annual">First Author</option>
                                        <option value="Lifetime">Co-Author</option>=
                                    </select>
                                </td>
                                <td>
                                    <button type="button" onClick={() => handleRemoveRow(row.id, 'researchPublications')}><span>+</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className='add' type="button" onClick={() => handleAddRow('researchPublications')}>+</button><p>Add More</p>
                <br></br>
                <br></br>

                {/* Total Number of Publications in entire career */}
                <h2>Total Number of Publications in entire career</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No. of Publications in Q1 Journals</th>
                            <th>No. of Publications in Q2 Journals</th>
                            <th>No. of Publications in Q3 Journals</th>
                            <th>No. of Publications in Q4 Journals</th>
                            <th>Total number of publications</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {totalPublications.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q1Journals}
                                        onChange={(e) => handleChange(row.id, 'q1Journals', e.target.value, 'totalPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q2Journals}
                                        onChange={(e) => handleChange(row.id, 'q2Journals', e.target.value, 'totalPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q3Journals}
                                        onChange={(e) => handleChange(row.id, 'q3Journals', e.target.value, 'totalPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q4Journals}
                                        onChange={(e) => handleChange(row.id, 'q4Journals', e.target.value, 'totalPublications')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.totalPublications}
                                        onChange={(e) => handleChange(row.id, 'totalPublications', e.target.value, 'totalPublications')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>

                {/* Number of Publications as Sole Guide/Principal Guide in current position */}
                <h2>Number of Publications as Sole Guide/Principal Guide in current position</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No. of Publications in Q1 Journals</th>
                            <th>No. of Publications in Q2 Journals</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {publicationsSoleGuide.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q1Journals}
                                        onChange={(e) => handleChange(row.id, 'q1Journals', e.target.value, 'publicationsSoleGuide')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q2Journals}
                                        onChange={(e) => handleChange(row.id, 'q2Journals', e.target.value, 'publicationsSoleGuide')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>

                {/* Number of Publications as Co-Guide in current position */}
                <h2>Number of Publications as Co-Guide in current position</h2>
                <table>
                    <thead>
                        <tr>
                            <th>No. of Publications in Q1 Journals</th>
                            <th>No. of Publications in Q2 Journals</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {publicationsCoGuide.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q1Journals}
                                        onChange={(e) => handleChange(row.id, 'q1Journals', e.target.value, 'publicationsCoGuide')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        value={row.q2Journals}
                                        onChange={(e) => handleChange(row.id, 'q2Journals', e.target.value, 'publicationsCoGuide')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>

                {/* Name and Address of three Referees */}
                <h2>Name and Address of three Referees</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Position</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {referees.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        value={row.name}
                                        onChange={(e) => handleChange(row.id, 'name', e.target.value, 'referees')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.position}
                                        onChange={(e) => handleChange(row.id, 'position', e.target.value, 'referees')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.address}
                                        onChange={(e) => handleChange(row.id, 'address', e.target.value, 'referees')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="email"
                                        value={row.email}
                                        onChange={(e) => handleChange(row.id, 'email', e.target.value, 'referees')}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={row.phone}
                                        onChange={(e) => handleChange(row.id, 'phone', e.target.value, 'referees')}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <br></br>
                <br></br>

                <button className='next' type="submit"><a href='/details/page4' style={{color:'white', textDecoration:'none'}}>Click to Next</a></button>
            </form>
        </div>
    );
};

export default Page3;
