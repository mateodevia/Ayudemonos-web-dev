import React, { Component } from "react";
import TareaPropia from "../Tareas/TareaPropia";
import { Meteor } from "meteor/meteor";

class MisTareasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [
        {
          id: 3,
          nombre: "Acabar Moviles",
          descripcion: "Conectar todo con Felipe y busca bugs",
          responsables: ["Felipe", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "13/10/2019"
        },
        {
          id: 4,
          nombre: "Acabar Web",
          descripcion: "Hacer todo el front y comectarlo con el back",
          responsables: ["Leonel", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "14/10/2019"
        },
        {
          id: 5,
          nombre: "Acabar Moviles",
          descripcion: "Conectar todo con Felipe y busca bugs",
          responsables: ["Felipe", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "13/10/2019"
        },
        {
          id: 6,
          nombre: "Acabar Web",
          descripcion: "Hacer todo el front y comectarlo con el back",
          responsables: ["Leonel", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "14/10/2019"
        }
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <h2>Mis Tareas</h2>
        <ul className="noPadding">
          {this.props.tareasPropias.map(tarea => (
            <TareaPropia key={tarea._id} tarea={tarea} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}
export default MisTareasList;
