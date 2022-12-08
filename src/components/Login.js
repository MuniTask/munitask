import { doc, getDoc } from 'firebase/firestore';
import React, { lazy, useState } from 'react';
import {db} from "../firebase";
import { Link, Navigate } from 'react-router-dom';
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
import brand from '../images/munitask-brand.png';

export default function Login({logIn, createPopUp, handleCloseLogin, user}) {
 
 
  return (
    <>
    {/* {firstLogin?  <Navigate to="/userprofile"/>: */}
    <div className="body">
    <div className="login-card ">
      <form
        className=""
        onSubmit={(e) => {
          logIn(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input type="text" className="form-control" name="email" />
        </div>
    
        <div className="mb-3 login-form">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
          />
          <a href="/passwordrecovery" className="login-link1">
            Forgot your password?
          </a>
        </div>
    
        <button type="submit" className="btn btn-primary login-btn ">
          Log In<i className="fa-solid fa-arrow-right-long fa-lg"></i>
        </button>
       
      </form>
      <div style={{width:'75%', borderTop:'solid 1px gainsboro', margin:'auto', marginTop:'20px', marginBottom:'20px'}}></div>
      <div className='d-flex justify-content-center'>
      <img src={googlebtn} alt='...' className='google-btn' onClick={()=>{createPopUp(); handleCloseLogin()}}/>
      </div>
    </div>
    </div>
    {/* } */}
    </>
  )
}
