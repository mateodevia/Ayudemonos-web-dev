import React, { Component } from "react";
import Grupo from "../Grupo/Grupo";
import "./Grupos.css";

class GruposEscondido extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="fijo">
        <h3>Grupos</h3>
        <ul className="listaTitulos">
          {this.props.grupos.map(grupo => (
            <Grupo
              key={grupo.id}
              grupo={grupo}
              selected={this.props.selected}
              handleSelected={this.props.handleSelected}
            />
          ))}
        </ul>
        <form>
          <input
            className="agregarGrupo"
            type="text"
            ref="textInput"
            placeholder="+ Nuevo"
          />
        </form>
      </div>
    );
  }
}

export default GruposEscondido;
