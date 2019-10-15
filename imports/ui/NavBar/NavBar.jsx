import React, { Component } from "react";
import "./Navbar.css";
import AccountsUIWrapper from "../LoginMeteor/AccountsUIWrapper";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="divNav shadow" tabIndex="-1">
        {!this.props.modalEncendido && (
          <button
            className="hamburger"
            tabIndex="-1"
            monClick={this.handleClick}
          >
            ☰
          </button>
        )}
        <h1 className="h1Nav">Ayudémonos!</h1>
        <AccountsUIWrapper />
      </div>
    );
  }

  handleClick() {
    // eslint-disable-next-line react/prop-types
    this.props.hamburgerClick();
  }
}

export default NavBar;
