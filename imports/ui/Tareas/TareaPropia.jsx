import React, { Component } from "react";
import "./Tarea.css";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

class TareaPropia extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.prog.addEventListener("change", () => this.updateProgress());
  }

  componentDidUpdate() {
    if (this.prog.value !== this.props.tarea.porcentageDone) {
      this.prog.value = this.props.tarea.porcentageDone;
    }
  }

  updateProgress() {
    console.log("hola");
    Meteor.call(
      "tareas.marcarPorcentaje",
      this.props.tarea._id,
      this.prog.value
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
            data-target={"#collapseExample" + this.props.tarea._id}
            aria-expanded="false"
            aria-controls="collapseExample"
          >
            Mas Información
          </button>
          <div
            className="collapse"
            id={"collapseExample" + this.props.tarea._id}
          >
            <h6>Descripción</h6>
            <p className="card-text">{this.props.tarea.description}</p>
            <h6>Fecha Limite</h6>
            <p className="card-text">{fecha}</p>
            <h6>Progreso {this.props.tarea.porcentageDone}%</h6>
            <input
              className="sliderProgreso"
              type="range"
              defaultValue={this.props.tarea.porcentageDone}
              ref={prog => (this.prog = prog)}
              onChange={console.log()}
            />
            <div className="botonAyuda">
              <button className="boton m-1" onClick={() => this.pedirAyuda()}>
                Pedir Ayuda
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /**
  handleChange() {
    this.setState({ porcentaje: this.prog.value });
  }
  */
  pedirAyuda() {
    Meteor.call("tareas.pedirAyuda", this.props.tarea._id);
  }
}

TareaPropia.propTypes = {
  tarea: PropTypes.object
};

export default TareaPropia;
