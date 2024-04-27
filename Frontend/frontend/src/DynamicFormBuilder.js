import React, { useState } from "react";

const DynamicFormBuilder = ({ formConfig }) => {
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
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="text"
              value={formState.formData[id]}
              id={id}
              name={id}
              onChange={(e) => handleNormalChange(e, id)}
            />
          </div>
        );
      case "select":
        return (
          <div key={id}>
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
          <div key={id}>
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
          <div key={id}>
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
          <div key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type="file"
              id={id}
              name={id}
              onChange={(e) => handleNormalChange(e, id)}
            />
          </div>
        );
      case "number":
        return (
          <div key={id}>
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
            <label>{label}</label>
            <table>
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
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
                            <input
                              type="file"
                              name={`${id}[${rowIndex}][${column.key}]`}
                              onChange={(e) =>
                                handleTableChange(e, id, rowIndex, column.key)
                              }
                            />
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
                          Remove
                        </button>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <button type="button" onClick={() => handleAddRow(id)}>
              Add Row
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formConfig.map((element) => renderFormElement(element))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicFormBuilder;
