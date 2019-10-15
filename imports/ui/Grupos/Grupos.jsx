import React, { Component } from "react";
import Grupo from "../Grupo/Grupo";
import "./GruposPantallaGrande.css";
import "./Grupos.css";
import { Meteor } from "meteor/meteor";
import PropTypes from "prop-types";

class Grupos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.vacio = "";
  }
  render() {
    if (!this.props.modalEncendido) {
      return (
        <div className="fijo escondido">
          <h3 tabIndex="0">Grupos</h3>
          <ul className="listaTitulos">
            {this.props.grupos.map(grupo => (
              <Grupo
                key={grupo._id}
                grupo={grupo}
                selected={this.props.selected}
                // eslint-disable-next-line react/prop-types
                handleSelected={this.props.handleSelected}
              />
            ))}
          </ul>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <label className="labelEscondido">
              {" "}
              Agregar grupo
              <input
                className="agregarGrupo"
                type="text"
                ref={nuevoGrupo => (this.nuevoGrupo = nuevoGrupo)}
                placeholder="+ Nuevo"
              />
            </label>
          </form>
        </div>
      );
    } else {
      return <div className="fijo"></div>;
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    Meteor.call("grupos.crear", this.nuevoGrupo.value, Meteor.user().username);
    this.nuevoGrupo.value = "";
  }
}
Grupos.propTypes = {
  selected: PropTypes.object,
  grupos: PropTypes.array
};
export default Grupos;
