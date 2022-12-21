import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { lazy, useEffect, useState } from 'react';
import {db} from "../firebase";
import { Link, Navigate } from 'react-router-dom';
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
import brand from '../images/munitask-brand.png';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login({logIn, createPopUp, writeUserData, setUser, user}) {
  const [redirect, setRedirect]=useState(false);
  const handleRedirect=()=>{setRedirect(true)};
  const [goTo, setGoTo]=useState('/');
  const incrementLogin=async(user)=>{
    const userRef=doc(db,'users', user.uid);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const login_num=docSnap.data().user_logins + 1;
      await updateDoc(userRef, {user_logins:login_num})
    } else {
      console.log("No such document in incrementLogin function");
    }
  };

  const handleFirstLogin=async(user_info)=>{
    // if (user_info.uid){
    const userRef=doc(db,'users', user_info.uid);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      console.log('exists')
     if (docSnap.data().user_logins<=1 || !docSnap.data().user_logins){
     console.log(false);
     const go_to='/userprofile'
     setGoTo(go_to);
     incrementLogin(user_info);
     setRedirect(true);
    }
     else{
      setRedirect(true);
     }
  }
  };
  const createLoginPopUp=async()=>{
    const auth=getAuth();
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth, provider);
    const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
    if (existingUserDoc.exists()){
      console.log('existing user signed in');
      console.log(existingUserDoc.data())
    } else{
      console.log('new user signed in')
      writeUserData(result.user);
    }
    ////////
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('user',user)
    setUser(user);
    incrementLogin(user);
    localStorage.setItem('user', JSON.stringify(user));
    handleFirstLogin(user);
  };
  
  useEffect(()=>{
    
  },[])
  
  return (
    <>
 {redirect?  <><Navigate to={goTo}/></>: <>
 
    <div className="body">
    <div className="login-card ">
    <div className="login-header-cont d-flex flex-row align-items-baseline justify-content-center mb-4">
                    <h4 className="login-header me-2">Log in to </h4>
                    <img height={27} loading='lazy' src={brand} alt='munitask brand'/>
        </div>
      <form
        className=""
        onSubmit={(e) => {
          logIn(e);handleFirstLogin(user)
          
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label" >
            Email
          </label>
          <input type="text" className="form-control" name="email"  data-testid='login-email-input'/>
        </div>
    
        <div className="mb-3 login-form">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            data-testid='login-password-input'
          />
          <a href="/passwordrecovery" data-testid='forgot-pass-btn' className="login-link1">
            Forgot your password?
          </a>
        </div>
    
        <button type="submit" className="btn btn-primary login-btn ">
          Log In<i className="fa-solid fa-arrow-right-long fa-lg"></i>
        </button>
       
      </form>
      <p className='my-4 text-center'><b>OR</b></p>
      <div className='d-flex justify-content-center'>
      <img src={googlebtn} alt='...' className='google-btn' onClick={()=>{createLoginPopUp()}}/>
      </div>

      <div className='d-flex flex-row justify-content-center mt-3'>
      <p className='me-2'>Don't have an account?{" "}</p>
        <Link to='/signup'  style={{textDecoration:'underline', color:'#0275d8'}}  >
          Sign Up
        </Link>
      </div>
    </div>
    </div>
    {/* } */}
    </>}
    </>
  )
}
