import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/forms.css';

export default function Login(props) {
    console.log(props);
    return (
        <div className="main-form">
            <h1>Login</h1>

            <Form onSubmit={props.onSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        name="email"
                        value={props.values.email}
                        type="email"
                        onChange={props.onChange}
                        placeholder="yourname@test.com"
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        name="password"
                        value={props.values.password}
                        type="password"
                        onChange={props.onChange}
                        placeholder="Password"
                        required
                    />
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}
