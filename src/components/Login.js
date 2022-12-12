import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { lazy, useEffect, useState } from 'react';
import {db} from "../firebase";
import { Link, Navigate } from 'react-router-dom';
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
import brand from '../images/munitask-brand.png';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login({logIn, createPopUp, handleCloseLogin, setUser}) {
  const [redirect, setRedirect]=useState(false);
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
     if (docSnap.data().user_logins<=1 || !docSnap.data().user_logins){
     console.log(false);
     setRedirect(true);
     incrementLogin(user_info)
    }
     
    // } else {
    //   console.log("No such document in incrementLogin function");
    // }
  }
  };
  const logInWithEmail= async(e)=>{
    e.preventDefault();
    const auth = getAuth();
    const email= e.target.email.value
    const password= e.target.password.value
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    incrementLogin(user);
    setUser(user)
    console.log(user)
    handleFirstLogin(user);
    
    // ...
  })
  .catch((error) => {
    console.log('user does not exist')
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('user does not exist', errorCode, errorMessage)

  });
  };
  // const incrementLogin=async(user)=>{
  //   const userRef=doc(db,'users', user.uid);
  //   const docSnap = await getDoc(userRef);
  //   if (docSnap.exists()) {
  //     const login_num=docSnap.data().user_logins + 1;
  //     await updateDoc(userRef, {user_logins:login_num})
  //   } else {
  //     console.log("No such document in incrementLogin function");
  //   }
  // };
  // const handleFirstLogin=async()=>{
  //   if (user.uid){
  //   const userRef=doc(db,'users', user.uid);
  //   const docSnap = await getDoc(userRef);
  //   if (docSnap.exists()) {
  //    if (docSnap.data().user_logins<=1 || docSnap.data().user_logins===undefined){
  //    console.log(false);
  //    incrementLogin(user)
  //    setFirstLogin(true)
  //    return (<Navigate to="/userprofile"/>)
  //   }
     
  //   } else {
  //     console.log("No such document in incrementLogin function");
  //   }}
  // };

  // useEffect(() => {
   
  //   handleFirstLogin()
  // }, [firstLogin]);
  return (
    <>
 {redirect?  <><Navigate to="/userprofile"/></>: <>
    <div className="body">
    <div className="login-card ">
    <div className="login-header-cont d-flex flex-row align-items-baseline justify-content-center mb-4">
                    <h4 className="login-header me-2">Log in to </h4>
                    <img height={27} loading='lazy' src={brand} alt='munitask brand'/>
        </div>
      <form
        className=""
        onSubmit={(e) => {
          logInWithEmail(e);
          
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
      <p className='my-4 text-center'><b>OR</b></p>
      <div className='d-flex justify-content-center'>
      <img src={googlebtn} alt='...' className='google-btn' onClick={()=>{createPopUp()}}/>
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
