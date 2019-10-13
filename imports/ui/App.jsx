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

  componentDidUpdate() {
    if (this.state.selected === "") {
      this.setState({ selected: this.props.grupos[0] });
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row">
            {this.state.menuOpen && (
              <React.Fragment>
                <div className="col-5 col-sm-3 col-md-3 navBarGrupos noPadding">
                  <GruposEscondido
                    selected={this.state.selected}
                    grupos={this.props.grupos}
                    handleSelected={this.handleSelected}
                  />
                </div>
                <div className="col-7 col-sm-9 col-md-9 noPadding">
                  <NavBar hamburgerClick={this.hamburgerClick} />
                  <ControlGrupo selectedGroup={this.props.grupos} />
                  <AyudaList />
                  <MisTareas />
                </div>
              </React.Fragment>
            )}
            {!this.state.menuOpen && (
              <React.Fragment>
                <div className="col-0 col-sm-3 col-md-3 navBarGrupos noPadding">
                  <Grupos
                    selected={this.state.selected}
                    grupos={this.props.grupos}
                    handleSelected={this.handleSelected}
                  />
                </div>
                <div className="col-12 col-sm-9 col-md-9 noPadding">
                  <NavBar hamburgerClick={this.hamburgerClick} />
                  <ControlGrupo selectedGroup={this.state.selected} />
                  <AyudaList />
                  <MisTareas />
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
    tareas: Tareas.find({}, { sort: { createdAt: -1 } }).fetch(),
    grupos: GruposBack.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user()
  };
})(App);
