import React, { Component } from "react";
import TareaPropia from "../Tareas/TareaPropia";
import PropTypes from "prop-types";

class MisTareasList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
MisTareasList.propTypes = {
    tareasPropias: PropTypes.array
};
export default MisTareasList;
