import React from "react";

export function OrderTop({ cash, flag }) {
  return (
    <div className="uk-margin-small-bottom">
      {cash && (
        <span className="uk-label uk-label-success uk-margin-small-right">
          Cash on delivery
        </span>
      )}
      {!cash && (
        <span
          // className="uk-badge uk-margin-small-right"
          className="uk-label uk-label-primary uk-margin-small-right"
          // style={{ color: "#fff" }}
        >
          Paid online
        </span>
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
  );
}

export function OrderValue({ currency, rate, subtotal, shipping }) {
  return (
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
  );
}

export function OrderInfo({ order }) {
  return (
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
  );
}

function ProductSlider({ products }) {
  let imgStyle = {
    height: "4rem",
    width: "4.5rem",
    objectFit: "contain"
  };
  let items = products.map(function(product, i) {
    return (
      <li key={i}>
        <img src={product.image} alt="" style={imgStyle} />
      </li>
    );
  });
  return (
    <div
      className="uk-position-relative uk-visible-toggle uk-light"
      tabIndex="-1"
      data-uk-slider
      style={{ color: "#666" }}
    >
      <ul className="uk-slider-items uk-child-width-1-2 uk-child-width-1-3@s uk-child-width-1-4@m">
        {items}
      </ul>

      <a
        style={{ color: "#666", paddingLeft: "0", marginLeft: "0" }}
        uk-slidenav-previous=""
        className="uk-position-center-left uk-position-small uk-hidden-hover uk-slidenav-previous uk-icon uk-slidenav"
        href="#"
        data-uk-slidenav-previous
        data-uk-slider-item="previous"
      />
      <a
        style={{ color: "#666", paddingRight: "0", marginRight: "0" }}
        href="#"
        uk-slidenav-next=""
        className="uk-position-center-right uk-position-small uk-hidden-hover uk-slidenav-next uk-icon uk-slidenav"
        data-uk-slidenav-next
        data-uk-slider-item="next"
      />
    </div>
  );
}

export function OrderExp({ order, flag }) {
  let { paid } = order;
  return (
    <article className="uk-comment uk-margin-bottom">
      <header className="uk-comment-header uk-grid-medium uk-flex-middle uk-grid">
        <div className="uk-width-auto">
          <img
            className="uk-comment-avatar uk-border-circle"
            src={order.owner.image}
            style={{ height: "3.5em", width: "3.5rem", objectFit: "cover" }}
            alt=""
          />
        </div>
        <div className="uk-width-expand">
          <h4 className="uk-comment-title uk-margin-remove">
            <a className="uk-link-reset" href="#">
              {order.owner.name}
            </a>

            <img
              className="uk-float-right uk-preserve-width uk-border-circle"
              src={flag}
              width="12"
              alt=""
            />
          </h4>
          <ul className="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
            <li>
              {paid && (
                <span
                  className="uk-label uk-label-success"
                  style={{ color: "#fff" }}
                >
                  Paid
                </span>
              )}
              {!paid && (
                <span
                  className="uk-label uk-label-danger"
                  style={{ color: "#fff" }}
                >
                  Unpaid
                </span>
              )}
            </li>
          </ul>
        </div>
      </header>
      <div className="uk-comment-body">
        <ProductSlider products={order.products} />
      </div>
    </article>
  );
}

export function NoOrders(props) {
  return (
    <div className="uk-text-center uk-margin-top">
      <span uk-icon="refresh" height="35" />
      <br />
      <small className="uk-margin-top">
        <span role="img" aria-label="Sarcastic Emoji">
          🙄
        </span>
        No more orders to deliver for now,
        <br />
        scan qr code to collect new orders to deliver
      </small>
      <br />
      <br />
      <button
        className="uk-button uk-button-primary uk-button-small"
        onClick={(type, payload) => props.view("scan", null)}
      >
        SCAN CODE
      </button>
    </div>
  );
}

export function ViewOrder(props) {
  return (
    <button
      className="uk-button uk-button-primary uk-width-1-1 uk-margin-small-bottom"
      onClick={(type, payload) => props.view("order", props.order)}
    >
      Deliver Order
    </button>
  );
}
