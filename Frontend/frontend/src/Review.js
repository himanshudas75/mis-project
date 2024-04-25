import React, { useState } from 'react';
import NavbarSmall from './Components/Navbar-small';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page5 from './page5';
import Page6 from './page6';
// Import other page components

const Form = () => {
  const [formData, setFormData] = useState({
    // Initialize state to store data from each page
    page1: {current_address: {},
    permanent_address: {},
firstName: 'Abhipsa'},
    page2: {},
    page3: {},
    page4: {},
    page5: {},
    page6: {}
    // Add more keys for other pages
  });

  const handlePage1Submit = (data) => {
    setFormData({ ...formData, page1: data });
  };

  const handlePage2Submit = (data) => {
    setFormData({ ...formData, page2: data });
  };

  const handlePage3Submit = (data) => {
    setFormData({ ...formData, page3: data });
  };

  const handlePage4Submit = (data) => {
    setFormData({ ...formData, page4: data });
  };

  const handlePage5Submit = (data) => {
    setFormData({ ...formData, page5: data });
  };

  const handlePage6Submit = (data) => {
    setFormData({ ...formData, page6: data });
  };
  // Define similar functions for other pages

  return (
    <div>
      {/* Render each page component with respective submit handlers */}
      <Page1 onSubmit={handlePage1Submit} formData={formData.page1}/>
      <Page2 onSubmit={handlePage2Submit} />
      <Page3 onSubmit={handlePage3Submit} />
      <Page4 onSubmit={handlePage4Submit} />
      <Page5 onSubmit={handlePage5Submit} />
      <Page6 onSubmit={handlePage6Submit} />
      {/* Render other page components */}

      {/* Review page */}
      <div className="page3">
      {/* <pre>{JSON.stringify(formData, null, 2)}</pre> */}
        {/* <ReviewPage formData={formData} /> */}
      </div>
    </div>
  );
};

export default Form;
