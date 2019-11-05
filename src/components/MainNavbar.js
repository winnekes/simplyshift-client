import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

export default function MainNavbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand>
                <Link to="/">SimplyShift</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
            >
                <Nav>
                    <Nav.Link href="#home">Login</Nav.Link>
                    <Nav.Link href="#link">Register</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
