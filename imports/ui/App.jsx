import React, { Component } from "react";
import AyudaList from "./AyudaList/AyudaList";
import MisTareas from "./MisTareasList/MisTareasList";
import Grupos from "./Grupos/Grupos";
import GruposEscondido from "./Grupos/GruposEscondido";
import NavBar from "./NavBar/NavBar";
import ControlGrupo from "./ControlGrupo/ControlGrupo";
import "./App.css";
import { Tareas } from "../api/tareas.js";
import { GruposBack } from "../api/grupos.js";
import { withTracker } from "meteor/react-meteor-data";
import PropTypes from "prop-types";
import { Meteor } from "meteor/meteor";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      selected: -1,
      modalEncendido: false
    };
  }
  /**
  componentDidMount() {
    for (i in this.props.tareasAyuda) {
      let tarea = this.props.tareasAyuda;
      let hoy = new Date();
      let diferencia = hoy - tarea.exp;
      let sePaso = diferencia > 0;
      if (sePaso && tarea.porcentageDone === 0) {
        Meteor.call("tareas.pedirAyuda", tarea._id);
      }
      console.log("monto y verifico");
    }
  }*/

  render() {
    let contenido = null;

    if (this.props.currentUser && this.state.selected !== -1) {
      contenido = (
        <React.Fragment>
          <div banner="main">
            <ControlGrupo
              selectedGroup={this.props.grupos[this.state.selected]}
              usuarios={this.props.usuarios}
              modalEncendido={this.state.modalEncendido}
              handlerModal={this.handlerModal.bind(this)}
            />
            <AyudaList
              tareasAyuda={this.props.tareasAyuda.filter(tarea => {
                return (
                  tarea.grupoId ===
                    this.props.grupos[this.state.selected]._id && tarea.delayed
                );
              })}
            />
            <MisTareas
              tareasPropias={this.props.tareasPropias.filter(tarea => {
                let encontro = false;
                for (let i = 0; i < tarea.currentOwners.length; i++) {
                  if (Meteor.user() != null) {
                    if (tarea.currentOwners[i] === Meteor.user().username) {
                      encontro = true;
                    }
                  }
                }
                return (
                  tarea.grupoId ===
                    this.props.grupos[this.state.selected]._id &&
                  encontro &&
                  !tarea.delayed
                );
              })}
            />
          </div>
        </React.Fragment>
      );
    } else if (this.props.currentUser && this.state.selected === -1) {
      contenido = (
        <React.Fragment>
          <div className="mensaje">
            <h2 className="bienvenido">
              ¡Bienvenido {this.props.currentUser.username}!
            </h2>
            <h3 className="mensajeBienvenida">
              Escoge o crea un grupo para empezar a ayudar
            </h3>
          </div>
        </React.Fragment>
      );
    } else if (!this.props.currentUser) {
      contenido = (
        <React.Fragment>
          <div className="mensaje">
            <h2 className="bienvenido">¡Bienvenido!</h2>
            <h3 className="mensajeBienvenida">
              Por favor inicia sesion para empezar a ayudar
            </h3>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            {this.state.menuOpen && (
              <React.Fragment>
                <div className="col-5 col-sm-3 col-md-3 noPadding">
                  <GruposEscondido
                    selected={this.props.grupos[this.state.selected]}
                    modalEncendido={this.state.modalEncendido}
                    handlerModal={this.handlerModal.bind(this)}
                    grupos={this.props.grupos.filter(grupo => {
                      let encontrado = false;
                      for (let i = 0; i < grupo.usuarios.length; i++) {
                        if (grupo.usuarios[i] === Meteor.user().username) {
                          encontrado = true;
                        }
                      }
                      return encontrado;
                    })}
                    handleSelected={this.handleSelected}
                  />
                </div>
                <div className="col-7 col-sm-9 col-md-9 noPadding">
                  <NavBar
                    hamburgerClick={this.hamburgerClick.bind(this)}
                    modalEncendido={this.state.modalEncendido}
                  />
                  {contenido}
                </div>
              </React.Fragment>
            )}
            {!this.state.menuOpen && (
              <React.Fragment>
                <div className="col-0 col-sm-3 col-md-3 navBarGrupos noPadding">
                  <Grupos
                    user={this.props.currentUser}
                    modalEncendido={this.state.modalEncendido}
                    handlerModal={this.handlerModal.bind(this)}
                    selected={this.props.grupos[this.state.selected]}
                    grupos={this.props.grupos.filter(grupo => {
                      let encontrado = false;
                      for (let i = 0; i < grupo.usuarios.length; i++) {
                        if (grupo.usuarios[i] === Meteor.user().username) {
                          encontrado = true;
                        }
                      }
                      return encontrado;
                    })}
                    handleSelected={this.handleSelected.bind(this)}
                  />
                </div>
                <div className="col-12 col-sm-9 col-md-9 noPadding">
                  <NavBar
                    hamburgerClick={this.hamburgerClick.bind(this)}
                    modalEncendido={this.state.modalEncendido}
                  />
                  {contenido}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  hamburgerClick() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }
  handleSelected(grupo) {
    let newSelected = this.props.grupos.findIndex(x => x._id === grupo._id);
    this.setState({ selected: newSelected });
  }
  handlerModal() {
    this.setState({ modalEncendido: !this.state.modalEncendido });
  }
}
App.propTypes = {
  currentUser: PropTypes.object,
  usuarios: PropTypes.array,
  grupos: PropTypes.array,
  tareasAyuda: PropTypes.array,
  tareasPropias: PropTypes.array
};
export default withTracker(() => {
  
  //La aplicacion Client-side tiene acceso a la informacion de todas las tareas, todos los grupos y
  // todos los usuarios. Esto podria convertirse en un fallo de privacidad y seguridad.
  Meteor.subscribe("tareas");
  Meteor.subscribe("grupos");

  Meteor.subscribe("users");
  return {
    currentUser: Meteor.user(),
    usuarios: Meteor.users.find({}).fetch(),
    // TODO: hacer que solo salgan los grupos del current user
    grupos: GruposBack.find({}, { sort: { createdAt: -1 } }).fetch(),
    tareasAyuda: Tareas.find({}, { sort: { createdAt: -1 } }).fetch(),
    tareasPropias: Tareas.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(App);
