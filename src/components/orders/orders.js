import React, { Component } from "react";
import { MainNav } from "../nav/nav.js";

let data = [
  {
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
  },
  {
    _id: "4dc030d72958400c99b38ab0",
    paid: true,
    currency: "RTGS",
    rate: 4.5,
    cash: false,
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
  }
];

function Order(props) {
  let order = props.order;
  let { cash, rate, currency } = order;

  let subtotal = 0;
  let shipping = 8;
  let items = order.products.map(function(product, i) {
    subtotal += product.quantity * product.price;
    return null;
  });

  if (subtotal >= 80) shipping = 0;

  let flag =
    currency === "ZAR"
      ? "https://s3.us-east-2.amazonaws.com/avobuild/logos/sa-flag.png"
      : "https://s3.us-east-2.amazonaws.com/avobuild/logos/flag-round-250.png";

  return (
    <div
      className="uk-card uk-card-default uk-card-body uk-margin-small-bottom uk-padding-small"
      onClick={(type, payload) => props.view("order", order)}
      style={{ cursor: "pointer" }}
    >
      <div className="uk-margin-small-bottom">
        {cash && (
          <span
            className="uk-badge uk-margin-small-right"
            style={{ background: "#269a54" }}
          >
            Cash on delivery
          </span>
        )}
        {!cash && (
          <span className="uk-badge uk-margin-small-right">Paid online</span>
        )}
        <img
          className="uk-preserve-width uk-border-circle"
          src={flag}
          width="12"
          alt=""
        />

        <span
          className="uk-float-right"
          style={{ fontSize: "0.85rem", color: "#9a9a9a" }}
        >
          12 JAN 2019
        </span>
      </div>
      <div className="uk-text-center">
        {currency !== "ZAR" && ( // Default
          <span
            className="d-block"
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "#9a9a9a"
            }}
          >
            USD {(subtotal + shipping).toFixed(2)}
            <small className="ml-2" style={{ color: "rgb(150, 150, 150)" }}>
              (RTGS {((subtotal + shipping) * rate).toFixed(2)})
            </small>
          </span>
        )}
        {currency === "ZAR" && ( // For SA market
          <span
            className="d-block"
            style={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "#9a9a9a"
            }}
          >
            {currency} {((subtotal + shipping) * rate).toFixed(2)}
            <small className="ml-2" style={{ color: "rgb(150, 150, 150)" }}>
              (USD {(subtotal + shipping).toFixed(2)})
            </small>
          </span>
        )}
      </div>
      <div className="uk-text-center">
        {/* <img
					className="uk-preserve-width uk-border-circle uk-margin-small-right"
					src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
					width="30"
					alt=""
				/> */}
        <small>Order #{order._id}</small>
        <br />
        <small>
          <b>Order Owner: </b>
          {order.owner.name}, {order.owner.contact}
        </small>
        <br />
        <small>
          <b>Order Recepient: </b>
          {order.shipping.name}, {order.shipping.contact}
        </small>

        <p className="uk-text-center">
          <small>
            <b>Address</b>
          </small>
          <br />
          {order.address.street}, {order.address.suburb}
          <br />
          {order.address.city}
        </p>
      </div>
    </div>
  );
}

export default function Orders(props) {
  return [
    <MainNav key={0} />,
    <div
      className="uk-grid uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m"
      key={1}
      style={{ margin: "0.5rem", padding: "0.5rem" }}
    >
      <Order order={data[0]} view={props.view} />
      <Order order={data[1]} view={props.view} />
      <Order order={data[0]} view={props.view} />
      <Order order={data[1]} view={props.view} />
      <Order order={data[0]} view={props.view} />
      <Order order={data[1]} view={props.view} />
      <Order order={data[0]} view={props.view} />
      <Order order={data[1]} view={props.view} />
    </div>
  ];
}
