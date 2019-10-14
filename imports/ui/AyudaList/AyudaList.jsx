import React, { Component } from "react";
import TareaAyuda from "../Tareas/TareaAyuda";
import PropTypes from "prop-types";

class AyudaList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let i = 0;
        return (
            <React.Fragment>
                <h2>Tareas que necesitan ayuda</h2>
                <ul className="noPadding">
                    {this.props.tareasAyuda.map(tarea => {
                        i = i + 1;
                        return <TareaAyuda key={i} tarea={tarea} />;
                    })}
                </ul>
            </React.Fragment>
        );
    }
}

AyudaList.propTypes = {
    tareasAyuda: PropTypes.array
};

export default AyudaList;
