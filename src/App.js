import './styles/styles.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation';
import FooterBottom from './components/FooterBottom';
// import Home from './views/Home';
import About from './views/About';
import HowItWorks from './views/HowItWorks';
import FAQs from './views/FAQs';
import JobView from './views/JobView';
import AddToDb from './views/AddToDb';
import Maps from './components/Maps';
import UserProfile from './views/UserProfile';
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup,GoogleAuthProvider, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, getDocs, setDoc, doc, getDoc} from "firebase/firestore";
import {db} from "./firebase";
import Addtodb2 from './views/Addtodb2';
import Home2 from './views/Home2';
import JobItem from './components/JobItem';


function App() {
//  const [user, setUser]=useState({})
const getUserFromLocalStorage = () => {
  const foundUser = localStorage.getItem('user')
  if (foundUser){
    return JSON.parse(foundUser)
  }
  return {}
};
const [user, setUser] = useState(getUserFromLocalStorage())
 const auth = getAuth();


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
      writeUserData(result);
    }
    ////////
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log('user',user)
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const logInWithEmail=(email, password)=>{
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user)
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  const signUpWithEmail=(email, password)=>{
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    setUser(user)
    console.log(user)
    // ...
  })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  }


  const writeUserData = async(result)=> {
    await setDoc(doc(db, `users`, `${result.user.uid}`), {
      uid:result.user.uid,
      name:result.user.displayName,
      email: result.user.email,
      saved_jobs:[],
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
    localStorage.removeItem('user');
  }

 
  return (
    <div className="App">
      
      
 
     <BrowserRouter >
     <div className='content-wrap'>
     <Navigation user={user} signUserOut={signUserOut} createPopUp={createPopUp}/>
     <Routes>
      <Route path='/' element={<Home2 createPopUp={createPopUp}  user={user}/>}/>
      <Route path='/home2' element={<Home2 />}/>
      <Route path='/:jobTitle' element={<JobView createPopUp={createPopUp} user={user}/>}/>
      <Route path='/about' element={<About />}/>
      <Route path='/howitworks' element={<HowItWorks signUp={signUpWithEmail}/>}/>
      <Route path='/faqs' element={<FAQs />}/>
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
