import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { lazy, useEffect, useState } from 'react';
import {db} from "../firebase";
import { Link, Navigate } from 'react-router-dom';
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
import twitterLogo from '../images/twitter-logo.jpeg';
import appleLogo from '../images/Apple_logo_white.svg.png';
import brand from '../images/munitask-brand.png';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, signInWithRedirect, OAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { FacebookLogo, TwitterLogo } from 'phosphor-react';
import {generate} from "randomstring";

export default function Login({logIn, createPopUp, writeUserData, setUser, user}) {
  const [redirect, setRedirect]=useState(false);
 
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
    await updateDoc(userRef, {referral_code:generate({length:12,charset:'alphanumeric'})})
     console.log(false);
     const go_to='/userinfo'
     setGoTo(go_to);
     incrementLogin(user_info);
     setRedirect(true);
    }
     else{
      setRedirect(true);
     }
  }
  };

  // if they want to signin with pop up
  const createFacebookPopup=async()=>{
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
     // do i need to add a disclaimer  aboutt he info we are getting from Fb?
     provider.addScope('email');
     // do i need step 4? https://firebase.google.com/docs/auth/web/facebook-login?hl=en&authuser=4
    const result=await signInWithPopup(auth, provider);
    const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
    if (existingUserDoc.exists()){
      console.log('existing user signed in');
      console.log(existingUserDoc.data())
    } else{
      console.log('new user signed in')
      writeUserData(result.user);
    }
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log('user',user)
    setUser(user);
    incrementLogin(user);
    localStorage.setItem('user', JSON.stringify(user));
    handleFirstLogin(user);
  };

  // ?if they want to be redirected
  const createFacebookRedirect=async()=>{
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
     // do i need to add a disclaimer  aboutt he info we are getting from Fb?
     provider.addScope('email');
     const result=await signInWithRedirect(auth, provider);
     const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
     if (existingUserDoc.exists()){
       console.log('existing user signed in');
       console.log(existingUserDoc.data())
     } else{
       console.log('new user signed in')
       writeUserData(result.user);
     }
     ////////
     const credential = FacebookAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     console.log('user',user)
     setUser(user);
     incrementLogin(user);
     localStorage.setItem('user', JSON.stringify(user));
     handleFirstLogin(user);
  };

  // sign in with apple - popup
  const createApplePopup=async()=>{
    const auth = getAuth();
    const provider = new OAuthProvider();
     // do i need to add a disclaimer  aboutt he info we are getting from Fb?
     provider.addScope('email');
     provider.addScope('name');
     // do i need step 4? https://firebase.google.com/docs/auth/web/facebook-login?hl=en&authuser=4
    const result=await signInWithPopup(auth, provider);
    const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
    if (existingUserDoc.exists()){
      console.log('existing user signed in');
      console.log(existingUserDoc.data())
    } else{
      console.log('new user signed in')
      writeUserData(result.user);
    }
    const credential = OAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log('user',user)
    setUser(user);
    incrementLogin(user);
    localStorage.setItem('user', JSON.stringify(user));
    handleFirstLogin(user);
  };

  // Apple if they want to be redirected
  const createAppleRedirect=async()=>{
    const auth = getAuth();
    const provider = new OAuthProvider();
     // do i need to add a disclaimer  aboutt he info we are getting from Fb?
     provider.addScope('email');
     provider.addScope('name');
     const result=await signInWithRedirect(auth, provider);
     const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
     if (existingUserDoc.exists()){
       console.log('existing user signed in');
       console.log(existingUserDoc.data())
     } else{
       console.log('new user signed in')
       writeUserData(result.user);
     }
     ////////
     const credential = OAuthProvider.credentialFromResult(result);
     const token = credential.accessToken;
     // The signed-in user info.
     const user = result.user;
     console.log('user',user)
     setUser(user);
     incrementLogin(user);
     localStorage.setItem('user', JSON.stringify(user));
     handleFirstLogin(user);
  };

// same for twitter
const createTwitterPopup=async()=>{
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
   // do i need to add a disclaimer  aboutt he info we are getting from Fb?
   provider.addScope('email');
   // do i need step 4? https://firebase.google.com/docs/auth/web/facebook-login?hl=en&authuser=4
  const result=await signInWithPopup(auth, provider);
  const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
  if (existingUserDoc.exists()){
    console.log('existing user signed in');
    console.log(existingUserDoc.data())
  } else{
    console.log('new user signed in')
    writeUserData(result.user);
  }
  const credential = TwitterAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  const user = result.user;
  console.log('user',user)
  setUser(user);
  incrementLogin(user);
  localStorage.setItem('user', JSON.stringify(user));
  handleFirstLogin(user);
};

// ?if they want to be redirected
const createTwitterRedirect=async()=>{
  const auth = getAuth();
  const provider = new TwitterAuthProvider();
   // do i need to add a disclaimer  aboutt he info we are getting from Fb?
   provider.addScope('email');
   const result=await signInWithRedirect(auth, provider);
   const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
   if (existingUserDoc.exists()){
     console.log('existing user signed in');
     console.log(existingUserDoc.data())
   } else{
     console.log('new user signed in')
     writeUserData(result.user);
   }
   ////////
   const credential = TwitterAuthProvider.credentialFromResult(result);
   const token = credential.accessToken;
   // The signed-in user info.
   const user = result.user;
   console.log('user',user)
   setUser(user);
   incrementLogin(user);
   localStorage.setItem('user', JSON.stringify(user));
   handleFirstLogin(user);
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
      {/* <form
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
          <a href="/passwordrecovery" data-testid='forgotPassBtn' className="login-link1">
            Forgot your password?
          </a>
        </div>
    
        <button type="submit" data-testid='LogInSubmit' className="btn btn-dark login-btn ">
          Log In<i className="fa-solid fa-arrow-right-long fa-lg"></i>
        </button>
       
      </form> */}
      <p className='my-4 text-center'><b>OR</b></p>
      <div className='d-flex mx-auto login-btns flex-column flex-wrap justify-content-center'>
      <img src={googlebtn} alt='...' className='google-btn m-3' onClick={()=>{createLoginPopUp()}}/>
      <button className='facebook-signin-btn p-0 m-3 d-flex flex-row align-items-center p-1' onClick={()=>{createFacebookPopup()}}><FacebookLogo size={28} className='me-3 ms-2' weight="fill" color='white'/><div>Sign in with Facebook</div></button>
      <button className='twitter-signin-btn p-0 m-3 d-flex flex-row align-items-center p-1' onClick={()=>{createTwitterPopup()}}> <TwitterLogo size={28} className='me-3 ms-2' weight="fill" color='white'/><div>Sign in with Twitter</div></button>
      
      <button className='apple-signin-btn p-0  m-3 d-flex flex-row align-items-center p-1'><img src={appleLogo} style={{height:'28px', width:'auto'}} className='me-3 ms-2' alt='apple logo'/> <div>Sign in with Apple</div></button>
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
