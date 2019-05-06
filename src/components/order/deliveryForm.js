import React, { Component } from "react";
import Select from "react-select";

import * as validator from "./utils/validator.js";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderRadius: 0
  }),
  control: (provided, state) => ({
    ...provided,
    borderRadius: 0
  })
};

let optionsISO = [
  { value: "+263", label: "+263" },
  { value: "+27", label: "+27" }
];

function DisplayError(props) {
  return <small style={{ color: "#ed1c24" }}>{props.message}</small>;
}

export default class DeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contact: "",
      iso: { value: "+263", label: "+263" },
      truce: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  isoChange(val) {
    this.setState({ iso: val });
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({
      [name]: value
    });
  }

  validate() {
    let phone =
      this.state.contact.charAt(0) === "0"
        ? this.state.contact.substr(1)
        : this.state.contact;
    phone = this.state.iso.value + phone;

    this.setState(
      {
        nameError: validator.name(this.state.name),
        contactError: validator.contact(phone),
        truceError: validator.truce(this.state.truce)
      },
      function() {
        if (
          !this.state.nameError &&
          !this.state.contactError &&
          !(this.props.cash ^ !this.state.truceError) // XOR
        ) {
          console.log("valid");
          this.props.view("loading", null);
          setTimeout(() => {
            this.props.view("orders", null);
          }, 3000);
        }
      }
    );
  }

  onSave(e) {
    e.preventDefault();
    this.validate();
  }

  render() {
    let { cash } = this.props;
    return (
      <form onSubmit={this.onSave.bind(this)}>
        <fieldset className="uk-fieldset">
          <legend className="uk-legend uk-text-center">
            Order received by
          </legend>

          <div className="uk-margin">
            <input
              className="uk-input"
              name="name"
              type="text"
              placeholder="Name *"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            {this.state.nameError && (
              <DisplayError message={this.state.nameError.message} />
            )}
          </div>

          <div className="uk-margin uk-grid uk-grid-small">
            <div className="uk-width-1-2">
              <Select
                name="form-field-name"
                //value="one"
                styles={customStyles}
                options={optionsISO}
                isClearable={false}
                isSearchable={false}
                placeholder="Country code *"
                value={this.state.iso}
                onChange={this.isoChange.bind(this)}
              />
            </div>
            <div className="uk-width-1-2">
              <input
                className="uk-input"
                name="contact"
                type="text"
                placeholder="Phone no. *"
                value={this.state.contact}
                onChange={this.handleInputChange}
              />
            </div>
            <div>
              {this.state.contactError && (
                <DisplayError message={this.state.contactError.message} />
              )}
            </div>
          </div>

          {cash && (
            <div className="uk-margin uk-grid-small uk-child-width-auto uk-grid">
              <label>
                <input
                  className="uk-checkbox uk-margin-small-right"
                  name="truce"
                  type="checkbox"
                  value={this.state.truce}
                  onChange={this.handleInputChange}
                />
                I have received money for this order from the recepient
              </label>
              {this.state.truceError && (
                <DisplayError message={this.state.truceError.message} />
              )}
            </div>
          )}

          <div className="uk-margin">
            <button className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom">
              Mark order as Delivered
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}
