import React from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Button, Form } from 'react-bootstrap';
export default function ForgotPassword() {
    const forgotPassword=(e)=>{
        e.preventDefault()
        const auth = getAuth();
        const email=e.target.forgotpass.value;
        sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          console.log(email)
          // ..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('error sending email')
          // ..
        });
      }
      
  return (
    <div className='password-recovery-container'>
        <p  className='text-center w-50 mx-auto mt-4'>A link will be sent to reset your MuniTask password. This email may be sent to your spam folder. </p>
        <Form onSubmit={(e)=>forgotPassword(e)} className='password-recovery-form mx-auto mt-4'>
            <Form.Group>
            <Form.Label>Please enter your email. </Form.Label>
            <Form.Control type='text' name='forgotpass'></Form.Control>
            <Button className='mt-3' type='submit'>Submit</Button>
            </Form.Group>
        </Form>
    </div>
  )
}
