import React, { useState, useEffect } from "react";

const DynamicFormBuilder = ({ formConfig ,onNextPage, isreview}) => {
  const initialFormData = formConfig.reduce((acc, curr) => {
    if (curr.type !== "table") {
      acc[curr.id] = curr.initialValue || "";
    }
    return acc;
  }, {});

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
  }, [formConfig]);  

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form State:", formState);
    onNextPage()
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
              // readOnly={isreview}
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
            />
          </div>
        );
      case "file":
        return (
          <div key={id} className="values">
            <label htmlFor={id}>{label}</label>
            <>
              <label htmlFor={id} className="upload-label">Upload</label>
              <input
                type="file"
                id={id}
                style={{ display: 'none' }}
                name={id}
                onChange={(e) => handleNormalChange(e, id)}
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
            />
          </div>
        );
      case "table":
        return (
          <div key={id}>
            <h1 style={{color:'#1C2864', fontWeight:'200', fontSize:'x-large'}}>{label}</h1>
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                  <th>Action</th>
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
                            />
                          ) : column.type === "file" ? (
                            <>
                              <label htmlFor={id} className="upload-label">Upload</label>
                              <input
                                type="file"
                                id={id}
                                style={{ display: 'none' }}
                                name={`${id}[${rowIndex}][${column.key}]`}
                                onChange={(e) => handleTableChange(e, id, rowIndex, column.key)}
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
                            />
                          ) : (
                            <input
                              type="text"
                              name={`${id}[${rowIndex}][${column.key}]`}
                              value={row[column.key] || ""}
                              onChange={(e) =>
                                handleTableChange(e, id, rowIndex, column.key)
                              }
                            />
                          )}
                        </td>
                      ))}
                      <td>
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(id, rowIndex)}
                        >
                          <span>+</span>
                        </button>
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
    <form onSubmit={handleSubmit}>
      {formConfig.map((element) => renderFormElement(element))}
      {isreview? <></>: <button type="submit" className='next'>Submit</button>}
    </form>
  );
};

export default DynamicFormBuilder;
