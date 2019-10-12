import React, { Component } from "react";
import "./Tarea.css";

class TareaPropia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porcentaje: 0
    };
  }
  render() {
    return (
      <div className="card tareaCard shadow-lg">
        <div className="card-body">
          <h5>{this.props.tarea.nombre}</h5>
          <div className="responsables">
            {this.props.tarea.responsables.map((responsable, index) => (
              <span key={index}>{(index ? ", " : "") + responsable}</span>
            ))}
          </div>
          <button
            className="boton"
            type="button"
            data-toggle="collapse"
            data-target={"#collapseExample" + this.props.tarea.id}
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Mas Información
          </button>
          <div
            className="collapse"
            id={"collapseExample" + this.props.tarea.id}
          >
            <h6>Descripción</h6>
            <p className="card-text">{this.props.tarea.descripcion}</p>
            <h6>Fecha Limite</h6>
            <p className="card-text">{this.props.tarea.fechaFin}</p>
            <h6>Progreso {this.state.porcentaje}%</h6>
            <input
              className="sliderProgreso"
              type="range"
              value={this.state.porcentaje}
              ref={prog => (this.prog = prog)}
              onChange={this.handleChange.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
  handleChange() {
    this.setState({ porcentaje: this.prog.value });
  }
}

export default TareaPropia;
