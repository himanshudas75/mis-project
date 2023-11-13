import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ViewProfile from './pages/ViewProfile';
import ErrorPage from './pages/ErrorPage'
import RequestEdits from './pages/RequestEdits'
import ProtectedRoutes from './components/ProtectedRoute';
import RegisterProfile from './pages/RegisterProfile';
import { formatResponse, getCookie, setCookie } from './utils/helper';
import customFetch from './utils/axios';
import { useEffect } from 'react';
const base_url=process.env.REACT_APP_SERVER_URL;


export default function App() {

  setCookie('username','20je0550',10);
  setCookie('auth','admin',10);
  const username=getCookie('username');
  const [profileData,setProfileData]=useState({});

  useEffect(()=>{
    
    async function fetchData(){
      if(Object.keys(profileData).length===0){
      const res=await customFetch.post(base_url,{
        username
      });
      formatResponse(res)
      setProfileData(res.data.user); 
    }
     return profileData;  
      
    }
    fetchData();   
  },[username]);

  return (
  
   <BrowserRouter>
    <Routes>
      <Route exact path ="/error" element={<ErrorPage/>}/>
      <Route exact path ="/edit" element={<RequestEdits/>}/>
      <Route exact path="/" element={
        <ProtectedRoutes access={"view"}>
          <ViewProfile key={1} profileData={profileData}/>
        </ProtectedRoutes>     
      }/>
      <Route exact path="/register" element={
        <ProtectedRoutes access={"register"}>
          <RegisterProfile/>
        </ProtectedRoutes>     
      }/>
    </Routes>
   </BrowserRouter>
  );
}