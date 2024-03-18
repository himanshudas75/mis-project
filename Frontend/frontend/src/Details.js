import React, { useState } from 'react';
import jsonList from './base.json'; // Import the JSON data

// AddressForm component for handling address inputs
const AddressForm = ({ formData, setFormData }) => {
    const [sameAsCurrent, setSameAsCurrent] = useState(true); // State to track if current address is same as permanent

    // Handle checkbox change to toggle between current and permanent address
    const handleCheckboxChange = () => {
        setSameAsCurrent(!sameAsCurrent);
    };

    // Handle input change for both current and permanent address
    const handleInputChange = (event, type) => {
        const { name, value } = event.target;
        if (type === 'current') {
            setFormData({
                ...formData,
                current_address: {
                    ...formData.current_address,
                    [name]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                permanent_address: {
                    ...formData.permanent_address,
                    [name]: value
                }
            });
        }
    };

    // Render the address form fields
    const renderAddressForm = (type) => {
        const addressFields = [
            { label: 'Address Line 1', name: 'address_line_1' },
            { label: 'Address Line 2', name: 'address_line_2' },
            { label: 'City', name: 'city' },
            { label: 'State', name: 'state' },
            { label: 'Pin', name: 'pin' }
        ];

        return (
            <div>
                <h3>{type === 'current' ? 'Current Address' : 'Permanent Address'}</h3>
                {addressFields.map((field, index) => (
                    <div key={index} className='fields'>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            type="text"
                            id={field.name}
                            name={field.name}
                            value={type === 'current' ? formData.current_address[field.name] : formData.permanent_address[field.name]}
                            onChange={(e) => handleInputChange(e, type)}
                        />
                    </div>
                ))}
            </div>
        );
    };

    // Return the AddressForm JSX
    return (
        <div>
            {renderAddressForm('current')}
            <div>
                <input
                    type="checkbox"
                    id="sameAsCurrent"
                    checked={sameAsCurrent}
                    onChange={handleCheckboxChange}
                />
                <label htmlFor="sameAsCurrent">Current address is same as permanent address</label>
            </div>
            {!sameAsCurrent && renderAddressForm('permanent')}
        </div>
    );
};

// DynamicForm component
const DynamicForm = () => {
    // TableRow component for rendering table rows
    const TableRow = ({ partIndex, rowIndex, columnsType, options, required, handleInputChange }) => {
        // Handle change for table input fields
        const handleChange = (event, colIndex) => {
            if (columnsType[colIndex] === 'select') {
                handleInputChange(event.target.value, partIndex, rowIndex, colIndex);
            } else if (columnsType[colIndex] === 'boolean') {
                handleInputChange(event.target.checked, partIndex, rowIndex, colIndex);
            } else {
                handleInputChange(event.target.value, partIndex, rowIndex, colIndex);
            }
        };

        // Return JSX for table row
        return (
            <tr>
                {columnsType.map((type, colIndex) => (
                    <td key={colIndex}>
                        {type === 'text' && (
                            <input
                                type="text"
                                onChange={(e) => handleChange(e, colIndex)}
                                required={required[colIndex]}
                            />
                        )}
                        {type === 'number' && (
                            <input
                                type="number"
                                onChange={(e) => handleChange(e, colIndex)}
                                required={required[colIndex]}
                            />
                        )}
                        {type === 'date' && (
                            <input
                                type="date"
                                onChange={(e) => handleChange(e, colIndex)}
                                required={required[colIndex]}
                            />
                        )}
                        {type === 'boolean' && (
                            <input
                                type="checkbox"
                                onChange={(e) => handleChange(e, colIndex)}
                                required={required[colIndex]}
                            />
                        )}
                        {type === 'select' && (
                            <select onChange={(e) => handleChange(e, colIndex)} required={required[colIndex]}>
                                <option value="">--Select--</option>
                                {options[colIndex].map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        )}
                    </td>
                ))}
            </tr>
        );
    };

    const [tableInputData, setTableInputData] = useState([]); // State for table data

    // SideBySideTables component for rendering tables
    const SideBySideTables = ({ data }) => {
        const [tableData, setTableData] = useState(data.parts.map(part => ({ rows: [...Array(part.rows)].map(() => [...Array(part.columns.length)]) })));
        
        // Handle input change for table cells
        const handleInputChange = (value, partIndex, rowIndex, colIndex) => {
            const updatedTableData = [...tableData];
            updatedTableData[partIndex].rows[rowIndex][colIndex] = value;
            setTableData(updatedTableData);
        };

        // Add a new row to the table
        const handleAddRow = (partIndex) => {
            const updatedTableData = [...tableData];
            updatedTableData[partIndex].rows.push([...Array(updatedTableData[partIndex].rows[0].length)]);
            setTableData(updatedTableData);
        };

        // Handle form submission
        const handleSubmit = () => {
            const formattedData = tableData.map((partData, partIndex) => {
                return partData.rows.map(row => {
                    const formattedRow = {};
                    row.forEach((cell, cellIndex) => {
                        formattedRow[data.parts[partIndex].columns[cellIndex]] = cell;
                    });
                    return formattedRow;
                });
            });
            setTableInputData(formattedData);
            console.log('Formatted Data:', tableInputData);
        };

        // Return JSX for SideBySideTables component
        return (
            <div>
                {tableData.map((part, partIndex) => (
                    <div key={partIndex}>
                        <h3>Part {partIndex + 1}</h3>
                        <table>
                            <thead>
                                <tr>
                                    {data.parts[partIndex].columns.map((column, colIndex) => (
                                        <th key={colIndex}>{column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {part.rows.map((row, rowIndex) => (
                                    <TableRow
                                        key={rowIndex}
                                        partIndex={partIndex}
                                        rowIndex={rowIndex}
                                        columnsType={data.parts[partIndex].columnsType}
                                        options={data.parts[partIndex].options}
                                        required={data.parts[partIndex].required}
                                        handleInputChange={handleInputChange}
                                    />
                                ))}
                            </tbody>
                        </table>
                        <button onClick={() => handleAddRow(partIndex)}>Add Row</button>
                    </div>
                ))}
                <button onClick={handleSubmit}>Submit</button>
                <h3>Form Data</h3>
                <pre>{JSON.stringify(tableInputData, null, 2)}</pre>
            </div>
        );
    };

    var page_no = 0;
    const [formData, setFormData] = useState({}); // State for form data
    const [fields, setfield] = useState(jsonList[page_no].page); // State for current form fields
    const [address, setaddress] = useState({
        current_address: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            pin: ''
        },
        permanent_address: {
            address_line_1: '',
            address_line_2: '',
            city: '',
            state: '',
            pin: ''
        }
    }); // State for address form fields

    // Handle form field input change
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        page_no += 1;
        setfield(jsonList[page_no].page);
        var data = { [`page${page_no}`]: {...formData, "table": tableInputData.flat(), "address": {
            "current_address": address.current_address,
            "permanent_address": address.permanent_address
        } } };
        console.log('Form Data:', data);
    };

    // Helper function to generate multiple input fields
    const multiple = (num, type, name, required) => {
        const fields = [];
        for (let i = 0; i < num; i++) {
            const fieldName = `${name}_${i}`; // Create unique names with numbering
            fields.push(
                <input
                    key={fieldName}
                    type={type}
                    id={fieldName}
                    name={fieldName}
                    value={formData[fieldName] || ''} // Provide default value or use formData[fieldName] if available
                    onChange={handleChange}
                    required={required[i]}
                />
            );
        }
        return <div>{fields}</div>; // Wrap the generated fields in a div
    };

    // Render form field based on field type
    const renderField = (field) => {
        switch (field.type) {
            case 'text':
                return (
                    multiple(field.count, field.type, field.name, field.required)
                );
            case 'select':
                return (
                    <select
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required || false}
                    >
                        <option value="">--Select--</option>
                        {field.options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );
            case 'date':
                return (
                    <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        value={formData[field.name] || ''}
                        onChange={handleChange}
                        required={field.required || false}
                    />
                );
            case 'table':
                return (<SideBySideTables data={field} />);

            case 'address':
                return(<AddressForm formData={address} setFormData={setaddress} />);
            // Add more cases for other field types (textarea, etc.)
            default:
                return null;
        }
    };

    // Return JSX for DynamicForm component
    return (
        <form onSubmit={handleSubmit}>
            {fields.map((field) => (
                <div key={field.name} className='fields'>
                    <label htmlFor={field.name}>{field.label}</label>
                    {renderField(field)}
                </div>
            ))}
            <button type="submit" id='submit-button'>Click to Next</button>
        </form>
    );
};

export default DynamicForm;
