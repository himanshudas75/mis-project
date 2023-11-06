import React, {useState} from 'react'
import './LoginSignup.css'


export const LoginSignup = () => {
    const [action,setAction]=useState("SignUp");
  return (
    <div className='container'>
        <div className='header'>
            <div className='text'>{action}</div>
                <div className='underline'></div>
            
            <div className='inputs'>
                {action==="Login"? <div></div>: 
                <div className='input'>
                    <input type="text" placeholder='Name' />
                </div>
                }  
                {action==="Login"? <div></div>: 
                <div className='input'>
                    <input type="text" placeholder='Phone Number' />
                </div>
                }              
                <div className='input'>
                   
                    <input type="email" placeholder='Email id'/>
                </div>
                <div className='input'>
                    <input type="password" placeholder='Password' />
                </div>
            </div>
            {action==="SignUp"? <div></div>: 
            <div className='forgot-password' >Lost Password? <span> click here </span></div>}
            
            <div className='submit-container'>
                <div className={action==="Login"?"submit gray": "submit"} onClick={()=>{setAction("SignUp")}}>Sign Up</div>
                <div className={action==="SignUp" ?"submit gray": "submit"}onClick={()=>{setAction("Login")}}>Login</div>
            </div>
            </div>
            </div>
  )
}
export default LoginSignup