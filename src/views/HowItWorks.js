import React, { useEffect, useState } from 'react'
import {db} from '../firebase';
import { collection, query, where, getDocs, addDoc, limit } from "firebase/firestore";
import JobItem from '../components/JobItem';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';

export default function HowItWorks({signUp, logIn}) {

  const sendSignUpInfo = async (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.confirmPassword.value){
        return
    }
    signUp(e.target.email.value,e.target.password.value)
};

  useEffect(() => {
  
  }, []);

  return (
    <>
    <div className='login-card'>
            <div className="login-header-cont">
            <h5 className="login-header">Signup For </h5>
              <h5 className="brand-label">MuniTask </h5>
            </div>
            <form className='' onSubmit={(e)=>{signUp(e)}}>

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
                <p className="mt-3">
                Already have an account?{" "}
                <Link to='/login' className="login-link2" href="#">
                  Log In
                </Link>
                .
              </p>
            </form>

            </div>

<div className="body">
<div className="login-card ">
  <div className="login-header-cont">
    <h5 className="login-header">Login to </h5>
    <h5 className="brand-label">Dispatched </h5>
  </div>
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
      <a href="#" className="login-link1">
        Forgot your password?
      </a>
    </div>

    <button type="submit" className="btn btn-primary login-btn ">
      Log In<i className="fa-solid fa-arrow-right-long fa-lg"></i>
    </button>
    <p className="mt-3">
      Don't have an account?{" "}
      <Link to='/login' className="login-link2" href="#">
        Sign Up
      </Link>
      
    </p>
  </form>
</div>
</div>
</>
  )
}
