import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import './assets/styles/main-header.css';

export default function MainHeader() {
    return (
        <Jumbotron>
            <h1>SimplyShift</h1>
            <p>Schedule your shifts. Simple. Fast.</p>

            <Button variant="primary">sign up now</Button>
        </Jumbotron>
    );
}
