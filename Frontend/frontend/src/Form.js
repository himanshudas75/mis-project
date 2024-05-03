import {React,useState} from "react";
import DynamicFormBuilder from "./DynamicFormBuilder";
import NavbarSmall from "./Components/Navbar-small";
import ReviewPage from "./Review";

const formConfig = [
  {
    name: "First",
    data: [
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
          { label: "Document", key: "doc", type: "file" },
          { label: "Gender", key: "gender" },
        ],
        initialRows: [
          { name: "gaurav", age: "18", gender: "Male" },
          { name: "Abhipsa", age: "18", gender: "Male" }, // Initial row with empty values
        ],
      },
      ]
  },
  {
    name:'Second',
    data:[
      {
        "id": "sponsoredProjects",
        "type": "table",
        "label": "Details of Sponsored Projects",
        "columns": [
          { "label": "Project Title", "key": "projectTitle" },
          { "label": "Amount in Rs.(Lakh)", "key": "amount", "type": "number" },
          { "label": "Role (PI/CO-PI)", "key": "role" },
          { "label": "No. of CO-PI", "key": "numOfCOPI", "type": "number" },
          { "label": "Funding Agency", "key": "fundingAgency" },
          { "label": "Sanctioned Date", "key": "sanctionedDate", "type": "date" },
          {
            "label": "Status", "key": "status", "type": "select", "options": [{ label: "Pending", value: "male" },
            { label: "Female", value: "female" },
            { label: "Trans", value: "Trans" },]
          }
        ],
        "initialRows": [
          {
            "projectTitle": "",
            "amount": null,
            "role": "",
            "numOfCOPI": null,
            "fundingAgency": "",
            "sanctionedDate": "",
            "status": ""
          }
        ]
      },
      {
        "id": "consultancyProjects",
        "type": "table",
        "label": "Details of Consultancy Projects",
        "columns": [
          { "label": "Project Title", "key": "projectTitle" },
          { "label": "Amount in Rs.(Lakh)", "key": "amount", "type": "number" },
          { "label": "Role (PI/CO-PI)", "key": "role" },
          { "label": "No. of CO-PI", "key": "numOfCOPI", "type": "number" },
          { "label": "Funding Agency", "key": "fundingAgency" },
          { "label": "Sanctioned Date", "key": "sanctionedDate", "type": "date" },
          { "label": "Status", "key": "status", "type": "select", "options": ["Pending", "Approved", "Rejected"] }
        ],
        "initialRows": [
          {
            "projectTitle": "",
            "amount": null,
            "role": "",
            "numOfCOPI": null,
            "fundingAgency": "",
            "sanctionedDate": "",
            "status": ""
          }
        ]
      },
      {
        "id": "outreachPrograms",
        "type": "table",
        "label": "Details of Outreach Program",
        "columns": [
          { "label": "Title", "key": "title" },
          { "label": "External Funding in Rs. (Lakh)", "key": "funding", "type": "number" },
          { "label": "Funding Agency", "key": "fundingAgency" },
          { "label": "Role (CI/CO-CI)", "key": "role" },
          { "label": "Duration", "key": "duration" },
          { "label": "Status", "key": "status", "type": "select", "options": ["Pending", "Approved", "Rejected"] }
        ],
        "initialRows": [
          {
            "title": "",
            "funding": null,
            "fundingAgency": "",
            "role": "",
            "duration": "",
            "status": ""
          }
        ]
      }
    ]
  }
  // Add more form elements as needed
];

const Form = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [submittedData, setSubmittedData] = useState([]); //fetch from tempdb
  const [submitted, setSubmitted] = useState(false)

  const handleNextPage = () => {
    if (currentPage === formConfig.length-1) {
      setSubmitted(true)
    }
    setCurrentPage((prevPage) => (prevPage + 1));
  };

  return (
    <div className="page3">
      {submitted ? (
        <ReviewPage isreview={'review'}/>
      ) : (
        <>
          <NavbarSmall current={currentPage} />
          <h2 style={{ color: '#1C2864', fontWeight: '600', fontSize: 'xx-large' }}>
            {formConfig[currentPage].name}
          </h2>
          <br></br>
          <br></br>
          <DynamicFormBuilder
            formConfig={formConfig[currentPage].data}
            onNextPage={handleNextPage}
            path={'tempstore'}
          />
        </>
      )}
    </div>
  );
};

export default Form;
