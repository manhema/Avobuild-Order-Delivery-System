import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Orders from "./components/orders/orders.js";
import Order from "./components/order/order.js";

class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "orders",
      payload: null
    };
  }

  view(type, payload) {
    // alert(type);
    this.setState({
      view: type,
      payload: payload
    });
  }
  render() {
    switch (this.state.view) {
      case "orders":
        return <Orders view={(type, payload) => this.view(type, payload)} />;
      case "order":
        return (
          <Order
            view={(type, payload) => this.view(type, payload)}
            order={this.state.payload}
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
