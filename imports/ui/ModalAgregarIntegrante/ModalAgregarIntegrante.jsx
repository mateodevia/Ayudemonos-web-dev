import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalAgregarIntegrante.css";

function ModalAgregarIntegrante(props) {
  let selectedItems = "";
  let usuarios = props.usuarios;
  let i = 0;

  let agregarIntegrante = function() {
    usuarios = [];
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].selected) {
        usuarios.push(selectedItems[i].value);
      }
    }

    Meteor.call("grupos.invitar", props.selectedGroup._id, usuarios);
    props.onHide();
  };

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
            onChange={e => (selectedItems = e.target.options)}
          >
            {usuarios.map(usuario => {
              i = i + 1;
              return <option key={i}>{usuario.username}</option>;
            })}
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="boton" onClick={agregarIntegrante}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarIntegrante;
