import React from "react";
import "./ControlGrupo.css";
import ModalAgregarIntegrante from "../ModalAgregarIntegrante/ModalAgregarIntegrante";
import ModalAgregarTarea from "../ModalAgregarTarea/ModalAgregarTarea";

function ControlGroup() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  return (
    <React.Fragment>
      <button className="botonControl" onClick={() => setModalShow(true)}>
        Agregar Integrate
      </button>
      <button className="botonControl" onClick={() => setModalShow2(true)}>
        Agregar Tarea
      </button>
      <ModalAgregarIntegrante
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <ModalAgregarTarea
        show={modalShow2}
        onHide={() => setModalShow2(false)}
      />
    </React.Fragment>
  );
}

export default ControlGroup;
