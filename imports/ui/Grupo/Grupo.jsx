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
        <li tabIndex="0">
          <h4 className="tituloGrupoSelected" tabIndex="-1">
            {this.props.grupo.nombre}
          </h4>
        </li>
      );
    } else {
      return (
        // eslint-disable-next-line react/prop-types
        <li
          onKeyPress={() => this.props.handleSelected(this.props.grupo)}
          onClick={() => this.props.handleSelected(this.props.grupo)}
          tabIndex="0"
        >
          <h4 className="tituloGrupo" tabIndex="-1">
            {this.props.grupo.nombre}
          </h4>
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
