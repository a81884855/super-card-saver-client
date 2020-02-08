import React from 'react';
import { Navbar, Nav, Container, Image } from 'react-bootstrap';

export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image src="/apple-touch-icon.png" style={{ width: '30px', margin: '-5px 5px' }} />
          Super Card Saver
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/card-advisor">Card Advisor</Nav.Link>
            <Nav.Link href="/category">Category</Nav.Link>
            <Nav.Link href="/calculator">Calculator</Nav.Link>
            <Nav.Link href="/cards">All Cards</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
