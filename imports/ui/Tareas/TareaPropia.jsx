import React, { Component } from "react";
import "./Tarea.css";

class TareaPropia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      porcentaje: 0
    };
  }

  componentDidMount() {
    this.prog.addEventListener("change", () => this.updateProgress());
  }

  updateProgress() {
    Meteor.call(
      "tareas.marcarPorcentaje",
      this.props.tarea._id,
      this.state.porcentaje
    );
  }

  render() {
    let partes = this.props.tarea.dueDate.toString().split(" ");
    let fecha = partes[1] + " " + partes[2] + " " + partes[3];
    return (
      <div className="card tareaCard shadow-lg">
        <div className="card-body">
          <h5>{this.props.tarea.nombre}</h5>
          <div className="responsables">
            {this.props.tarea.currentOwners.map((responsable, index) => (
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
            <p className="card-text">{fecha}</p>
            <h6>Progreso {this.state.porcentaje}%</h6>
            <input
              className="sliderProgreso"
              type="range"
              value={this.state.porcentaje}
              ref={prog => (this.prog = prog)}
              onChange={this.handleChange.bind(this)}
            />
            <div className="botonAyuda">
              <button className="boton m-1" onClick={() => this.pedirAyuda}>
                Pedir Ayuda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleChange() {
    this.setState({ porcentaje: this.prog.value });
  }
  pedorAyuda() {
    //Meteor Call
  }
}

export default TareaPropia;
