import React from "react";
import { Button, Modal } from "react-bootstrap";
import ModelFormContainer from "./ModelFormContainer";
// todo: implement error handling
export default function EditorModal(props) {
  const model = props.model;

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {model && <>Edit: {model.name} </>}
            {!model && <>New super model :></>}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModelFormContainer model={model} onHide={props.onHide} />
        </Modal.Body>
      </>

      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
