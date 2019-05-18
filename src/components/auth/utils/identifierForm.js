import React, { PureComponent } from "react";
import axios from "axios";

const uri =
  "https://order-delivery-rest-api-micro-service-lznirj4v3q-uc.a.run.app";
const authUser = async params => {
  return await axios
    .post(`${uri}/authenticate/login`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export default class Identifier extends PureComponent {
  state = {
    error: false,
    loading: false,
    identity: ""
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value
    });
  };

  onSave = async e => {
    e.preventDefault();
    if (this.state.identity.length > 0) {
      this.setState({ loading: true, error: false });
      try {
        let result = await authUser({ identifier: this.state.identity });
        if (result.success) {
          this.setState({ loading: false, error: false });
          console.log(result);
          this.props.viewPin(true, result.auth);
        } else {
          this.setState({ loading: false, error: true });
        }
      } catch (err) {
        console.log(err);
        this.setState({ loading: false, error: true });
      }
      // setTimeout(() => {
      //   this.setState({ loading: false, error: false });
      //   this.props.viewPin(true);
      // }, 2500);
    }
  };

  render() {
    let { error, loading } = this.state;

    return (
      <form
        className="uk-margin-left uk-margin-right uk-margin-top"
        onSubmit={this.onSave}
      >
        <small>
          Enter Your Avobuild Phone no. or Email
          <br />
          e.g +263********* or ****@domain.com
        </small>
        <div>
          <input
            name="identity"
            className="uk-input uk-width-1-3@s uk-width-1-1 "
            type="text"
            placeholder="Phone no. or email *"
            value={this.state.identity}
            onChange={this.handleInputChange}
          />

          {this.state.error && (
            <div>
              <small style={{ color: "#ed1c24", width: "100%" }}>
                Couldn't find your Avobuild Account
              </small>
            </div>
          )}
          <div className="uk-margin-top">
            {!loading && (
              <button className="uk-button uk-button-secondary uk-form-width-medium  uk-width-1-3@s uk-width-1-1">
                Next
              </button>
            )}
            {loading && (
              <button className="uk-button uk-button-secondary uk-form-width-medium  uk-width-1-3@s uk-width-1-1">
                <div data-uk-spinner="" />
              </button>
            )}
          </div>
        </div>
      </form>
    );
  }
}
