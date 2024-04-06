// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Register from './Register';
import Apply from './Apply';
import Dashboard from './Dashboard';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';
import Page4 from './page4';
import Page6 from './page6';
import Page5 from './page5';
import Details from './details_';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/details" element={<Details current = {localStorage.getItem('current')} />} />
        <Route path="/details/page1" element={<Page1 />} />
        <Route path="/details/page2" element={<Page2 />} />
        <Route path="/details/page3" element={<Page3 />} />
        <Route path="/details/page4" element={<Page4 />} />
        <Route path="/details/page5" element={<Page5 />} />
        <Route path="/details/page6" element={<Page6 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
