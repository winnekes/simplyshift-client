import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Navigation(props) {
    let navigationLinks;

    if (!props.user) {
        navigationLinks = (
            <>
                <LinkContainer to="/login">
                    <Nav.Item>Login</Nav.Item>
                </LinkContainer>
                <LinkContainer to="/signup">
                    <Nav.Item>Sign up</Nav.Item>
                </LinkContainer>
            </>
        );
    } else {
        navigationLinks = (
            <>
                <LinkContainer to="/profile">
                    <Nav.Item>Profile</Nav.Item>
                </LinkContainer>
                <LinkContainer to="/" onClick={() => props.logout()}>
                    <Nav.Item>Logout</Nav.Item>
                </LinkContainer>
            </>
        );
    }

    return (
        <Navbar bg="light" expand="lg">
            <LinkContainer to="/">
                <Navbar.Brand>SimplyShift</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
            >
                <Nav>{navigationLinks}</Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
