import React, { Fragment } from 'react';

import { Form, Button } from 'react-bootstrap';

export default function Login(props) {
    console.log(props);
    return (
        <Fragment>
            <h2>Login</h2>

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
        </Fragment>
    );
}
