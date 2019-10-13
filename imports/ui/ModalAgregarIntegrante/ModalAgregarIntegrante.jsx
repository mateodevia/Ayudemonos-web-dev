import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalAgregarIntegrante.css";

function ModalAgregarIntegrante(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Integrante al Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Escoja los usuarios que desea agregar al grupo</label>
          <select
            multiple
            className="form-control moreHeight"
            onChange={e => (selectedItem = e.target.value)}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="boton" onClick={() => props.onHide(selectedItem)}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarIntegrante;
