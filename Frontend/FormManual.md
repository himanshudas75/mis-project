```markdown
# Form Manual

## DynamicFormBuilder Component

### Description:
The `DynamicFormBuilder` component is designed to create dynamic forms based on the provided configuration. It supports various input types including text, select, checkbox, date, file upload, and tables.

### Props:

- `formConfig`: (Array) An array of objects containing the configuration for form elements.
- `onNextPage`: (Function) A callback function to handle navigation to the next page.
- `fromItem`: (Object) Optional. Initial data to populate the form fields.
- `path`: (String) The path for form submission.
- `isreview`: (String) Indicates the mode of form rendering (e.g., 'view', 'edit', 'review').

### Usage:

```jsx
import React from 'react';
import DynamicFormBuilder from './DynamicFormBuilder';

const FormPage = () => {
    const formConfig = [
        // Define form configuration objects here
    ];

    const handleSubmit = (formData) => {
        // Handle form submission data here
    };

    return (
        <div>
            <h2>Form Page</h2>
            <DynamicFormBuilder
                formConfig={formConfig}
                onNextPage={handleSubmit}
                fromItem={null}
                path="/submit-form"
                isreview="edit"
            />
        </div>
    );
};

export default FormPage;
```

### Configuration Object:

Each configuration object in the `formConfig` array should have the following properties:

- `id`: (String) Unique identifier for the form element.
- `type`: (String) Type of input element (e.g., 'text', 'select', 'checkbox', 'date', 'file', 'number', 'table').
- `label`: (String) Label text for the form element.
- Additional properties based on the input type:
  - For 'select' type: `options` (Array) - An array of objects containing options for the select element.
  - For 'checkbox' type: `options` (Array) - An array of objects containing options for the checkbox group.
  - For 'table' type: `columns` (Array) - An array of objects defining the columns for the table.


Instructions for each form element type:

### Text Input:
- **Type**: text
- **Usage**: Use this type for capturing textual input such as names, emails, etc.
- **Configuration**:
  - `id`: Unique identifier for the input field.
  - `label`: Label text to describe the input field.
- Example Configuration:
  ```jsx
  { 
    id: 'name', 
    type: 'text', 
    label: 'Name' 
  }
  ```

### Select Input:
- **Type**: select
- **Usage**: Use this type for dropdown/select input fields.
- **Configuration**:
  - `id`: Unique identifier for the select field.
  - `label`: Label text to describe the select field.
  - `options`: An array of objects containing options for the select field, each object should have a `value` and `label`.
- Example Configuration:
  ```jsx
  { 
    id: 'gender', 
    type: 'select', 
    label: 'Gender', 
    options: [
        { value: 'male', label: 'Male' }, 
        { value: 'female', label: 'Female' }
    ] 
  }
  ```

### Checkbox Input:
- **Type**: checkbox
- **Usage**: Use this type for checkbox input fields.
- **Configuration**:
  - `id`: Unique identifier for the checkbox group.
  - `label`: Label text to describe the checkbox group.
  - `options`: An array of objects containing options for the checkbox group, each object should have a `value` and `label`.
- Example Configuration:
  ```jsx
  { 
    id: 'terms', 
    type: 'checkbox', 
    label: 'Terms & Conditions', 
    options: [{ 
        value: 'agree', label: 'I agree to the terms' 
    }] 
  }
  ```

### Date Input:
- **Type**: date
- **Usage**: Use this type for capturing date input.
- **Configuration**:
  - `id`: Unique identifier for the date input field.
  - `label`: Label text to describe the date input field.
- Example Configuration:
  ```jsx
  { 
    id: 'dob', 
    type: 'date', 
    label: 'Date of Birth' 
  }
  ```

### File Input:
- **Type**: file
- **Usage**: Use this type for file upload fields.
- **Configuration**:
  - `id`: Unique identifier for the file input field.
  - `label`: Label text to describe the file input field.
- Example Configuration:
  ```jsx
  { 
    id: 'profilePic', 
    type: 'file', 
    label: 'Profile Picture' 
  }
  ```

### Number Input:
- **Type**: number
- **Usage**: Use this type for capturing numerical input.
- **Configuration**:
  - `id`: Unique identifier for the number input field.
  - `label`: Label text to describe the number input field.
- Example Configuration:
  ```jsx
  { 
    id: 'age', 
    type: 'number', 
    label: 'Age' 
  }
  ```

### Table Input:
- **Type**: table
- **Usage**: Use this type for capturing tabular data.
- **Configuration**:
  - `id`: Unique identifier for the table input field.
  - `label`: Label text to describe the table input field.
  - `columns`: An array of objects defining the columns for the table, each object should have a `key` and `label`.
- Example Configuration:
  ```jsx
  { 
    id: 'tableData', 
    type: 'table', 
    label: 'Table Data', 
    columns: [
        { key: 'name', label: 'Name' },
        { key: 'age', label: 'Age' },
        {
            label: "Gender",
            key: "gender",
            type: "select",
            options: [
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "Other" },
            ],
        },
    ] 
  }
  ```

### Example Configuration:

```jsx
const formConfig = [
    { id: 'name', type: 'text', label: 'Name' },
    { id: 'email', type: 'text', label: 'Email' },
    { id: 'gender', type: 'select', label: 'Gender', options: [{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }] },
    { id: 'terms', type: 'checkbox', label: 'Terms & Conditions', options: [{ value: 'agree', label: 'I agree to the terms' }] },
    { id: 'dob', type: 'date', label: 'Date of Birth' },
    { id: 'profilePic', type: 'file', label: 'Profile Picture' },
    { id: 'age', type: 'number', label: 'Age' },
    { id: 'tableData', type: 'table', label: 'Table Data', columns: [{ key: 'name', label: 'Name' }, { key: 'age', label: 'Age' }] },
];
```

### Notes:

- Ensure that the formConfig array is properly defined with appropriate configuration objects.
- The form submission logic should be implemented in the `onNextPage` callback function.
- Use the `fromItem` prop to prepopulate the form with initial data when editing/viewing existing records.
- The `path` prop specifies the endpoint for form submission.
- The `isreview` prop determines the mode of form rendering and can be set to 'edit', 'view', or 'review'.


