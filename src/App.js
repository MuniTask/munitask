import './styles/styles.css';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation';
import FooterBottom from './components/FooterBottom';
import HowItWorks from './views/HowItWorks';
import JobView from './views/JobView';
import AddToDb from './views/AddToDb';
import UserProfile from './views/UserProfile';
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs, setDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "./firebase";
import Addtodb2 from './views/Addtodb2';
import Home2 from './views/Home2';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import Signup from './components/Signup';
import WhoWeAre from './views/WhoWeAre';
import UserInfoForm from './views/UserInfoForm';


function App() {
const getUserFromLocalStorage = () => {
  const foundUser = localStorage.getItem('user')
  if (foundUser){
    return JSON.parse(foundUser)
  }
  return {}
};
const [redirect, setRedirect]=useState(false);
const [user, setUser] = useState(getUserFromLocalStorage());
 const auth = getAuth();
 const [signedIn, setSignedIn]=useState(false);
const [globalJobs, setGlobalJobs]=useState();
  const createPopUp=async()=>{
    const auth=getAuth();
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth, provider)
    // this is not working
    const existingUserDoc = await getDoc(doc(db,"users",result.user.uid));
    console.log('this', existingUserDoc.name)
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
    handleFirstLogin(user);
    localStorage.setItem('user', JSON.stringify(user));
  };
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
     setRedirect(true)
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
    // handleFirstLogin(user);
     localStorage.setItem('user', JSON.stringify(auth.currentUser));
  
    setSignedIn(true)
    // ...
  })
  .catch((error) => {
    console.log('user does not exist')
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('user does not exist', errorCode, errorMessage)

  });

  };
  const signUpWithEmail=(e)=>{
    e.preventDefault();
    const email= e.target.email.value
    const password= e.target.password.value
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
  });
  };
  
  const writeUserData = async(result)=> {
    console.log('result displayname',result.displayName)
    await setDoc(doc(db, `users`, `${result.uid}`), {
      uid:result.uid,
      name:result.displayName,
      email: result.email,
      saved_jobs:[],
      user_logins:0
    }, {merge:true});
  }

  const signUserOut=async()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
    
    setUser({});
    console.log('User succesfully signed out');
    localStorage.removeItem(user);
  }
useEffect(()=>{
  auth.onAuthStateChanged(user=>{
    if (user) {
        // store the user on local storage
        localStorage.setItem('user', true);
        setUser(user)
    };})
},[])
 
  return (
    <div className="App">
      
      
 
     <BrowserRouter >
     <div className='content-wrap'>
     <Navigation user={user} signUp={signUpWithEmail} handleFirstLogin={handleFirstLogin} logIn={logInWithEmail} signUserOut={signUserOut} createPopUp={createPopUp}/>
     <Routes>
      <Route path='/' element={<Home2   globalJobs={globalJobs} setGlobalJobs={setGlobalJobs} createPopUp={createPopUp}  user={user}/>}/>
      <Route path='/home2' element={<Home2  incrementLogin={incrementLogin} user={user}/>}/>
      <Route path='/:jobTitle' element={<JobView createPopUp={createPopUp} user={user}/>}/>
      <Route path='/whoweare' element={<WhoWeAre />}/>
      <Route path='/howitworks' element={<HowItWorks signUp={signUpWithEmail} logIn={logInWithEmail}/>}/>
      <Route path='/addtodb' element={<AddToDb />}/>
      <Route path='/addtodb2' element={<Addtodb2 />}/>
      <Route path='/passwordrecovery' element={<ForgotPassword />}/>
      <Route path='/login' element={<Login signedIn={signedIn} setUser={setUser} writeUserData={writeUserData} user={user} logIn={logInWithEmail} createPopUp={createPopUp}/>}/>
      <Route path='/signup' element={<Signup setUser={setUser} signUp={signUpWithEmail} createPopUp={createPopUp}/>}/>
      {/* <Route path='/maps' element={<Maps />}/> */}
      <Route path='/userprofile' element={<UserProfile createPopUp={createPopUp} signUserOut={signUserOut} incrementLogin={incrementLogin} setUser={setUser} user={user}/>}/>
      <Route path='/userinfo' element={<UserInfoForm user={user}/>}/>

     </Routes>
     </div>
     <FooterBottom className='footer'/>
     </BrowserRouter>
     
     </div>
   
  );
}

export default App;
