import React from "react";
import Modal from "react-bootstrap/Modal";
function ModalAgregarIntegrante(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Integrante al Grupo
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Escoja los usuarios que desea agregar al grupo</label>
          <select
            multiple
            className="form-control"
            id="exampleFormControlSelect2"
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
        <button className="boton" onClick={props.onHide}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarIntegrante;
