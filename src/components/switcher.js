import React, { Component } from "react";
import axios from "axios";
import QrReader from "react-qr-reader";
import UIkit from "uikit";

import { MainNav, BackNav } from "./nav/nav.js";

import Orders from "./orders/orders.js";
import Order, { CollectOrder } from "./order/order.js";
import { ordersData, tradesAnalytics, tradesData } from "./datastore.js";

const uri =
  "https://order-delivery-rest-api-micro-service-lznirj4v3q-uc.a.run.app";

class Test extends Component {
  state = {
    result: "No result"
  };

  handleScan = data => {
    if (data) {
      data = JSON.parse(data);
      let { type, orderId, userId } = data;
      if (type === "collection") {
        this.props.scanned(orderId, userId);
      }
    }
  };

  handleError = err => {
    console.error(err);
  };
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
          facingMode={"environment"}
        />
        <div className="uk-container uk-margin">
          <button
            className="uk-button uk-button-danger uk-width-1-1 "
            onClick={(type, payload) => this.props.view("orders", null)}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

function Spinner(props) {
  let message = "fetching orders";
  switch (props.type) {
    case "update":
      message = "updating order";
      break;
    case "scan":
      message = "fetching scanned order";
      break;
    case "order":
      message = "fetching order";
      break;
    case "orders":
    default:
      message = "fetching orders";
  }
  // let message = props.type === "orders" ? "fetching orders" : " updating order";
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
  return await axios
    .get(`${uri}/orders`)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw Object({ success: false, message: error.response });
    });
};

const recordDelivery = async params => {
  return await axios
    .post(`${uri}/orders/delivery`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

const morckRecordDelivery = async params => {
  return new Promise(resolve => setTimeout(resolve, 2000));
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
    this.mockFetch();
  }

  mockFetch() {
    this.setState({
      orders: ordersData,
      view: "orders",
      loader: ""
    });
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

  // Fetch scanned order
  async scanned(orderId, ownerId) {
    this.setState({
      view: "loading",
      loader: "scan"
    });

    var payload = ordersData.find(obj => {
      return obj._id === orderId;
    });

    setTimeout(() => {
      console.log("scanned");
      this.setState({
        view: "collection",
        loader: "update",
        payload: payload
      });
    }, 2000);
  }

  // Scanned order is to be Marked as collected for delivery
  collect(params) {
    let { orders, payload } = this.state;
    this.setState({
      view: "loading",
      loader: "update"
    });
    setTimeout(() => {
      this.setState({
        view: "orders",
        loader: "",
        orders: [...orders, payload]
      });
      UIkit.notification({
        message: "<small>Order added to orders for delivery.</small>",
        pos: "bottom-right",
        timeout: 3500
      });
    }, 2000);
  }

  async update(params) {
    let { id } = params;
    await this.setState({
      view: "loading",
      loader: "update"
    });
    try {
      // await recordDelivery(params);
      await morckRecordDelivery(params);
      console.log("done waiting");
      const filteredOrders = this.state.orders.filter(function(order) {
        return order._id !== id;
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
          UIkit.notification({
            message: "<small>Order has been delivered to receipient.</small>",
            pos: "bottom-right",
            timeout: 3500
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

      case "order":
        return [
          <BackNav
            key={0}
            page={"orders"}
            view={(type, payload) => this.view(type, payload)}
          />,
          <Order
            key={1}
            view={(type, payload) => this.view(type, payload)}
            order={this.state.payload}
            update={params => this.update(params)}
          />
        ];

      case "collection":
        return [
          <BackNav
            key={0}
            page={"scan"}
            view={(type, payload) => this.view(type, payload)}
          />,
          <CollectOrder
            key={1}
            view={(type, payload) => this.view(type, payload)}
            order={this.state.payload}
            collect={params => this.collect(params)}
          />
        ];

      case "scan":
        return [
          <BackNav
            key={0}
            page={"orders"}
            view={(type, payload) => this.view(type, payload)}
          />,
          <Test
            key={1}
            view={(type, payload) => this.view(type, payload)}
            scanned={(orderId, ownerId) => this.scanned(orderId, ownerId)}
          />
        ];

      case "orders":
      default:
        return [
          <MainNav
            key={0}
            view={(type, payload) => this.view(type, payload)}
          />,

          <Orders
            key={1}
            orders={this.state.orders}
            view={(type, payload) => this.view(type, payload)}
            sync={() => this.sync()}
          />
        ];
    }
  }
}
