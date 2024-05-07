import React, { useState, useEffect } from "react";

const DynamicFormBuilder = ({ formConfig, onNextPage, fromItem, path, isreview }) => {
    const initialFormData = formConfig.reduce((acc, curr) => {
        if (curr.type !== "table") {
            acc[curr.id] = curr.initialValue || "";
        }
        return acc;
    }, {});
    const [formData, setFormData] = useState(initialFormData);

    const handleFileChange = (e, id) => {
        const files = e.target.files;
        // Convert FileList to an array
        const fileList = Array.from(files);
        setFormData((prevData) => ({
            ...prevData,
            [id]: fileList,
        }));
    };
    const initialTableData = formConfig.reduce((acc, curr) => {
        if (curr.type === "table") {
            acc[curr.id] = curr.initialRows || [];
        }
        return acc;
    }, {});

    const [formState, setFormState] = useState({
        formData: initialFormData,
        tableData: initialTableData,
    });

    useEffect(() => {
        if (fromItem) {
            setFormState({
                formData: fromItem.formData,
                tableData: fromItem.tableData
            });
        }
        else {

            const newFormData = formConfig.reduce((acc, curr) => {
                if (curr.type !== "table") {
                    acc[curr.id] = curr.initialValue || "";
                }
                return acc;
            }, {});

            const newTableData = formConfig.reduce((acc, curr) => {
                if (curr.type === "table") {
                    acc[curr.id] = curr.initialRows || [];
                }
                return acc;
            }, {});

            setFormState({
                formData: newFormData,
                tableData: newTableData,
            });
        }
    }, [formConfig]);
    const handleTableFileChange = (e, id, rowIndex, columnKey) => {
        const files = e.target.files;
        // Convert FileList to an array
        const {fileList} = Array.from(files); //Not working for Table
        setFormState((prevState) => ({
            ...prevState,
            tableData: {
                ...prevState.tableData,
                [id]: prevState.tableData[id].map((row, index) => {
                    if (index === rowIndex) {
                        return {
                            ...row,
                            [columnKey]: fileList,
                        };
                    }
                    return row;
                }),
            },
        }));
    };
    const handleTableChange = (e, id, rowIndex, columnKey) => {
        const { value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            tableData: {
                ...prevState.tableData,
                [id]: prevState.tableData[id].map((row, index) => {
                    if (index === rowIndex) {
                        return {
                            ...row,
                            [columnKey]: value,
                        };
                    }
                    return row;
                }),
            },
        }));
    };

    const handleNormalChange = (e, id) => {
        const { value, checked, type } = e.target;

        const newValue = type === "checkbox" ? (checked ? value : "") : value;

        setFormState((prevState) => ({
            ...prevState,
            formData: {
                ...prevState.formData,
                [id]: newValue,
            },
        }));
    };

    const handleSubmit = (e, isreview) => {
        e.preventDefault();
        console.log("Form State:", formState);
        var email = localStorage.getItem('user')
        console.log(email)
        try {
            fetch(`http://127.0.0.1:5000/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    data: formState,
                    config: formConfig
                }),
            }).then((response) => {
                // Handle response
                if (response.status === 200) {
                    console.log(200);
                    console.log(isreview)
                    if (isreview === 'review' || isreview === 'edit') window.location.href = '/home'
                    else onNextPage()
                }
            })
        } catch (error) {
            console.error('Error updating status:', error);
        }
        // Handle form submission here (e.g., send data to server)
    };
    const handleAddRow = (id) => {
        setFormState((prevState) => ({
            ...prevState,
            tableData: {
                ...prevState.tableData,
                [id]: [...(prevState.tableData[id] || []), {}],
            },
        }));
    };

    const handleRemoveRow = (id, rowIndex) => {
        // Check if the number of rows in the table is greater than 1 before removing
        if (formState.tableData[id].length > 1) {
            setFormState((prevState) => ({
                ...prevState,
                tableData: {
                    ...prevState.tableData,
                    [id]: prevState.tableData[id].filter(
                        (_, index) => index !== rowIndex
                    ),
                },
            }));
        }
    };

    const renderFormElement = (element) => {
        const { id, type, label, options, columns, initialRows } = element;

        switch (type) {
            case "text":
                return (
                    <div key={id} className="values">
                        <label htmlFor={id}>{label}</label>
                        <input
                            type="text"
                            value={formState.formData[id]}
                            id={id}
                            name={id}
                            onChange={(e) => handleNormalChange(e, id)}
                            readOnly={isreview === 'view'}
                        />
                    </div>
                );
            case "select":
                return (
                    <div key={id} className="values">
                        <label htmlFor={id}>{label}</label>
                        <select
                            id={id}
                            name={id}
                            value={formState.formData[id]}
                            onChange={(e) => handleNormalChange(e, id)}
                            readOnly={isreview === 'view'}
                        >
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                );
            case "checkbox":
                return (
                    <div key={id} className="values">
                        <label>{label}</label>

                        {options.map((option) => (
                            <div key={option.value}>
                                <input
                                    type="checkbox"
                                    id={option.value}
                                    name={id}
                                    checked={formState.formData[id] === option.value}
                                    onChange={(e) => handleNormalChange(e, id)}
                                    value={option.value} // Pass the value attribute here
                                    data-value={option.value}
                                    readOnly={isreview === 'view'}
                                />
                                <label htmlFor={option.value}>{option.label}</label>
                            </div>
                        ))}
                    </div>
                );
            case "date":
                return (
                    <div key={id} className="values">
                        <label htmlFor={id}>{label}</label>
                        <input
                            type="date"
                            id={id}
                            name={id}
                            value={formState.formData[id]}
                            onChange={(e) => handleNormalChange(e, id)}
                            readOnly={isreview === 'view'}
                        />
                    </div>
                );
            case "file":
                return (
                    <div key={id} className="values">
                        <label htmlFor={id}>{label}</label>
                        <>
                            {formData[id] && formData[id].length > 0 && (
                                <ul>
                                    {formData[id].map((file, index) => (
                                        <li key={index} style={{listStyle: 'none'}}>
                                            {/* Display link to uploaded document */}
                                            <a
                                                href={URL.createObjectURL(file)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {"view"}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <label htmlFor={id} className="upload-label">Upload</label>
                            <input
                                type="file"
                                id={id}
                                style={{ display: 'none' }}
                                name={id}
                                onChange={(e) => handleFileChange(e, id)}
                                multiple
                                readOnly={isreview === 'view'}
                            />

                        </>
                    </div>
                );
            case "number":
                return (
                    <div key={id} className="values">
                        <label htmlFor={id}>{label}</label>
                        <input
                            type="number"
                            id={id}
                            name={id}
                            value={formState.formData[id]}
                            onChange={(e) => handleNormalChange(e, id)}
                            readOnly={isreview === 'view'}
                        />
                    </div>
                );
            case "table":
                return (
                    <div key={id}>
                        <h1 style={{ color: '#1C2864', fontWeight: '200', fontSize: 'x-large' }}>{label}</h1>
                        <table>
                            <thead>
                                <tr>
                                    {columns.map((column) => (
                                        <th key={column.key}>{column.label}</th>
                                    ))}
                                    {isreview !== 'view' && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {(formState.tableData[id] || initialRows || []).map(
                                    (row, rowIndex) => (
                                        <tr key={rowIndex}>
                                            {columns.map((column) => (
                                                <td key={column.key}>
                                                    {column.type === "select" ? (
                                                        <select
                                                            name={`${id}[${rowIndex}][${column.key}]`}
                                                            value={row[column.key] || ""}
                                                            onChange={(e) =>
                                                                handleTableChange(e, id, rowIndex, column.key)
                                                            }
                                                            readOnly={isreview === 'view'}
                                                        >
                                                            {column.options.map((option) => (
                                                                <option key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    ) : column.type === "date" ? (
                                                        <input
                                                            type="date"
                                                            name={`${id}[${rowIndex}][${column.key}]`}
                                                            value={row[column.key] || ""}
                                                            onChange={(e) =>
                                                                handleTableChange(e, id, rowIndex, column.key)
                                                            }
                                                            readOnly={isreview === 'view'}
                                                        />
                                                    ) : column.type === "file" ? (
                                                        <>
                                                            <label htmlFor={`${id}-${rowIndex}-${column.key}`} className={"upload-label"}>Upload</label>
                                                            {formData[id] && formData[id].length > 0 && (
                                                                <ul>
                                                                    {formData[id].map((file, index) => (
                                                                        <li key={index}>
                                                                            {/* Display link to uploaded document */}
                                                                            <a
                                                                                href={URL.createObjectURL(file)}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                {file.name}
                                                                            </a>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                            <input
                                                                type="file"
                                                                id={id}
                                                                style={{ display: 'none' }}
                                                                name={`${id}[${rowIndex}][${column.key}]`}
                                                                onChange={(e) => handleTableChange(e, id,rowIndex, `${id}-${rowIndex}-${column.key}`)}
                                                                multiple
                                                                readOnly={isreview === 'view'}
                                                            />

                                                        </>
                                                    ) : column.type === "number" ? (
                                                        <input
                                                            type="number"
                                                            name={`${id}[${rowIndex}][${column.key}]`}
                                                            value={row[column.key] || ""}
                                                            onChange={(e) =>
                                                                handleTableChange(e, id, rowIndex, column.key)

                                                            }
                                                            readOnly={isreview === 'view'}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            name={`${id}[${rowIndex}][${column.key}]`}
                                                            value={row[column.key] || ""}
                                                            onChange={(e) =>
                                                                handleTableChange(e, id, rowIndex, column.key)
                                                            }
                                                            readOnly={isreview === 'view'}
                                                        />
                                                    )}
                                                </td>
                                            ))}
                                            <td>
                                                {isreview !== 'view' && <button
                                                    type="button"
                                                    onClick={() => handleRemoveRow(id, rowIndex)}
                                                    disabled={isreview === 'view'}
                                                >
                                                    <span>+</span>
                                                </button>}
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                        <button className='add' type="button" onClick={() => handleAddRow(id)}>+</button><p>Add More</p>
                        <br></br>
                        <br></br>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <form onSubmit={(e) => handleSubmit(e, isreview)}>
            {formConfig.map((element) => renderFormElement(element))}
            {isreview === 'view' ? <></> : <button type="submit" className='next'>Submit</button>}
        </form>
    );
};

export default DynamicFormBuilder;
