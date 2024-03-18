// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Register from './Register';
import Apply from './Apply';
import Dashboard from './Dashboard';
import App from './Details';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/home" element={<Dashboard />} />
        <Route path="/details" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
