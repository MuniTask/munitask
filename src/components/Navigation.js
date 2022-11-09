import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import brand from '../images/munitask-brand.png';
import { getAuth, signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom';
import { MDBBtn, MDBCollapse, MDBContainer, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBIcon, MDBNavbar, MDBNavbarBrand, MDBNavbarItem, MDBNavbarLink, MDBNavbarNav, MDBNavbarToggler } from 'mdb-react-ui-kit';
import { NavItem } from 'react-bootstrap';
import {List} from 'phosphor-react';
export default function Navigation({user, createPopUp, setUser, signUserOut}) {
  const [showNavNoToggler, setShowNavNoToggler] = useState(false);


  return (
    <MDBNavbar expand='lg' className='navigation'  dark bgColor='dark'  >
    <MDBContainer fluid>

    <MDBNavbarBrand href='#'><img src={brand} height='30' alt='munitask-brand' loading='lazy' /></MDBNavbarBrand>
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
            <MDBNavbarLink   href="/" >
            Home
            </MDBNavbarLink>
          </MDBNavbarItem>

          <MDBNavbarItem>
            <MDBNavbarLink   href="/howitworks" >
            How It Works
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink   href="/about" >
            About
            </MDBNavbarLink>
          </MDBNavbarItem >
          <MDBNavbarItem>
            <MDBNavbarLink   href="/faqs" >
            FAQs
            </MDBNavbarLink>
          </MDBNavbarItem>
        </MDBNavbarNav>
        {user.uid? <>
          <MDBDropdown>
          <MDBDropdownToggle className='d-flex w-auto mb-3 signin-signout'>Hello, {user.displayName}</MDBDropdownToggle>
          <MDBDropdownMenu >
            <MDBDropdownItem link>Action</MDBDropdownItem>
            <MDBDropdownItem onClick={()=>{signUserOut()}} >Log Out</MDBDropdownItem>
            <MDBDropdownItem link href="/userprofile" >Profile</MDBDropdownItem>
          </MDBDropdownMenu>
          </MDBDropdown>
        </>
        :
        <>
        <MDBBtn className='signin-btn' onClick={()=>{createPopUp()}}>Sign In</MDBBtn>
        </>}
      </MDBCollapse>
    </MDBContainer>
  </MDBNavbar>
  )
}
