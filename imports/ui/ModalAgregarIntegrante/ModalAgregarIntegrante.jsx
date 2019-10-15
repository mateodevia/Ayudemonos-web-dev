import React from "react";
import Modal from "react-bootstrap/Modal";
import "./ModalAgregarIntegrante.css";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

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
    // eslint-disable-next-line react/prop-types
    props.onHide();
  };

  const divProps = Object.assign({}, props);
  delete divProps.selectedGroup;

  return (
    <Modal
      {...divProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Agregar Integrante al Grupo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group" tabIndex="-1">
          <label>Escoja los usuarios que desea agregar al grupo</label>
          <select
            tabIndex="0"
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
        <button tabIndex="0" className="boton" onClick={agregarIntegrante}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
ModalAgregarIntegrante.propTypes = {
  usuarios: PropTypes.array,
  selectedGroup: PropTypes.object
};
export default ModalAgregarIntegrante;
