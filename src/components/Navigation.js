import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import brand from '../images/munitask-brand.png';
export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><img src={brand} height='30' alt='munitask-brand' loading='lazy' /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/howitworks">How It Works</Nav.Link>
            <Nav.Link href="/faqs">FAQs</Nav.Link>
            <Nav.Link href="/test">test</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}
