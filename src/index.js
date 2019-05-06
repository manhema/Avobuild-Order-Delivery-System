import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Orders from "./components/orders/orders.js";
import Order from "./components/order/order.js";

let order_ = {
  _id: "5cc030d72958400c99b38aa0",
  paid: false,
  currency: "ZAR",
  rate: 14.2,
  cash: true,
  status: "ODRAP",
  address: {
    _id: "5cc02fcee251b00bde976bfe",
    street: "72 Gerald Spilken Street",
    complex: "",
    suburb: "Ikwezi",
    city: "Mthatha",
    placeId:
      "Ejk3MiBHZXJhbGQgU3BpbGtlbiBTdCwgSWt3ZXppLCBNdGhhdGhhLCA1MTAwLCBTb3V0aCBBZnJpY2EiMBIuChQKEglLXbQ8HdFfHhH7Pi1QqV5TxRBIKhQKEgkdRpV-GdFfHhGozyIzinJUcA",
    __typename: "address"
  },
  shipping: {
    name: "Tino Manhema",
    contact: "+263839480104",
    __typename: "shipping"
  },
  products: [
    {
      _id: "5cbf06178d56e669e8cba823",
      name: "AfriSam All Purpose Cement",
      price: 7.5,
      quantity: 6,
      image:
        "https://s3.us-east-2.amazonaws.com/avobuild/product-5b3a5477d4d0402b0646a1b2-1244639630.png",
      __typename: "orderProducts"
    },
    {
      _id: "5cbf4270af7e2e03087c1c45",
      name: "NPC Original Black - 50kg cement",
      price: 7,
      quantity: 1,
      image:
        "https://s3.us-east-2.amazonaws.com/avobuild/product-npc-original-black.png",
      __typename: "orderProducts"
    }
  ],
  owner: {
    name: "Tino Manhema",
    email: "teenomanhema@gmail.com",
    contact: "+278394801",
    __typename: "userless"
  },
  created: "Wed Apr 24 2019 09:48:07 GMT+0000 (Coordinated Universal Time)",
  __typename: "order"
};

function Spinner() {
  return (
    <div className="uk-text-center uk-margin-top">
      <div className="uk-spinner uk-margin-top" uk-spinner="ratio: 1.5" />
      <br />
      <br />
      <br />
      <small className="uk-margin-top">Please wait, updating order...</small>
    </div>
  );
}

class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "orders",
      payload: null
    };
  }

  view(type, payload) {
    this.setState({
      view: type,
      payload: payload
    });
  }
  render() {
    switch (this.state.view) {
      case "loading":
        return <Spinner />;
      case "orders":
        return <Orders view={(type, payload) => this.view(type, payload)} />;
      case "order":
        return (
          <Order
            view={(type, payload) => this.view(type, payload)}
            order={this.state.payload}
            // order={order_}
          />
        );
      default:
        return <Orders view={(type, payload) => this.view(type, payload)} />;
    }
  }
}

function App() {
  return (
    <div className="App">
      <Switcher />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
