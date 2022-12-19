import { deleteUser, EmailAuthCredential, getAuth, reauthenticateWithCredential, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Form, Modal } from 'react-bootstrap';
import {db} from "../firebase";
import google_logo from '../images/google_logo.png';
export default function Settings({user}) {
    const auth=getAuth();
    const [canSubmit, setCanSubmit]=useState(false)
    const [provider, setProvider]=useState(false)
    const [data, setData]=useState({
        email:user.email,
        phone:user.email,
        
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const delete_user=()=>{
      const auth = getAuth();
    const user = auth.currentUser;
        deleteUser(user).then(() => {
        }).catch((error) => {
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
      const email= e.target.email.value
      const password= e.target.password.value
      const credential = new EmailAuthCredential(email, password)
      reauthenticateWithCredential(user, credential).then(() => {
        setCanSubmit(true)
      }).catch((error) => {
        // An error ocurred
        // ...
      });
    }
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
      if (e.target.new_password.value){
        const password=e.target.new_password.value;
        update_pass(password);
      }
      if(e.target.new_username.value){
        const username=e.target.new_username.value;
      
        updateProfile(auth.currentUser, {
          displayName: username
        }).then(() => {
        }).catch((error) => {
        });
      };
      if (e.target.new_email.value){
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
     console.log(auth.currentUser)
      google_or_email()
    },[])
  return (
    // if user signed in through google, then show 'no settings to edit'. otherwise, show change, email, password, username? 
    <div>
      {provider? <>
        <div className='d-flex flex-row align-items-center'>
          <h5 className='me-2 pt-2'>You are signed in with</h5>
          <img style={{height:'1.8rem'}} src={google_logo} alt='google-logo'/>
        </div>
      </>:<>
      <h4>Account Information</h4>
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
        <p className='me-3'>Cancel</p>
        {canSubmit? <>
        <Button variant="success" type="submit">
          Save Changes
        </Button>
        </>:<>
        <Button variant="primary" onClick={handleShow}>
       Save Changes
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Please confirm email and password to update settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={(e)=>reAuthUser(e)}>
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
            <input type="password" className="form-control" name="password" data-testid='login-password-input'/>
            </div>
            <Button variant="primary" type='submit' onClick={handleClose}>
            Save Changes
          </Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>
      </>}
      </div>
     
    </Form>
    </>}
    <div className='mt-5'>
      <h5>Delete Account</h5>
      <p>All of your data and interest forms will be deleted from MuniTask.</p>
    <Button variant="outline-danger" type="submit">
          Delete Account
    </Button>
    </div>
    

    </div>
  )
}
