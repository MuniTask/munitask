import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ReAuthUser({handleClose, show,reAuthUser}) {
    
  return (
    
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Please confirm password to continue</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <form onSubmit={(e)=>reAuthUser(e)}>
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
  )
}
