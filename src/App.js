import './styles/styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation';
import FooterBottom from './components/FooterBottom';
import Home from './views/Home';
import About from './views/About';
import HowItWorks from './views/HowItWorks';
import FAQs from './views/FAQs';
import JobView from './views/JobView';
import AddToDb from './views/AddToDb';
import Test from './views/Test';
import Maps from './components/Maps';
import UserProfile from './views/UserProfile';
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut } from "firebase/auth";
import { collection, addDoc, getDocs} from "firebase/firestore";
import {db} from "./firebase";
import Addtodb2 from './views/Addtodb2';
import Home2 from './views/Home2';


function App() {
 const [user, setUser]=useState({})
 const auth = getAuth();


  const createPopUp=async()=>{
    const auth=getAuth()
    const provider=new GoogleAuthProvider()
    const result=await signInWithPopup(auth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('user',user)
    setUser(user);
    writeUserData(result);
    
  
  }

  const writeUserData = async(result)=> {
  
    await addDoc(collection(db, "users/"), {
      uid:result.user.uid,
      name:result.user.displayName,
      email: result.user.email
    });
  }
 

  const signUserOut=async()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
    setUser({});
    console.log('User succesfully signed out')
  }

 
  return (
    <div className="App">
      
      
 
     <BrowserRouter >
     <div className='content-wrap'>
     <Navigation user={user} signUserOut={signUserOut} createPopUp={createPopUp}/>
     <Routes>

      <Route path='/' element={<Home2 />}/>
      <Route path='/home2' element={<Home2 />}/>
      <Route path='/:jobTitle' element={<JobView />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/howitworks' element={<HowItWorks />}/>
      <Route path='/faqs' element={<FAQs />}/>
      <Route path='/test' element={<Test />}/>
      <Route path='/addtodb' element={<AddToDb />}/>
      <Route path='/addtodb2' element={<Addtodb2 />}/>
      {/* <Route path='/maps' element={<Maps />}/> */}
      <Route path='/userprofile' element={<UserProfile user={user}/>}/>

     </Routes>
     </div>
     <FooterBottom className='footer'/>
     </BrowserRouter>
     
     </div>
   
  );
}

export default App;
