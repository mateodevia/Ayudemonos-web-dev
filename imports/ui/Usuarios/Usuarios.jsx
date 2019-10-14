import React, { Component } from "react";
import "./Usuarios.css";

class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="contenedorUsuarios row">
        {this.props.selectedGroup.usuarios.map(usuario => (
          <div className="formaUsuario">
            <img
              src="https://res.cloudinary.com/drfggfn8f/image/upload/v1571033128/gzvtcofjoxg4jrwg8kbt.svg"
              className="iconoUsuario"
            />
            <h6 className="nombre">{usuario}</h6>
          </div>
        ))}
      </div>
    );
  }
}

export default Usuarios;
