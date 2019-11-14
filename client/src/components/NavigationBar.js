import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand>
                <Link to="/">SimplyShift</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item>Home</Nav.Item>
                </Nav>
                <Nav className="mr-right">
                    <Nav.Item>Login</Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
