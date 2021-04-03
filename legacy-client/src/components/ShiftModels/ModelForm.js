import React from "react";
import { Form, Button } from "react-bootstrap";

export default function ModelForm(props) {
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group controlId="formBasicModelName">
        <Form.Label>Name: </Form.Label>
        <Form.Control
          name="name"
          value={props.values.name}
          type="text"
          onChange={props.onChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicColor">
        <Form.Label>Color: </Form.Label>
        <Form.Control
          name="color"
          value={props.values.color}
          type="color"
          onChange={props.onChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicStartTime">
        <Form.Label>Start time: </Form.Label>
        <Form.Control
          name="startsAt"
          value={props.values.startsAt}
          type="number"
          onChange={props.onChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="formBasicEndTime">
        <Form.Label>End time: </Form.Label>
        <Form.Control
          name="duration"
          value={props.values.duration}
          type="number"
          onChange={props.onChange}
          required
        />
      </Form.Group>
      <Button variant="secondary" type="submit" onClick={props.onHide}>
        Submit changes
      </Button>
    </Form>
  );
}
