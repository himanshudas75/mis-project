import React, { useEffect, useState } from 'react';
import DynamicFormBuilder from './DynamicFormBuilder';

const ReviewPage = ({ isreview }) => {
  const [formConfig, setFormConfig] = useState([])
  const [formState, setFormState] = useState([]);

  // useEffect(() => {
  //   fetchData();
  // }, [isreview]); // Trigger fetch data when isreview changes

  useEffect(() => {
    console.log("Form config updated:", formConfig);
    console.log("Form state updated:", formState);
    fetchData()
  }, []);

  const fetchData = async () => {
    if (isreview === 'review') {
      console.log("review page started");
      try {
        console.log("try")
        const email = encodeURIComponent(localStorage.getItem('user'));
        const response = await fetch(`http://127.0.0.1:5000/tempget?email=abcd@efgh`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json'
        },
    });

      if (!response.ok) {
        throw new Error('Failed to fetch job openings');
      }
      const data = await response.json();
      var config = [].concat(...data.config)
      var alldata = data.data.reduce((acc, curr) => {
        const mergedFormData = { ...acc.formData, ...curr.formData };
        const mergedTableData = { ...acc.tableData, ...curr.tableData };
        return { formData: mergedFormData, tableData: mergedTableData };
      }, { formData: {}, tableData: {} });
      setFormState(alldata);
      setFormConfig(config)
    } catch (error) {
      console.error('Error fetching :', error);
    }
  } else if (isreview === 'view') {
    try {
      const response = await fetch('http://127.0.0.1:5000/details?email=abcd@efgh', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch job openings');
      }
      const data = await response.json();
      // var dataArray = data.map((ele) => { return ele.data })
      var config = data.config
      console.log({"data": data.data})
      setFormState(data.data);
      setFormConfig(config)
    } catch (error) {
      console.error('Error fetching job openings:', error);
    }
  }
};
console.log(formState)
console.log(formConfig)
return (
  <div>
    <h2>Review Page</h2>
    {formConfig.length && <DynamicFormBuilder formConfig={formConfig} fromItem={formState} path={isreview === 'edit' ? 'edit' : 'form'} />}
    {/* You can add a button here to navigate back to the form for editing */}
  </div>
);
};

export default ReviewPage;
