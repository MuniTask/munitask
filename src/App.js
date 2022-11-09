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
import UserProfile from './views/UserProfile';
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, set} from "firebase/database";


function App() {
 const [user, setUser]=useState({})
 const auth = getAuth();
 const db = getDatabase();
 const userRef = ref(db, 'user');

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

  const writeUserData = (result)=> {
    const db = getDatabase();
    set(ref(db, 'users/' + result.user.uid), {
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
      <Navigation user={user} signUserOut={signUserOut} createPopUp={createPopUp}/>
      
      <div className='content-wrap'>
     <BrowserRouter >
     <Routes>

      <Route path='/' element={<Home />}/>
      <Route path='/:jobTitle' element={<JobView />}/>
      <Route path='/about' element={<About />}/>
      <Route path='/howitworks' element={<HowItWorks />}/>
      <Route path='/faqs' element={<FAQs />}/>
      <Route path='/test' element={<Test />}/>
      <Route path='/addtodb' element={<AddToDb />}/>
      <Route path='/userprofile' element={<UserProfile user={user}/>}/>

     </Routes>
     
     </BrowserRouter>
     </div>
     <FooterBottom className='footer'/>
     </div>
   
  );
}

export default App;
