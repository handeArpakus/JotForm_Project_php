import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
//import InlineEdit from "./InlineEdit";

function ModalComponent(props) {
  function edit() {
    console.log("hello");
  }
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          {/* <InlineEdit /> */}
          <p>Hi</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={() => edit()}>Edit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
