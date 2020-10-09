import React from 'react';
import { Form, Button } from 'react-bootstrap';
import '../assets/styles/forms.css';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
  const {
    doPasswordsMatch,
    values: { username, email, password, confirmPassword },
  } = props;

  return (
    <div className="main-form" autoComplete="off">
      <h1>Sign up</h1>
      <Form onSubmit={props.onSubmit}>
        <Form.Group controlId="formBasicUsername" className="mb-5">
          <Form.Label className="sr-only">Username</Form.Label>
          <Form.Control
            name="username"
            type="text"
            value={username}
            onChange={props.onChange}
            placeholder="Username"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail" className="mb-5">
          <Form.Label className="sr-only">Email</Form.Label>
          <Form.Control
            variant="info"
            name="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={props.onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-5">
          <Form.Label className="sr-only">Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Your password, min. 8 characters"
            minLength={8}
            value={password}
            onChange={props.onChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicConfirmPassword" className="mb-4">
          <Form.Label className="sr-only">Confirm your password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            minLength={8}
            value={confirmPassword}
            onChange={props.onChange}
            required
          />
          {doPasswordsMatch() ? (
            ''
          ) : (
            <Form.Text className="text-danger">
              The passwords do not match
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="danger" type="submit" className="my-3">
          Sign up
        </Button>
        <Form.Text className="text-muted">
          Do you already have an account? Then <Link to="/login">login</Link>
        </Form.Text>
      </Form>
    </div>
  );
}
