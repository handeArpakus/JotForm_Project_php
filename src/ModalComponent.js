import React, { useState, useEffect, Component } from "react";
import Modal from "react-bootstrap/Modal";

function ModalComponent(props) {
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Habitasse platea dictumst quisque sagittis. Cursus in hac habitasse
            platea dictumst quisque sagittis purus. Faucibus in ornare quam
            viverra orci sagittis eu volutpat. Tristique nulla aliquet enim
            tortor at. Imperdiet dui accumsan sit amet nulla facilisi morbi
            tempus iaculis. Risus nullam eget felis eget nunc lobortis mattis.
            Sem viverra aliquet eget sit amet tellus cras adipiscing enim.
            Rhoncus mattis rhoncus urna neque. In ornare quam viverra orci
            sagittis. Volutpat odio facilisis mauris sit amet massa vitae
            tortor. Diam phasellus vestibulum lorem sed risus. Egestas sed
            tempus urna et pharetra pharetra massa massa. Diam quis enim
            lobortis scelerisque. Viverra mauris in aliquam sem fringilla ut.
            Aliquam sem et tortor consequat id porta nibh venenatis. Vel quam
            elementum pulvinar etiam non quam lacus suspendisse faucibus.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide}>Close</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalComponent;
