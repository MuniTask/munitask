import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import brand from '../images/munitask-brand.png';
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { NavItem, Dropdown, Modal, Button } from 'react-bootstrap';
import {List} from 'phosphor-react';
import Login from './Login';
import Signup from './Signup';
export default function Navigation({user, createPopUp, handleFirstLogin, signUserOut, signUp, logIn}) {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowSignup = () => setShowSignup(true);

  return (
    <MDBNavbar expand='lg' className='navigation'  dark bgColor='dark'  >
    <MDBContainer fluid>

    <MDBNavbarBrand href='#'><img src={brand} height='30' alt='munitask brand' loading='lazy' /></MDBNavbarBrand>
      <MDBNavbarToggler
        type='button'
        data-target='#navbarTogglerDemo01'
        aria-controls='navbarTogglerDemo01'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setShowNavNoToggler(!showNavNoToggler)}
      >
        <List size={32} />
      </MDBNavbarToggler>
      <MDBCollapse navbar show={showNavNoToggler}>
        
        <MDBNavbarNav  className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <Link className='nav-link' to='/'>
            Home
            </Link>
          </MDBNavbarItem>

          <MDBNavbarItem>
            <Link className='nav-link'  to="/howitworks" >
            How It Works
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link  className='nav-link' to="/about" >
            About
            </Link>
          </MDBNavbarItem >
          <MDBNavbarItem>
            <Link className='nav-link'  to="/faqs" >
            FAQs
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
        {user.uid? <>
          {/* <MDBDropdown>
          <MDBDropdownToggle className='d-flex w-auto mb-3 signin-signout'>Hello, {user.displayName}</MDBDropdownToggle>
          <MDBDropdownMenu >
            <MDBDropdownItem link>Action</MDBDropdownItem>
            <MDBDropdownItem onClick={()=>{signUserOut()}} >Log Out</MDBDropdownItem>
            <MDBDropdownItem link href="/userprofile" >Profile</MDBDropdownItem>
          </MDBDropdownMenu>
          </MDBDropdown> */}
          {/* <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Hello, {user.displayName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" onClick={()=>{signUserOut()}} href='/'>Action</a>
              <a className="dropdown-item" href="/userprofile">Profile</a>
              
            </div>
          </div> */}
      <Dropdown>
      <Dropdown.Toggle focusfirstitemonshow='false' className='user-btn' id="dropdown-basic">
        Hello, {user.displayName}
      </Dropdown.Toggle>

      <Dropdown.Menu className='user-dropdown'>
        <Link onClick={()=>{signUserOut()}} to='/'>Sign Out</Link><br/>
        <Link to='/userprofile'>Profile</Link>
      </Dropdown.Menu>
    </Dropdown>
        </>
        :
        <>
         <Dropdown >
          <Dropdown.Toggle  className='btn btn-light signin-btn' variant="success" id="dropdown-basic">
            Hello, Guest
          </Dropdown.Toggle>

          <Dropdown.Menu className='user-dropdown' variant='dark'>
          <Link to='signup'>Sign Up</Link>
            {/* <Dropdown.Item className='dropdown-btn-login' onClick={handleShowLogin}>Log in</Dropdown.Item>
              <Modal show={showLogin} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                  <Modal.Title className="login-header-cont d-flex flex-row align-items-baseline justify-content-center">
                    <h4 className="login-header me-2">Login to </h4>
                    <img height={27} loading='lazy' src={brand} alt='munitask brand'/>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body><Login user={user} logIn={logIn} handleFirstLogin={handleFirstLogin} handleCloseLogin={handleCloseLogin} createPopUp={createPopUp}/></Modal.Body>
                <Modal.Footer className="mx-auto">
                  <p >
                    Don't have an account?{" "}</p>
                    <p  style={{textDecoration:'underline', color:'#0275d8'}} onClick={()=>{handleShowSignup(); handleCloseLogin()}} >
                      Sign Up
                    </p>
                  
                </Modal.Footer>
              </Modal> */}
              <Link to='login'>Log in</Link>
            {/* <Dropdown.Item className='dropdown-btn-signup' onClick={handleShowSignup}>Sign up</Dropdown.Item>
            <Modal show={showSignup} onHide={handleCloseSignup}>
                <Modal.Header closeButton>
                <Modal.Title className="login-header-cont d-flex flex-row align-items-baseline justify-content-center">
                    <h4 className="login-header me-2">Sign up to</h4>
                    <img height={27} loading='lazy' src={brand} alt='munitask brand'/>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body><Signup signUp={signUp} handleShowLogin={handleShowLogin} handleCloseSignup={handleCloseSignup} createPopUp={createPopUp}/></Modal.Body>
                <Modal.Footer className="mx-auto">
                  <p > 
                    Already have an account?{" "}</p>
                    <p style={{textDecoration:'underline', color:'#0275d8'}} onClick={()=>{handleShowLogin(); handleCloseSignup()}} >
                      Log In
                    </p>
                 
                </Modal.Footer>
              </Modal> */}
          </Dropdown.Menu>
        </Dropdown>
       
        {/* <button className='btn btn-light signin-btn' onClick={()=>{createPopUp()}}>Sign In</button> */}
        </>}
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}
