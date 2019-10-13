import React, { Component } from "react";
import "./Grupo.css";

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
        <li onClick={() => this.props.handleSelected(this.props.grupo)}>
          <h5 className="tituloGrupo">{this.props.grupo.nombre}</h5>
        </li>
      );
    }
  }
}

export default Grupo;
