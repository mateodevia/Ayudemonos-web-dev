import React, { Component } from "react";
import Grupo from "../Grupo/Grupo";
import "./GruposPantallaGrande.css";
import "./Grupos.css";
import { GruposBack } from "../../api/grupos.js";

class Grupos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="fijo escondido">
        <h3>Grupos</h3>
        <ul className="listaTitulos">
          {this.props.grupos.map(grupo => (
            <Grupo
              key={grupo._id}
              grupo={grupo}
              selected={this.props.selected}
              handleSelected={this.props.handleSelected}
            />
          ))}
        </ul>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input
            className="agregarGrupo"
            type="text"
            ref={nuevoGrupo => (this.nuevoGrupo = nuevoGrupo)}
            placeholder="+ Nuevo"
          />
        </form>
      </div>
    );
  }
  handleSubmit(event) {
    event.preventDefault();
    Meteor.call("grupos.crear", this.nuevoGrupo.value, Meteor.user().username);
    this.nuevoGrupo.value = "";
  }
}
export default Grupos;
