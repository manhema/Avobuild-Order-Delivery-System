import React from "react";
import { BackNav } from "../nav/nav.js";
import { OrderDetailsFooter, Item } from "./utils/utils.js";
import DeliveryForm from "./deliveryForm.js";

function Order(props) {
  let order = props.order;
  let { cash, rate, currency } = order;

  let subtotal = 0;
  let shipping = 8;

  let items = order.products.map(function(product, i) {
    subtotal += product.quantity * product.price;
    return (
      <Item
        key={i}
        quantity={product.quantity}
        product={product}
        rate={rate}
        currency={currency}
      />
    );
  });

  if (subtotal >= 70) shipping = 0;

  let flag =
    currency === "ZAR"
      ? "https://s3.us-east-2.amazonaws.com/avobuild/logos/sa-flag.png"
      : "https://s3.us-east-2.amazonaws.com/avobuild/logos/flag-round-250.png";

  return (
    <div className="uk-card uk-card-default uk-card-body uk-clearfix">
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
      <DeliveryForm
        orderId={order._id}
        cash={cash}
        view={(type, payload) => props.view(type, payload)}
        update={params => props.update(params)}
      />
      <div>
        <h6 className="uk-margin-small-bottom">
          Order Details
          <span className="uk-float-right" uk-icon="chevron-down" />
        </h6>
        {items}
      </div>
      <div>
        <OrderDetailsFooter
          rate={order.rate}
          currency={order.currency}
          subtotal={subtotal}
          shipping={shipping}
          noheader={true}
        />
      </div>
    </div>
  );
}

export default function OrderComponent(props) {
  window.scrollTo(0, 0);

  return [
    <BackNav key={0} view={(type, payload) => props.view(type, payload)} />,
    <div key={1} className="">
      <Order
        order={props.order}
        view={(type, payload) => props.view(type, payload)}
        update={params => props.update(params)}
      />
    </div>
  ];
}
