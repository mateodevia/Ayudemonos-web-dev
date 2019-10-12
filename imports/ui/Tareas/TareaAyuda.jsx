import React, { Component } from "react";
import "./Tarea.css";
import "./TareaAyuda.css";

class TareaAyuda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porcentaje: 0
    };
  }
  render() {
    return (
      <div className="card tareaCard shadow-lg fondoAzul">
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
            <h6>Comentario</h6>
            <p className="card-text">{this.props.tarea.comentario}</p>
            <h6>Progreso {this.props.tarea.porcentaje}%</h6>
            <input
              className="sliderProgreso"
              type="range"
              disabled={true}
              value={this.props.tarea.porcentaje}
              ref={prog => (this.prog = prog)}
            />
            <div className="botonesAceptarColaborar">
              <button className="boton m-1">Aceptar Tarea</button>
              <button className="boton m-2">Colaborar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TareaAyuda;
