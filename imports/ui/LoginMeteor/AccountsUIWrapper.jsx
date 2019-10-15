import React, { Component } from "react";
import { Template } from "meteor/templating";
import { Blaze } from "meteor/blaze";
import "./LoginMeteor.css";
import { Meteor } from "meteor/meteor";

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons, this.span);
  }
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  }
  simulateClick() {
    if (Meteor.user()) {
      console.log(this.span.childNodes[0].childNodes[4].childNodes[1].click());
      setTimeout(2000);
      console.log(
        this.span.childNodes[0].childNodes[4].children[1].children[0]
      );

      // console.log(this.span.childNodes[0].childNodes[4].childNodes[1].focus());

      // console.log(this.span.childNodes[0].childNodes);
      //console.log(this.span.childNodes[0]);
    } else {
      this.span.childNodes[0].childNodes[5].childNodes[3].click();
    }
  }
  render() {
    // Just render a placeholder container that will be filled in
    return (
      <span
        tabIndex="1"
        onKeyPress={this.simulateClick.bind(this)}
        className="login"
        ref={span => (this.span = span)}
      />
    );
  }
}
