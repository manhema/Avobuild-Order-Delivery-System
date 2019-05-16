import React, { Component, PureComponent } from "react";

import IdentifierForm from "./utils/identifierForm.js";
import PINCodeForm from "./utils/pinCodeForm.js";

export default class Authenticate extends PureComponent {
  state = {
    pin: false,
    payload: null
  };

  async viewPin(status, payload) {
    await this.setState({
      pin: status,
      payload: payload
    });
  }

  render() {
    let { pin } = this.state;
    let page = null;
    switch (pin) {
      case true:
        page = (
          <PINCodeForm
            payload={this.state.payload}
            login={this.props.login}
            viewPin={(pin, payload) => this.viewPin(pin, payload)}
          />
        );
        break;

      case false:
        page = (
          <IdentifierForm
            viewPin={(pin, payload) => this.viewPin(pin, payload)}
          />
        );
        break;

      default:
        page = null;
        break;
    }
    return (
      <div className="uk-text-center" style={{ marginTop: "5.5rem" }}>
        <div>
          <img
            className=""
            src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
            alt="Avobuild logo"
            style={{ height: "10.5em", marginRight: "0.5rem" }}
          />
        </div>
        <small style={{ color: "#333" }}>Last Mile</small>
        <br />
        {page}
      </div>
    );
  }
}
