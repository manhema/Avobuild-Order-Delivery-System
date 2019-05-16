import React, { Component } from "react";
import PinInput from "react-pin-input";

export default class App extends React.PureComponent {
  state = {
    error: false,
    value: ""
  };

  onChange = value => {
    this.setState({ value });
  };

  onClear = () => {
    this.setState({
      error: false,
      value: ""
    });
    this.pin.clear();
  };

  onComplete = (value, index) => {
    if (value === "54321") {
      this.props.login();
    } else {
      this.setState({
        error: true
      });
    }
    console.log(value);
  };

  render() {
    const { value } = this.state;
    return (
      <div className="uk-text-center" style={{ marginTop: "6.5rem" }}>
        <div>
          <img
            className=""
            src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
            alt="Avobuild logo"
            style={{ height: "10.5em", marginRight: "0.5rem" }}
          />
        </div>
        <small>
          Avobuild
          <br />
          Delivery & Collections System
        </small>
        <br />
        <br />

        <PinInput
          length={5}
          focus
          secret
          ref={p => (this.pin = p)}
          type="numeric"
          onChange={this.onChange}
          onComplete={(value, index) => this.onComplete(value, index)}
        />
        {/* <div>{value}</div> */}

        <button
          className="uk-button uk-button-danger uk-margin"
          onClick={this.onClear}
        >
          Clear
        </button>
        <br />
        {this.state.error && (
          <small style={{ color: "#ed1c24", width: "100%" }}>
            invalid username or pin code
          </small>
        )}
      </div>
    );
  }
}
