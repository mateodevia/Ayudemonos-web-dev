import React from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

function ModalAgregarTarea(props) {
  let usuarios = props.selectedGroup.usuarios;
  let i = 0;
  let nombre = "";
  let descripcion = "";
  let fecha = "";
  let selectedItems = "";

  let agregarTarea = function() {
    usuarios = [];
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].selected) {
        usuarios.push(selectedItems[i].value);
      }
    }

    let partes = fecha.split("/");
    if (partes.length !== 3) {
      alert("La fecha ingresada no es valida");
      return;
    }
    let dia = partes[0];
    let mes = partes[1];
    let año = partes[2];

    Meteor.call(
      "tareas.insert",
      nombre,
      descripcion,
      props.selectedGroup._id,
      dia,
      mes,
      año,
      usuarios
    );
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
        <Modal.Title id="contained-modal-title-vcenter">
          Agregar Tarea
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group" tabIndex="-1">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Escriba el nombre de la tarea"
              onChange={e => (nombre = e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label>Descripcion</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Escriba en que consiste la tarea"
              onChange={e => (descripcion = e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Fecha Limite</label>
            <input
              type="text"
              className="form-control"
              placeholder="dd/mm/aaaa"
              onChange={e => (fecha = e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label>Escoja los usuarios que son responables de esta tarea</label>
            <select
              multiple
              className="form-control"
              onChange={e => (selectedItems = e.target.options)}
            >
              {usuarios.map(usuario => {
                i = i + 1;
                return <option key={i}>{usuario}</option>;
              })}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button tabIndex="0" className="boton" onClick={agregarTarea}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}
ModalAgregarTarea.propTypes = {
  usuarios: PropTypes.object,
  selectedGroup: PropTypes.object,
  date: PropTypes.object
};

export default ModalAgregarTarea;
