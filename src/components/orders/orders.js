import React from "react";

import {
  OrderTop,
  OrderValue,
  OrderInfo,
  OrderExp,
  NoOrders,
  ViewOrder
} from "./utils/utils.js";

function Order(props) {
  let order = props.order;
  let { cash, rate, currency, paid } = order;

  let subtotal = 0;
  let shipping = 8;
  // Calculate Totals
  order.products.map(function(product, i) {
    subtotal += product.quantity * product.price;
    return null;
  });

  if (subtotal >= 70) shipping = 0;

  let flag =
    currency === "ZAR"
      ? "https://s3.us-east-2.amazonaws.com/avobuild/logos/sa-flag.png"
      : "https://s3.us-east-2.amazonaws.com/avobuild/logos/flag-round-250.png";

  return (
    <div className="uk-card uk-card-default uk-card-body uk-margin-small-bottom uk-padding-small">
      <OrderExp order={order} flag={flag} />
      <OrderTop cash={cash} flag={flag} paid={paid} />
      <OrderValue
        currency={currency}
        rate={rate}
        subtotal={subtotal}
        shipping={shipping}
      />
      <OrderInfo order={order} />

      <ViewOrder order={order} view={props.view} />
    </div>
  );
}

function OrdersHeader() {
  return (
    <div
      className="uk-grid-small uk-child-width-1-1@s uk-grid-match uk-text-center"
      style={{ margin: "0.5rem", padding: "0.5rem" }}
      data-uk-grid
    >
      <div className="uk-card uk-card-default uk-card-hover uk-card-body uk-padding-small">
        <h3 className="uk-card-title uk-margin-remove">
          Orders to deliver <span data-uk-icon="cart" />
        </h3>
        <p>Orders be delivered to receipients.</p>
      </div>
    </div>
  );
}

export default function Orders(props) {
  const orders = props.orders.map((order, i) => (
    <Order
      key={i}
      order={order}
      view={props.view}
      manage={props.manage}
      isManaged={props.isManaged}
    />
  ));

  return [
    <OrdersHeader key={0} />,
    orders.length === 0 && (
      <NoOrders key={1} sync={props.sync} view={props.view} />
    ),
    <div
      className="uk-grid-small uk-child-width-1-2@s uk-child-width-1-3@m"
      data-uk-grid
      key={2}
      style={{ margin: "0.5rem", padding: "0.5rem" }}
    >
      {orders}
    </div>
  ];
}
