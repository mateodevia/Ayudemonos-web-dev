import React, { Component } from "react";
import "./Usuario.css";

class Usuario extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="formaUsuario">
        <img
          src="https://res.cloudinary.com/drfggfn8f/image/upload/v1571025619/xfuskjv8nzkp64dmqivy.svg"
          className="iconoUsuario"
        />
      </div>
    );
  }
}

export default Usuario;
