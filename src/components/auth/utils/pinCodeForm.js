import React, { PureComponent } from "react";
import PinInput from "react-pin-input";
import bcrypt from "bcryptjs";

export default class PINCodeFrom extends PureComponent {
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
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync("54321", salt);

    let valid = bcrypt.compareSync(value, hash);
    if (valid) {
      this.props.login(this.props.payload);
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
      <div className="uk-text-center uk-margin-top">
        <small>Enter Your Avobuild PIN</small>
        <PinInput
          length={5}
          focus
          secret
          ref={p => (this.pin = p)}
          type="numeric"
          onChange={this.onChange}
          onComplete={(value, index) => this.onComplete(value, index)}
        />
        <div>
          {this.state.error && (
            <small style={{ color: "#ed1c24", width: "100%" }}>
              invalid username or pin code
            </small>
          )}
        </div>
        <div>
          <p className="uk-margin-top">
            <button
              className="uk-button uk-button-secondary uk-button-small uk-margin-small-right"
              onClick={(pin, payload) => this.props.viewPin(false, null)}
            >
              Back
            </button>

            <button
              className="uk-button uk-button-danger uk-button-small uk-margin-small-left"
              onClick={this.onClear}
            >
              Clear
            </button>
          </p>
        </div>
      </div>
    );
  }
}
