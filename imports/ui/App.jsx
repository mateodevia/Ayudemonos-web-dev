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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuOpen: false,
      selected: ""
    };
  }

  render() {
    let contenido = null;

    if (this.props.currentUser && this.state.selected !== "") {
      contenido = (
        <React.Fragment>
          <ControlGrupo selectedGroup={this.props.grupos} />
          <AyudaList />
          <MisTareas />
        </React.Fragment>
      );
    } else if (this.props.currentUser && this.state.selected === "") {
      contenido = (
        <React.Fragment>
          <div className="mensaje">
            <h2 className="bienvenido">
              ¡Bienvenido {this.props.currentUser.username}!
            </h2>
            <h3>Escoge o crea un grupo para empezar a ayudar</h3>
          </div>
        </React.Fragment>
      );
    } else if (!this.props.currentUser) {
      contenido = (
        <React.Fragment>
          <div className="mensaje">
            <h2 className="bienvenido">¡Bienvenido!</h2>
            <h3>Por favor inicia sesion para empezar a ayudar</h3>
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
                    selected={this.state.selected}
                    grupos={this.props.grupos}
                    handleSelected={this.handleSelected}
                  />
                </div>
                <div className="col-7 col-sm-9 col-md-9 noPadding">
                  <NavBar hamburgerClick={this.hamburgerClick} />
                  {contenido}
                </div>
              </React.Fragment>
            )}
            {!this.state.menuOpen && (
              <React.Fragment>
                <div className="col-0 col-sm-3 col-md-3 navBarGrupos noPadding">
                  <Grupos
                    user={this.props.currentUser}
                    selected={this.state.selected}
                    grupos={this.props.grupos}
                    handleSelected={this.handleSelected}
                  />
                </div>
                <div className="col-12 col-sm-9 col-md-9 noPadding">
                  <NavBar hamburgerClick={this.hamburgerClick} />
                  {contenido}
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }

  hamburgerClick = () => {
    this.setState({ menuOpen: !this.state.menuOpen });
  };
  handleSelected = grupo => {
    this.setState({ selected: grupo });
  };
}
export default withTracker(() => {
  Meteor.subscribe("tareas");
  Meteor.subscribe("grupos");
  return {
    currentUser: Meteor.user(),
    // TODO: hacer que solo salgan los grupos del current user
    grupos: GruposBack.find({}, { sort: { createdAt: -1 } }).fetch(),
    tareas: Tareas.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(App);
