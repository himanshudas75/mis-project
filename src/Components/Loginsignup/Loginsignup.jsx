//import React, { useState } from 'react'
import './Loginsignup.css'

//import header_logo from '../Assets/logoheader.png'
import ism_logo from '../Assets/logo1.png'

 const Loginsignup = () => {
      // const [action,setAction]=useState("Sign Up"); 
  return (
   
    <div className='containers'>
      <div className='container1'>
        
        <div className='head1'>

        <img src={ism_logo} alt='ism'/>
          
        </div>
        <div className='head1text'>Management Information System</div>
               
      </div>
    <div  className='container2'>
      <div className="subclass">
      <div className="header">
        <div className="htext">Login</div>
       
      </div>
      <div className="inputs">
       
        <div className="input">
          <input type="text" placeholder='username'/>
        </div>
        <div className="input">
          <input type="password" placeholder='password'/>
        </div>
      </div>
      </div>
     
        <div className="submit">Sign in</div>
      
      <div className="forgot-password"><span>Forgot Password?</span></div>
    </div>
    </div>
  )
}
export default Loginsignup