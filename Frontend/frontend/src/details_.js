import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import './Styles/forms.css';

const Details = (current) => {
  const [activePage, setActivePage] = useState(current); // Default to page 1

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="main-body">
      <Navbar />
      <div className="form-fill">
        <h2 style={{fontWeight: '200'}}>Progress</h2>
        <div>
          <button
            type='button'
            className={activePage >= 1 ? 'active' : ''}
            onClick={() => handlePageChange(1)}
          >
            <a href='/details/page1'>o</a>
          </button>
          <p>Personal Informartion</p>
        </div>
        <div>
          <button
            type='button'
            className={activePage >= 2 ? 'active' : ''}
            onClick={() => handlePageChange(2)}
          >
            <a href='/details/page2'>o</a>
          </button>
          <p>Project Work</p>
        </div>
        <div>
          <button
            type='button'
            className={activePage >= 3 ? 'active' : ''}
            onClick={() => handlePageChange(3)}
          >
            <a href='/details/page3'>o</a>
          </button>
          <p>Research and Publication</p>
        </div>
        <div>
          <button
            type='button'
            className={activePage >= 4 ? 'active' : ''}
            onClick={() => handlePageChange(4)}
          >
            <a href='/details/page4'>o</a>
          </button>
          <p>Education and Employment</p>
        </div>
        <div>
          <button
            type='button'
            className={activePage >= 5 ? 'active' : ''}
            onClick={() => handlePageChange(5)}
          >
            <a href='/details/page5'>o</a>
          </button>
          <p>Documents</p>
        </div>
        <div>
          <button
            type='button'
            className={activePage >= 6 ? 'active' : ''}
            onClick={() => handlePageChange(6)}
          >
            <a href='/details/page6'>o</a>
          </button>
          <p>Photo and Signature</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
