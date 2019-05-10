import React, { Component } from "react";
import axios from "axios";

import Orders from "./orders/orders.js";
import Order from "./order/order.js";

function Spinner(props) {
  let message = props.type === "orders" ? "fetching orders" : " updating order";
  return (
    <div className="uk-text-center uk-margin-top">
      <div className="uk-spinner uk-margin-top" uk-spinner="ratio: 1.5" />
      <br />
      <br />
      <br />
      <small className="uk-margin-top">Please wait, {message}...</small>
    </div>
  );
}

const getOrders = async () => {
  // code here
  return await axios
    .get(`http://localhost:8080/orders`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw Object({ success: false, message: error.response });
    });
};

const recordDelivery = async params => {
  return await axios
    .post(`http://localhost:8080/orders/delivery`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

export default class Switcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "loading",
      loader: "orders",
      orders: [],
      payload: null
    };
  }

  async componentDidMount() {
    this.fetch();
  }

  async fetch() {
    try {
      this.setState(
        {
          orders: await getOrders()
        },
        () => {
          this.setState({
            view: "orders",
            loader: "delivered"
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  sync() {
    this.setState({
      view: "loading",
      loader: "orders"
    });
    this.fetch();
  }

  async update(params) {
    console.log(params);
    await this.setState({
      view: "loading",
      loader: "update"
    });
    try {
      await recordDelivery(params);
      const filteredOrders = this.state.orders.filter(function(order) {
        return order._id !== "5cc030d72958400c99b38aa0";
      });
      this.setState(
        {
          orders: filteredOrders
        },
        () => {
          this.setState({
            view: "orders",
            loader: "delivered"
          });
        }
      );
    } catch (err) {
      console.log(err.response);
    }
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
        return <Spinner type={this.state.loader} />;
      case "orders":
        return (
          <Orders
            orders={this.state.orders}
            view={(type, payload) => this.view(type, payload)}
            sync={() => this.sync()}
          />
        );
      case "order":
        return (
          <Order
            view={(type, payload) => this.view(type, payload)}
            order={this.state.payload}
            update={params => this.update(params)}
          />
        );
      default:
        return <Orders view={(type, payload) => this.view(type, payload)} />;
    }
  }
}
