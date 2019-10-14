import React from "react";
import "./ControlGrupo.css";
import ModalAgregarIntegrante from "../ModalAgregarIntegrante/ModalAgregarIntegrante";
import ModalAgregarTarea from "../ModalAgregarTarea/ModalAgregarTarea";
import Usuario from "../Usuario/Usuario";

function ControlGroup(props) {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  return (
    <React.Fragment>
      <Usuario />
      <button className="botonControl" onClick={() => setModalShow(true)}>
        Agregar Integrate
      </button>
      <button className="botonControl" onClick={() => setModalShow2(true)}>
        Agregar Tarea
      </button>
      <ModalAgregarIntegrante
        show={modalShow}
        selectedGroup={props.selectedGroup}
        onHide={() => setModalShow(false)}
        usuarios={props.usuarios}
      />
      <ModalAgregarTarea
        show={modalShow2}
        selectedGroup={props.selectedGroup}
        grupos={props.grupos}
        onHide={() => setModalShow2(false)}
      />
    </React.Fragment>
  );
}
export default ControlGroup;
