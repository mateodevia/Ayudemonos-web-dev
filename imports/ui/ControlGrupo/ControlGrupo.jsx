import React, { Component } from "react";
import "./ControlGrupo.css";

class ControlGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <button className="botonControl">Agregar Integrate</button>
        <button className="botonControl">Agregar Tera</button>
      </React.Fragment>
    );
  }
}

export default ControlGroup;
