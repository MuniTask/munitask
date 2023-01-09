import { deleteUser, EmailAuthCredential, EmailAuthProvider, getAuth, GoogleAuthProvider, reauthenticateWithCredential, signInWithPopup, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { Password } from 'phosphor-react';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import {db} from "../firebase";
import google_logo from '../images/google_logo.png';
import ReAuthUser from './ReAuthUser';
export default function Settings({user, signUserOut, setUser}) {
  const states = ["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Florida","Georgia","Guam","Hawaii",
    "Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Minor Outlying Islands","Mississippi","Missouri","Montana",
    "Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Pennsylvania","Puerto Rico",
    "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","U.S. Virgin Islands","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming",];
    const auth=getAuth();
    const [currentUser, setCurrentUser]=useState({});
    const age_array=Array.from({length: 50}, (x, i) => i+15);
    const [canSubmit, setCanSubmit]=useState(false)
    const [provider, setProvider]=useState(false);
    const [student, setStudent]=useState(false)
    const [showDeleteModal, setShowDeleteModal]=useState(false)
    const [data, setData]=useState({
        email:user.email,
        phone:user.email,
        
    })
    const [show, setShow] = useState(false);
    const handleCancel = () => setCanSubmit(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);

    const minimum_year_of_birth=()=>{
      const date = new Date();
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year-15}-${month}-${day}`;
     return currentDate
    };
    const handleStudent=()=>{
      if (currentUser.student ==='true'){
        setStudent(true)
      }
    }
    const delete_user=()=>{
      const auth = getAuth();
    const user = auth.currentUser;
        deleteUser(user).then(() => {
          console.log('deleted user')
        }).catch((error) => {
          console.log(error)
    });
    };
    const update_pass=(newPassword)=>{
      const auth = getAuth();
      const user = auth.currentUser;
      updatePassword(user, newPassword).then(() => {
        // Update successful.
      }).catch((error) => {
        // An error ocurred
        // ...
      });
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
      // setUser(user);
      // localStorage.setItem('user', JSON.stringify(user));
      setCanSubmit(true)
    };
    
    const reAuthUser=(e)=>{
      e.preventDefault();
      const auth = getAuth();
      const user = auth.currentUser;
      // TODO(you): prompt the user to re-provide their sign-in credentials
      if (auth.currentUser['providerData'][0].providerId ==='google.com'){
        createLoginPopUp();
      } else if(auth.currentUser['providerData'][0].providerId ==='password'){
        console.log('EMAIL')
        const email= auth.currentUser.email;
        const password= e.target.password.value;
        console.log(email)
        const credential = EmailAuthProvider.credential(email, password);
        reauthenticateWithCredential(user, credential).then(() => {
          console.log('success reauthenticating')
          setCanSubmit(true)
        }).catch((error) => {
          console.log('error!!')
          console.log(error)
          // ...
        });
      
      }
    };

    const google_or_email=()=>{
      const auth=getAuth();
      if (auth.currentUser){
        if (auth.currentUser['providerData'][0].providerId ==='google.com'){
          console.log('google')
          setProvider(true)
        } else if (auth.currentUser['providerData'][0].providerId ==='password'){
          console.log('password')
          setProvider(false)
        }
      }
     
    };
    const writeUserData = async(result)=> {
      await setDoc(doc(db, `users`, `${result.uid}`), {
        name:result.displayName
      }, {merge:true});
    }
  
    const update_info=async(e)=>{
      e.preventDefault();
      // if (e.target.new_password.value!==''){
      //   const password=e.target.new_password.value;
      //   update_pass(password);
      // }
      // if(e.target.new_username.value!==''){
      //   const username=e.target.new_username.value;
      //   updateProfile(auth.currentUser, {
      //     displayName: username
      //   }).then(() => {
      //   }).catch((error) => {
      //   });
      // };
      // if (e.target.new_email.value!==''){
      //   const email=e.target.new_email.value;    
      //   await setDoc(doc(db, `users`, `${auth.currentUser.uid}`), {
      //     email: email
      //   }, {merge:true});
      //     updateEmail(auth.currentUser, email
      //   ).then(() => {
      //     console.log('auth email changed')
      //   }).catch((error) => {
      //     console.log(error)
      //   });
        
      // };
     
          const userRef=doc(db,"users",user.uid)
          await updateDoc(userRef,{
          first_name:e.target.first_name.value,
          last_name:e.target.last_name.value,
          birthday:e.target.birthday.value,
          email:e.target.email.value,
          state:e.target.state.value,
          age:e.target.age.value,
          zip:e.target.zip.value,
          city:e.target.city.value,
          phone_number:e.target.phone_number.value,
          student:e.target.student.value
        }, {merge:true});
        console.log('changes saved');
        setCanSubmit(false);
        
    };
    const handleSubmit = (e) => {
      e.preventDefault();
        window.dataLayer.push({
          event:'form_submitted',
          'form_name':'settings_form',
          'action': `form updated`,
        })
    };

  const getUser=async(user)=>{
    const docRef=doc(db,'users',user.uid)
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data())
    setCurrentUser(docSnap.data())
  };
    useEffect(()=>{
     console.log(user.email);
      google_or_email();
      getUser(user);
      handleStudent();
    },[])
  return (
    
    <div>
   
      
        {/* <div className='d-flex flex-row align-items-center'>
          <h5 className='me-2 pt-2'>You are signed in with</h5>
          <img style={{height:'1.8rem'}} src={google_logo} alt='google-logo'/>
        </div> */}

      <h4>Account Information</h4>
      {!canSubmit?<>
        <Form>
       
        {provider?<>
         <div className='d-flex flex-row align-items-center'>
          <h5 className='me-2 pt-2'>You are signed in with</h5>
          <img style={{height:'1.8rem'}} src={google_logo} alt='google-logo'/>
        </div></>:<>
       
        </>}
        <div className="form-row mb-3">
          <div className="form-group personal-settings-group2">
            <div className=" me-4">
              <label htmlFor="first_name">First Name</label>
              {currentUser.first_name?<> <input disabled name="first_name" type="text" defaultValue={currentUser.first_name}  className="form-control " id="first_name"  /></>
              :<> <input disabled name="first_name" type="text" placeholder="First Name" className="form-control " id="first_name"  /></>}
             
            </div>
            <div className=" me-4">
              <label htmlFor="last_name">Last Name</label>
              {currentUser.last_name?<><input disabled name="last_name" type="text" className="form-control " id="last_name" defaultValue={currentUser.last_name} /></>
              :<><input disabled name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" /></>}
              
            </div>
            <div className="">
              <label htmlFor="inputEmail4">Email</label>
              {currentUser.email?<><input disabled name="email" type="email" className="form-control" id="inputEmail4" defaultValue={currentUser.email} /></>
              :<><input disabled name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" /></>}
             
            </div>
          </div>
          <div className="personal-settings-group3">
            <div className="  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                {currentUser.phone_number?<><input disabled name="phone_number" type="tel" className="form-control" id="inputTel4" defaultValue={currentUser.phone_number} /></>
                :<><input disabled name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" /></>}
              </div>
            <div className="form-group  mt-3 me-4 ">
              <label htmlFor="birthday">Birthday</label>
              {currentUser.birthday?<><input disabled type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" defaultValue={currentUser.birthday} /></>
              :<><input disabled type="date" className="form-control" id="birthday" name="birthday"  min='1970-01-01' max={minimum_year_of_birth()} /></>}
            </div>
            <div className="form-group  mt-3">
            <label htmlFor="age">Age of job seeker</label>
            <select name="age" id="inputAge" className="form-control w-50" disabled>
              {currentUser.age?<>
                <option>{currentUser.age}</option>
                {age_array.map((age,i)=><Fragment key={i}>
              <option>{age}</option>
              </Fragment>)}</>
              :<>{age_array.map((age,i)=><Fragment key={i}>
                <option>{age}</option>
                </Fragment>)}</>}
            </select>
            </div>
            </div>
        </div>

        <div className="form-group personal-settings-group4 mb-5">
          <div className=" me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control" disabled>
              {currentUser.state?<>
                <option>{currentUser.state}</option>
                {states.map((state,i)=><Fragment key={i}>
              <option>{state}</option>
              </Fragment>)}</>
              :<>{states.map((state,i)=><Fragment key={i}>
                <option>{state}</option>
                </Fragment>)}</>}
            </select>
          </div>
          <div className=" me-4">
            <label htmlFor="inputCity">City</label>
            {currentUser.city?<> <input disabled name="city" type="text" className="form-control" id="inputCity" defaultValue={currentUser.city} />
            </>:<> <input disabled name="city" type="text" className="form-control" id="inputCity" /></>}
           
          </div>
          <div className=" me-4">
            <label htmlFor="inputZip">Zip</label>
            {currentUser.zip?<>  <input disabled name="zip" type="text" className="form-control" id="inputZip" defaultValue={currentUser.zip} /></>
            :<>  <input disabled name="zip" type="text" className="form-control" id="inputZip" /></>}
          
          </div>
        </div>
        <div className="w-25 me-4 mb-4">
              <p htmlFor="student" className="required-p mb-0 pb-0">Are you a student?</p>
              {student? <>
                    <div>
                    <label htmlFor="student">Yes</label>
                    <input className="student_no" disabled defaultChecked type="radio" id="student" name="student" />
                    </div>
                  <div>
                  <label htmlFor="student">No</label>
                    <input className="student_yes" disabled type="radio" id="student" name="student" />
                    </div>
              </>:<>
                  <div>
                  <label htmlFor="student">Yes</label>
                  <input className="student_no" disabled type="radio" id="student" name="student" />
                  </div>
                <div>
                <label htmlFor="student">No</label>
                  <input defaultChecked className="student_yes" disabled type="radio" id="student" name="student" />
                </div>
                  </>}
              </div>
      <div className='d-flex flex-row align-items-baseline'>
        <Button variant="primary" onClick={handleShow}>
       edit
      </Button>
        <ReAuthUser provider={provider} reAuthUser={reAuthUser} handleClose={handleClose} show={show} setShow={setShow} handleShow={handleShow}/>
      </div>
    </Form>
      </>:
      <>
      <Form onSubmit={(e)=>{update_info(e);handleSubmit(e)}}>
      
      <div className="form-row mb-3">
          <div className="form-group d-flex flex-row">
            <div className="w-25 me-4">
              <label htmlFor="first_name">First Name</label>
              {currentUser.first_name?<> <input name="first_name" type="text" defaultValue={currentUser.first_name}  className="form-control " id="first_name"  /></>
              :<> <input name="first_name" type="text" placeholder="First Name" className="form-control " id="first_name"  /></>}
             
            </div>
            <div className="w-25 me-4">
              <label htmlFor="last_name">Last Name</label>
              {currentUser.last_name?<><input name="last_name" type="text" className="form-control " id="last_name" defaultValue={currentUser.last_name} /></>
              :<><input name="last_name" type="text" className="form-control " id="last_name" placeholder="Last Name" /></>}
              
            </div>
            <div className="w-25">
              <label htmlFor="inputEmail4">Email</label>
              {currentUser.email?<><input name="email" type="email" className="form-control" id="inputEmail4" defaultValue={currentUser.email} /></>
              :<><input name="email" type="email" className="form-control" id="inputEmail4" placeholder="Email" /></>}
             
            </div>
          </div>
          <div className="d-flex flex-row">
            <div className="w-25  mt-3 me-4">
                <label htmlFor="inputTel4">Phone Number</label>
                {currentUser.phone_number?<><input name="phone_number" type="tel" className="form-control" id="inputTel4" defaultValue={currentUser.phone_number} /></>
                :<><input name="phone_number" type="tel" className="form-control" id="inputTel4" placeholder="Phone Number" /></>}
              </div>
            <div className="form-group w-25 mt-3 me-4 ">
              <label htmlFor="birthday">Birthday</label>
              {currentUser.birthday?<><input type="date" className="form-control" id="birthday" name="birthday" min="1900-01-01" max="2024-01-01" defaultValue={currentUser.birthday} /></>
              :<><input type="date" className="form-control" id="birthday" name="birthday"  min='1970-01-01' max={minimum_year_of_birth()} /></>}
            </div>
            <div className="form-group w-25 mt-3">
            <label htmlFor="age">Age of job seeker</label>
            <select name="age" id="inputAge" className="form-control w-50">
              {currentUser.age?<>
                <option>{currentUser.age}</option>
                {age_array.map((age,i)=><Fragment key={i}>
              <option>{age}</option>
              </Fragment>)}</>
              :<>{age_array.map((age,i)=><Fragment key={i}>
                <option>{age}</option>
                </Fragment>)}</>}
            </select>
            </div>
            </div>
        </div>

        <div className="form-group d-flex flex-row mb-5">
          <div className="w-25 me-4">
            <label htmlFor="inputState">State</label>
            <select name="state" id="inputState" className="form-control">
              {currentUser.state?<>
                <option>{currentUser.state}</option>
                {states.map((state,i)=><Fragment key={i}>
              <option>{state}</option>
              </Fragment>)}</>
              :<>{states.map((state,i)=><Fragment key={i}>
                <option>{state}</option>
                </Fragment>)}</>}
            </select>
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputCity">City</label>
            {currentUser.city?<> <input name="city" type="text" className="form-control" id="inputCity" defaultValue={currentUser.city} />
            </>:<> <input name="city" type="text" className="form-control" id="inputCity" /></>}
           
          </div>
          <div className="w-25 me-4">
            <label htmlFor="inputZip">Zip</label>
            {currentUser.zip?<>  <input name="zip" type="text" className="form-control" id="inputZip" defaultValue={currentUser.zip} /></>
            :<>  <input name="zip" type="text" className="form-control" id="inputZip" /></>}
          
          </div>
        </div>
        <div className="w-25 me-4 mb-4">
              <p htmlFor="student" className="required-p mb-0 pb-0">Are you a student?</p>
              {student? <>
                    <div>
                    <label htmlFor="student">Yes</label>
                    <input className="student_yes"  defaultChecked type="radio" value={true} id="student" name="student" />
                    </div>
                  <div>
                  <label htmlFor="student">No</label>
                    <input className="student_no"  type="radio" id="student" value={false} name="student" />
                    </div>
              </>:<>
                  <div>
                  <label htmlFor="student">Yes</label>
                  <input className="student_yes"  type="radio" id="student" value={true} name="student" />
                  </div>
                <div>
                <label htmlFor="student">No</label>
                  <input defaultChecked className="student_no"  type="radio" value={false} id="student" name="student" />
                </div>
                  </>}
              </div>
      <div className='d-flex flex-row align-items-baseline'>
        <p className='me-3' onClick={handleCancel} >Cancel</p>
       
        <Button variant="success" type="submit">
          Save Changes
        </Button>
   
      </div>
     
    </Form>
    </>}
    
    <div className='mt-5'>
      <h5>Delete Account</h5>
      <p>All of your data and interest forms will be deleted from MuniTask.</p>
    <Button onClick={handleShowDeleteModal} variant="outline-danger" type="submit">
          Delete Account
    </Button>
    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
         <p>Are you sure you want to delete your MuniTask account? This action is not reversable</p>
        </Modal.Body>
     <Modal.Footer>
      <Button onClick={()=>{delete_user();handleCloseDeleteModal();signUserOut()}} type='submit' variant='danger'>
        Delete Account
      </Button>
     </Modal.Footer>
      </Modal>
    </div>
    
    {/* </>:<>
    <Navigate to='/'/>
    </>} */}
    </div>
  )
}
