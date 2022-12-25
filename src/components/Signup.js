import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {db} from "../firebase";
import brand from '../images/munitask-brand.png';
import googlebtn from '../images/btn_google_signin_light_pressed_web@2x.png';
import { validEmail, validPassword } from '../Regex.js';
import { Fragment } from 'react';
export default function Signup({signUp, createPopUp,setUser}) {
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
  "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
  "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
  const [emailErr, setEmailErr] = useState(false);
   const [pwdError, setPwdError] = useState(false);
    const [redirect, setRedirect]=useState(false);
    const age_array=Array.from({length: 85}, (x, i) => i);
  
    const signUpWithEmail=(e)=>{
        e.preventDefault();
        const email= e.target.email.value;
        const password= e.target.password.value;
        if (validPassword.test(password) && validEmail.test(email)) {
          console.log('valid')
        const username=e.target.username.value
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed in 
        const userCred = userCredential;
        console.log('new user signed in')
        updateProfile(auth.currentUser,{displayName:username}).then(() => {
          console.log('Profile updated!')
        }).catch((error) => {
          console.log('error updating user')
        });
        console.log('updated displayname',auth.currentUser)
        writeUserData(auth.currentUser);
        setRedirect(true)
        // setUser(userCred.user)
      })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      })}else if(!validPassword.test(password)){
        setPwdError(true)
      }else if(!validEmail.test(email)){
        setEmailErr(true)
      }else if(!validEmail.test(email) && !validPassword.test(password)){
        setEmailErr(true)
        setPwdError(true)
      };
      }
      const writeUserData = async(result)=> {
        console.log('result displayname',result.displayName)
        await setDoc(doc(db, `users`, `${result.uid}`), {
          uid:result.uid,
          name:result.displayName,
          email: result.email,
          saved_jobs:[],
          user_logins:0,
        
        }, {merge:true});
      };
 
  return (<>
    {redirect? <><Navigate to='/login'/></>:<>
    <div className='login-card'>
         <div className="login-header-cont d-flex flex-row align-items-baseline justify-content-center mb-4">
                    <h4 className="login-header me-2">Sign up to </h4>
                    <img height={27} loading='lazy' src={brand} alt='munitask brand'/>
        </div>
            <form className='' onSubmit={(e)=>{signUpWithEmail(e)}}>
        
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3 login-form">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                    {emailErr? <><p style={{color: 'red', fontSize:'.85123rem'}}> Invalid email</p></>:<></>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' />
                    {pwdError? <><p style={{color: 'red', fontSize:'.85123rem'}}> Password must be between 8 and 15 characters long, contain at least one number, at least one uppercase letter, and at least one lowercase letter.</p></>:<></>}
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>

                </div>
                <button type="submit" data-testid='signInSubmit' className="btn btn-dark login-btn ">Sign Up<i className="fa-solid fa-arrow-right-long fa-lg"></i></button>
              
            </form>
            <p className='my-4 text-center'><b>OR</b></p>
            <div className='d-flex justify-content-center'>
             
            <img src={googlebtn} alt='...' data-testid='googleBtn' className='google-btn' onClick={()=>{createPopUp()}}/>
           
            </div>
            <div className='d-flex flex-row justify-content-center mt-3'>
            <p className='me-2'>Already have an account?{" "}</p>
                <Link to='/login'  style={{textDecoration:'underline', color:'#0275d8'}}  >
                Log In
                </Link>
           
            {/* <button className='btn btn-light' onClick={()=>{createPopUp(); handleCloseSignup()}}>Sign in with Google</button> */}
            
            </div>
            </div>
            </>}
            </>

  )
}
