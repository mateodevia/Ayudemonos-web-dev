import React from "react";
import Modal from "react-bootstrap/Modal";
function ModalAgregarTarea(props) {
  let usuarios = props.selectedGroup.usuarios;
  let i = 0;
  return (
    <Modal
      {...props}
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
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Escriba el nombre de la tarea"
            ></input>
          </div>
          <div className="form-group">
            <label>Descripcion</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Escriba en que consiste la tarea"
            ></textarea>
          </div>
          <div className="form-group">
            <label>Fecha Limite</label>
            <input
              type="text"
              className="form-control"
              placeholder="dd/mm/aa"
            ></input>
          </div>
          <div className="form-group">
            <label>Escoja los usuarios que son responables de esta tarea</label>
            <select multiple className="form-control">
              {usuarios.map(usuario => {
                i = i + 1;
                return <option key={i}>{usuario}</option>;
              })}
            </select>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <button className="boton" onClick={props.onHide}>
          Agregar
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalAgregarTarea;
