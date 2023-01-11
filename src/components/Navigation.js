import React, {  useState } from 'react'
import brand from '../images/munitask-brand.png';
import { Link } from "react-router-dom";
import {  MDBCollapse, MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { Dropdown } from 'react-bootstrap';
import {List} from 'phosphor-react';
export default function Navigation({user, signUserOut}) {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);
  const [show, setShow] = useState(false);
  const showDropdown = ()=>{
      setShow(true);
  }
  const hideDropdown = () => {
      setShow(false);
  }

  return (
    <MDBNavbar expand='lg' className='navigation'  dark bgColor='dark'  >
    <MDBContainer fluid>

    <MDBNavbarBrand ><Link to='/'><img src={brand} height='30' alt='munitask brand' loading='lazy' /></Link></MDBNavbarBrand>
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
            <Link data-testid='homeNavItem' className='nav-link' to='/'>
            Home
            </Link>
          </MDBNavbarItem>

          <MDBNavbarItem>
            <Link data-testid='howItWorksNavItem' className='nav-link'  to="/howitworks" >
            How It Works
            </Link>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <Link  data-testid='whoWeAreNavItem' className='nav-link' to="/whoweare" >
            Who We Are
            </Link>
          </MDBNavbarItem >
          <MDBNavbarItem>
            <Link  data-testid='adviceNavItem' className='nav-link' to="/advice" >
           Advice
            </Link>
          </MDBNavbarItem >
          <MDBNavbarItem>
            <Link  data-testid='AskAQuestionWeAreNavItem' className='nav-link' to="/ask-a-question" >
            Ask a Question
            </Link>
          </MDBNavbarItem >
     
        </MDBNavbarNav>
        {user.displayName? <>
      <Dropdown>
        <Dropdown.Toggle data-testid='userDropdown' focusfirstitemonshow='false' className='user-btn' id="dropdown-basic">
          Hello {`, ${user.displayName}`}
        </Dropdown.Toggle>
      <Dropdown.Menu show={show} onMouseEnter={showDropdown}  onMouseLeave={hideDropdown} className='user-dropdown'>
        <Link onClick={()=>{signUserOut()}} data-testid='signoutLink' to='/'>Sign Out</Link><br/>
        <Link to='/userprofile' data-testid='profileLink'>Account</Link>
      </Dropdown.Menu>
    </Dropdown>
        </>
        :
        <>
         <Dropdown >
          <Dropdown.Toggle  data-testid='guestUserDropdown' className='btn btn-light signin-btn' variant="success" id="dropdown-basic">
            Sign Up or Log In
          </Dropdown.Toggle>
          <Dropdown.Menu show={show} onMouseEnter={showDropdown}  onMouseLeave={hideDropdown} className='user-dropdown' variant='dark'>
          <Link to='signup' data-testid='signUpLink'>Sign Up</Link>
              <Link to='login' data-testid='logInLink'>Log in</Link>
          </Dropdown.Menu>
        </Dropdown>
        </>}
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}
