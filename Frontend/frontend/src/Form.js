import React from "react";
import DynamicFormBuilder from "./DynamicFormBuilder";

const formConfig = [
  {
    id: "name",
    type: "text",
    label: "Name",
  },
  {
    id: "DateofBirth",
    type: "date",
    label: "DateofBirth",
  },
  {
    id: "gender",
    type: "select",
    label: "Gender",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Trans", value: "Trans" },
    ],
  },
  {
    id: "interests",
    type: "checkbox",
    label: "Interests",
    options: [
      { label: "Sports", value: "sports" },
      { label: "Music", value: "music" },
      { label: "Reading", value: "reading" },
    ],
  },

  {
    id: "tableData1",
    type: "table",
    label: "Table Data",
    columns: [
      { label: "Name", key: "name" },
      { label: "Age", key: "age", type: "number" },
      {
        label: "Gender",
        key: "gender",
        type: "select",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Trans", value: "Trans" },
        ],
      },
    ],
    initialRows: [
      // { name: "gaurav", age: "18", gender: "Male" },
      // { name: "Abhipsa", age: "18", gender: "Male" }, // Initial row with empty values
    ],
  },
  {
    id: "profile",
    type: "file",
    label: "ProfilePicture",
  },
  {
    id: "tableData",
    type: "table",
    label: "Table Data",
    columns: [
      { label: "Name", key: "name" },
      { label: "Age", key: "age", type: "number" },
      { label: "Gender", key: "gender" },
    ],
    initialRows: [
      { name: "gaurav", age: "18", gender: "Male" },
      { name: "Abhipsa", age: "18", gender: "Male" }, // Initial row with empty values
    ],
  },
  // Add more form elements as needed
];

const Form = () => {
  return (
    <div>
      <h1>Dynamic Form Builder Example</h1>
      <DynamicFormBuilder formConfig={formConfig} />
    </div>
  );
};

export default Form;
