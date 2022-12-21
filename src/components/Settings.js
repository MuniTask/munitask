import { deleteUser, EmailAuthCredential, EmailAuthProvider, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import { Password } from 'phosphor-react';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import {db} from "../firebase";
import google_logo from '../images/google_logo.png';
import ReAuthUser from './ReAuthUser';
export default function Settings({user, signUserOut}) {
    const auth=getAuth();
    const [canSubmit, setCanSubmit]=useState(false)
    const [provider, setProvider]=useState(false)
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
    const reAuthUser=(e)=>{
      e.preventDefault();
      const auth = getAuth();
      const user = auth.currentUser;
      // TODO(you): prompt the user to re-provide their sign-in credentials
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
      if (e.target.new_password.value!==''){
        const password=e.target.new_password.value;
        update_pass(password);
      }
      if(e.target.new_username.value!==''){
        const username=e.target.new_username.value;
      
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
        }).catch((error) => {
        });
      };
      if (e.target.new_email.value!==''){
        const email=e.target.new_email.value;    
        await setDoc(doc(db, `users`, `${auth.currentUser.uid}`), {
          email: email
        }, {merge:true});
          updateEmail(auth.currentUser, email
        ).then(() => {
          console.log('auth email changed')
        }).catch((error) => {
          console.log(error)
        });
      }
    };
    useEffect(()=>{
     console.log(user.email)
      google_or_email()
    },[])
  return (
    
    <div>
      {/* {user.uid?<> */}
      {provider? <>
      
        <div className='d-flex flex-row align-items-center'>
          <h5 className='me-2 pt-2'>You are signed in with</h5>
          <img style={{height:'1.8rem'}} src={google_logo} alt='google-logo'/>
        </div>
      </>:<>
      <h4>Account Information</h4>
      {!canSubmit?<>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control disabled type="email" name='new_email' placeholder='email' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control disabled type="username" name='new_username' placeholder='username'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control disabled type="password" name='new_password'  placeholder='password' />
      </Form.Group>
      <div className='d-flex flex-row align-items-baseline'>
        <Button variant="primary" onClick={handleShow}>
       edit
      </Button>
        <ReAuthUser reAuthUser={reAuthUser} handleClose={handleClose} show={show} setShow={setShow} handleShow={handleShow}/>
      </div>
    </Form>
      </>:
      <>
      <Form onSubmit={(e)=>update_info(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='new_email' placeholder='email' />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="username" name='new_username' placeholder='username'/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" name='new_password'  placeholder='password' />
      </Form.Group>
      <div className='d-flex flex-row align-items-baseline'>
        <p className='me-3' onClick={handleCancel} >Cancel</p>
       
        <Button variant="success" type="submit">
          Save Changes
        </Button>
   
      </div>
     
    </Form>
    </>}
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
