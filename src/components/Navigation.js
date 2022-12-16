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
export default function Navigation({user, signUserOut}) {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);


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
        data-testid='navbar-toggler'
      >
        <List size={32} />
      </MDBNavbarToggler>
      <MDBCollapse navbar show={showNavNoToggler}>
        
        <MDBNavbarNav  className='mr-auto mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <Link data-testid='home-nav-item' className='nav-link' to='/'>
            Home
            </Link>
          </MDBNavbarItem>

          <MDBNavbarItem>
            <Link data-testid='how-itworks-nav-item' className='nav-link'  to="/howitworks" >
            How It Works
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link  data-testid='about-nav-item' className='nav-link' to="/about" >
            About
            </Link>
          </MDBNavbarItem >
          <MDBNavbarItem>
            <Link data-testid='faq-nav-item' className='nav-link'  to="/faqs" >
            FAQs
            </Link>
          </MDBNavbarItem>
        </MDBNavbarNav>
        {user.uid? <>
      <Dropdown>
      <Dropdown.Toggle data-testid='user-dropdown' focusfirstitemonshow='false' className='user-btn' id="dropdown-basic">
        Hello, {user.displayName}
      </Dropdown.Toggle>
      <Dropdown.Menu className='user-dropdown'>
        <Link onClick={()=>{signUserOut()}} data-testid='signout-link' to='/'>Sign Out</Link><br/>
        <Link to='/userprofile' data-testid='profile-link'>Profile</Link>
      </Dropdown.Menu>
    </Dropdown>
        </>
        :
        <>
         <Dropdown >
          <Dropdown.Toggle  data-testid='guestuser-dropdown' className='btn btn-light signin-btn' variant="success" id="dropdown-basic">
            Hello, Guest
          </Dropdown.Toggle>
          <Dropdown.Menu className='user-dropdown' variant='dark'>
          <Link to='signup' data-testid='signup-link'>Sign Up</Link>
              <Link to='login' data-testid='login-link'>Log in</Link>
          </Dropdown.Menu>
        </Dropdown>
        </>}
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}
