import React from "react";
import { OrderDetailsFooter, Item } from "./utils/utils.js";
import DeliveryForm from "./deliveryForm.js";
import {
  OrderTop,
  OrderValue,
  OrderInfo,
  OrderExp
} from "../orders/utils/utils.js";

export function CollectOrder(props) {
  let order = props.order;
  let { cash, rate, currency, paid } = order;

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
      <OrderExp order={order} flag={flag} />
      <OrderTop cash={cash} flag={flag} paid={paid} />
      <OrderValue
        currency={currency}
        rate={rate}
        subtotal={subtotal}
        shipping={shipping}
      />
      <OrderInfo order={order} />

      <div className="uk-margin-top">
        <button
          className="uk-button uk-button-secondary uk-width-1-1 uk-margin-bottom"
          onClick={params => props.collect({ orderId: order._id })}
        >
          Collect Order For Delivery
        </button>
        <button
          className="uk-button uk-button-danger uk-width-1-1 uk-margin-bottom"
          onClick={(type, payload) => props.view("scan", null)}
        >
          Cancel
        </button>
      </div>

      <div>
        <h6 className="uk-margin-small-bottom">
          <b>Order Details</b>
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

function Order(props) {
  let order = props.order;
  let { cash, rate, currency, paid } = order;

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
      <OrderExp order={order} flag={flag} />
      <OrderTop cash={cash} flag={flag} paid={paid} />
      <OrderValue
        currency={currency}
        rate={rate}
        subtotal={subtotal}
        shipping={shipping}
      />
      <OrderInfo order={order} />
      <DeliveryForm
        orderId={order._id}
        iso={currency === "ZAR" ? "+27" : "+263"}
        cash={cash}
        view={(type, payload) => props.view(type, payload)}
        update={params => props.update(params)}
      />
      <div>
        <h6 className="uk-margin-small-bottom">
          <b>Order Details</b>
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
    <div key={1} className="">
      <Order
        order={props.order}
        view={(type, payload) => props.view(type, payload)}
        update={params => props.update(params)}
      />
    </div>
  ];
}
