import React from 'react'
import { Link } from 'react-router-dom'
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
export default function Signup({signUp, createPopUp, handleCloseSignup, handleShowLogin}) {
  return (
    <div className='login-card'>
            <form className='' onSubmit={(e)=>{signUp(e); handleShowLogin(); handleCloseSignup()}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3 login-form">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>
                </div>
                <button type="submit" className="btn btn-primary login-btn ">Sign Up<i className="fa-solid fa-arrow-right-long fa-lg"></i></button>
              
            </form>
            <div style={{width:'75%', borderTop:'solid 1px gainsboro', margin:'auto', marginTop:'20px', marginBottom:'20px'}}></div>
            <div className='d-flex justify-content-center'>
            <img src={googlebtn} alt='...' className='google-btn' onClick={()=>{createPopUp(); handleCloseSignup()}}/>
            {/* <button className='btn btn-light' onClick={()=>{createPopUp(); handleCloseSignup()}}>Sign in with Google</button> */}
            </div>
            </div>

  )
}
