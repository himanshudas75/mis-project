import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Dashboard from './components/Dashboard';
import ManageUsers from './components/ManageUsers';
import ManageRoles from './components/ManageRoles';
import DelegateRoles from './components/DelegateRoles';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/manage-roles" element={<ManageRoles />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/delegate-roles" element={<DelegateRoles />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
