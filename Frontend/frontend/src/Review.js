import React, { useEffect, useState } from 'react';
import DynamicFormBuilder from './DynamicFormBuilder';
import NavbarSmall from './Components/Navbar-small';

const ReviewPage = ({ isreview }) => {
  const [formConfig, setFormConfig] = useState([])
  const [formState, setFormState] = useState([]);
  const [pages, setPages] = useState(0);

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
        setPages(data.config.length)
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
    } else if (isreview === 'view' || isreview==='edit') {
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
        console.log({ "data": data.data })
        setFormState(data.data);
        setFormConfig(config)
      } catch (error) {
        console.error('Error fetching job openings:', error);
      }
    }
  };
  return (
    <div className={isreview === 'review' ? '' : 'page3'}>
      <NavbarSmall current={pages} />
      <h2>{isreview === 'review' ? 'Review Page' : isreview === 'edit' ? "Edit Page" : "Details Page"}</h2>
      {formConfig.length && <DynamicFormBuilder
        formConfig={formConfig}
        fromItem={formState}
        path={isreview === 'edit' ? 'edit' : 'form'}
        isreview={isreview}  // Pass isreview here
      />}
      {/* You can add a button here to navigate back to the form for editing */}
    </div>
  );
};

export default ReviewPage;
