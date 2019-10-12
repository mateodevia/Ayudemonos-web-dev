import React, { Component } from "react";
import "./Navbar.css";

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <nav className="navNav">
        <ul className="ulNav">
          <button className="hamburger" onClick={this.handleClick}>
            ☰
          </button>
          <h1 className="h1Nav">Ayudémonos!</h1>
        </ul>
      </nav>
    );
  }

  handleClick = () => {
    this.props.hamburgerClick();
  };
}

export default NavBar;
