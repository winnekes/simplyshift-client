import React from "react";
import { Link } from "react-router-dom";

import { Form, Button } from "react-bootstrap";
import "../assets/styles/forms.css";

export default function Login(props) {
  const { email, password } = props.values;

  return (
    <div className="main-form">
      <h1>Login</h1>
      <Form onSubmit={props.onSubmit}>
        <Form.Group controlId="formBasicEmail" className="mb-4">
          <Form.Label className="sr-only">Email:</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={props.onChange}
            placeholder="your@email.com"
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword" className="mb-4">
          <Form.Label className="sr-only">Password:</Form.Label>
          <Form.Control
            name="password"
            type="password"
            minLength={8}
            value={password}
            onChange={props.onChange}
            placeholder="Your password"
            required
          />
        </Form.Group>
        <Form.Text className="text-muted">
          Don't have an account? Then please <Link to="/signup">sign up</Link>{" "}
          now
        </Form.Text>
        <Button variant="danger" type="submit" className="mt-3">
          Login
        </Button>
      </Form>
    </div>
  );
}
