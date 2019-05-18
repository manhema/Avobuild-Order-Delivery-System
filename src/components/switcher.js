import React, { Component } from "react";
import axios from "axios";
import QrReader from "react-qr-reader";
import CryptoJS from "crypto-js";

import UIkit from "uikit";

import { MainNav, BackNav } from "./nav/nav.js";

import Orders from "./orders/orders.js";
import Order, { CollectOrder } from "./order/order.js";
import { ordersData, tradesAnalytics, tradesData } from "./datastore.js";

const uri =
  "https://order-delivery-rest-api-micro-service-lznirj4v3q-uc.a.run.app";

// const uri = "http://localhost:8080";

class Test extends Component {
  state = {
    result: "No result"
  };

  handleScan = data => {
    let encryptedQRText = data;
    if (encryptedQRText) {
      // Decrypt
      var bytes = CryptoJS.AES.decrypt(
        encryptedQRText,
        "@ secret key 123 avobuild avospace 2016"
      );
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      let { type, orderId, userId } = decryptedData;
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

const getOrders = async args => {
  return await axios
    .get(`${uri}/orders`, {
      params: args
    })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw Object({ success: false, message: error.response });
    });
};

const getOrder = async args => {
  return await axios
    .get(`${uri}/order/scan`, {
      params: args
    })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

const recordDelivery = async params => {
  return await axios
    .post(`${uri}/order/deliver`, params)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      throw error;
    });
};

const recordCollection = async params => {
  return await axios
    .post(`${uri}/order/collect`, params)
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
    // await getOrder({
    //   id: "5cc030d72958400c99b38aa0",
    //   userId: "5b2be48df62152462c99596d"
    // });
    this.fetch();
    // this.mockFetch();
  }

  mockFetch() {
    setTimeout(() => {
      this.setState({
        orders: ordersData,
        view: "orders",
        loader: ""
      });
    }, 500);
  }

  async fetch() {
    try {
      this.setState(
        {
          orders: await getOrders({ partnerId: this.props.authed.tokenID })
        },
        () => {
          this.setState({
            view: "orders",
            loader: ""
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
    try {
      let order = await getOrder({ id: orderId, userId: ownerId });
      // var order = ordersData.find(obj => {
      //   return obj._id === orderId;
      // });
      this.setState({
        view: "collection",
        loader: "update",
        payload: order
      });
    } catch (err) {
      this.setState({
        view: "scan",
        loader: ""
      });
      UIkit.notification({
        message: "<small>This order has already be collected.</small>",
        pos: "bottom-right",
        timeout: 3500
      });
      console.log(err);
    }
  }

  // Scanned order is to be Marked as collected for delivery
  async collect(orderId) {
    let params = {
      id: orderId,
      partnerId: this.props.authed.tokenID
    };

    let { orders, payload } = this.state;
    this.setState({
      view: "loading",
      loader: "update"
    });

    try {
      // await recordDelivery(params);
      let result = await recordCollection(params);
      if (result.collected) {
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
      } else {
        this.setState({
          view: "collection",
          loader: ""
        });
        UIkit.notification({
          message: `<small>${result.message}.</small>`,
          pos: "bottom-right",
          timeout: 3500
        });
      }
    } catch (err) {
      this.setState({
        view: "collection",
        loader: ""
      });
    }
  }

  async deliver(args) {
    let { id, name, contact } = args;
    let params = {
      id: id,
      partnerId: this.props.authed.tokenID,
      name: name,
      contact: contact
    };

    await this.setState({
      view: "loading",
      loader: "update"
    });
    try {
      let result = await recordDelivery(params);
      if (result.delivered) {
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
      } else {
        this.setState({
          view: "order",
          loader: ""
        });
        UIkit.notification({
          message: `<small>${result.message}.</small>`,
          pos: "bottom-right",
          timeout: 3500
        });
      }
      // await morckRecordDelivery(params);
    } catch (err) {
      this.setState({
        view: "order",
        loader: ""
      });
      // console.log(err.response);
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
            update={params => this.deliver(params)}
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
            collect={orderId => this.collect(orderId)}
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
            logout={this.props.logout}
            authed={this.props.authed}
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
