import React, { Component } from "react";
import TareaAyuda from "../Tareas/TareaAyuda";

class AyudaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tareas: [
        {
          id: 1,
          nombre: "Acabar Moviles",
          descripcion: "Conectar todo con Felipe y busca bugs",
          responsables: ["Felipe", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "13/10/2019",
          porcentaje: 80,
          comentario: "Esta muy largo, no creo que alcance"
        },
        {
          id: 2,
          nombre: "Acabar Web",
          descripcion: "Hacer todo el front y comectarlo con el back",
          responsables: ["Leonel", "Mateo"],
          grupo: "Softwarify",
          fechaFin: "14/10/2019",
          porcentaje: 10,
          comentario: "No he podido trabajarle por estar haciendo moviles"
        }
      ]
    };
  }
  render() {
    return (
      <React.Fragment>
        <h2>Tareas que necesitan ayuda</h2>
        <ul className="noPadding">
          {this.state.tareas.map(tarea => (
            <TareaAyuda key={tarea.id} tarea={tarea} />
          ))}
        </ul>
      </React.Fragment>
    );
  }
}

export default AyudaList;
