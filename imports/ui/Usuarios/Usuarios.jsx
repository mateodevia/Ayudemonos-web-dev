import React, { Component } from "react";
import "./Usuarios.css";
import PropTypes from "prop-types";

class Usuarios extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let i = 0;
        return (
            <div className="contenedorUsuarios row">
                {this.props.selectedGroup.usuarios.map(usuario => {
                    i = i + 1;
                    return (
                        <div key={i} className="formaUsuario">
                            <img
                                src="https://res.cloudinary.com/drfggfn8f/image/upload/v1571033128/gzvtcofjoxg4jrwg8kbt.svg"
                                className="iconoUsuario"
                            />
                            <h6 className="nombre">{usuario}</h6>
                        </div>
                    );
                })}
            </div>
        );
    }
}
Usuarios.propTypes = {
    selectedGroup: PropTypes.object
};

export default Usuarios;
