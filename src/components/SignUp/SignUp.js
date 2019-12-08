import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/forms.css';
export default function SignUp(props) {
    return (
        <>
            <div className="main-form" autoComplete="off">
                <h1>Sign up</h1>
                <Form onSubmit={props.onSubmit}>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            name="username"
                            value={props.values.username}
                            type="text"
                            onChange={props.onChange}
                            placeholder="Username"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            variant="info"
                            name="email"
                            value={props.values.email}
                            type="email"
                            onChange={props.onChange}
                            placeholder="Your email"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            name="password"
                            value={props.values.password}
                            type="password"
                            onChange={props.onChange}
                            placeholder="Password"
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicProfileUrl">
                        <Form.Label>Link to profile image</Form.Label>
                        <Form.Control
                            name="profileUrl"
                            value={props.values.profileUrl}
                            type="url"
                            onChange={props.onChange}
                        />
                    </Form.Group>
                    <Button variant="danger" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    );
}
