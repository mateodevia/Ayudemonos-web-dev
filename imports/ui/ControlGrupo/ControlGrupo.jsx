import React from "react";
import "./ControlGrupo.css";
import ModalAgregarIntegrante from "../ModalAgregarIntegrante/ModalAgregarIntegrante";
import ModalAgregarTarea from "../ModalAgregarTarea/ModalAgregarTarea";
import Usuarios from "../Usuarios/Usuarios";
import PropTypes from "prop-types";

function ControlGroup(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShow2, setModalShow2] = React.useState(false);
    return (
        <React.Fragment>
            <Usuarios selectedGroup={props.selectedGroup} />
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
ControlGroup.propTypes = {
    selectedGroup: PropTypes.object,
    usuarios: PropTypes.array,
    grupos: PropTypes.array
};
export default ControlGroup;
