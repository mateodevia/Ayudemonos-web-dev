import React, { Component } from "react";
import "./Grupo.css";
import PropTypes from "prop-types";

class Grupo extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        if (this.props.grupo === this.props.selected) {
            return (
                <li>
                    <h5 className="tituloGrupoSelected">{this.props.grupo.nombre}</h5>
                </li>
            );
        } else {
            return (
            // eslint-disable-next-line react/prop-types
                <li onClick={() => this.props.handleSelected(this.props.grupo)}>
                    <h5 className="tituloGrupo">{this.props.grupo.nombre}</h5>
                </li>
            );
        }
    }
}
Grupo.propTypes = {
    selected: PropTypes.object,
    grupo: PropTypes.object
};

export default Grupo;
