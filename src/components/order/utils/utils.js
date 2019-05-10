import React, { Component } from "react";

export class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qty: props.quantity
    };
  }

  render() {
    let imgStyle = {
      height: "5.5rem",
      width: "4.5rem",
      objectFit: "contain"
    };

    let { rate, currency } = this.props;

    return [
      <div key={1}>
        <hr
          className="uk-divider-icon"
          style={{ margin: 0, display: "block" }}
        />
      </div>,
      <div key={2} className="uk-flex">
        <img
          className="align-self-start uk-margin-small-right"
          src={this.props.product.image}
          alt="..."
          style={imgStyle}
        />
        <div className="">
          <span style={{ fontWeight: "500", fontSize: "0.85rem" }}>
            {this.props.product.name}
          </span>
          <div>
            {currency !== "ZAR" && ( //Defalut
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "rgb(150, 150, 150)"
                }}
              >
                USD {this.props.product.price.toFixed(2)}
                <small className="ml-2" style={{ color: "rgb(150, 150, 150)" }}>
                  ({currency} {(this.props.product.price * rate).toFixed(2)})
                </small>
              </span>
            )}
            {currency === "ZAR" && ( // For SA market
              <span
                style={{
                  fontSize: "1rem",
                  fontWeight: "500",
                  color: "rgb(150, 150, 150)"
                }}
              >
                {currency} {(this.props.product.price * rate).toFixed(2)}
                <small className="ml-2" style={{ color: "rgb(150, 150, 150)" }}>
                  (USD {this.props.product.price.toFixed(2)} )
                </small>
              </span>
            )}
            <br />
            <span className="">Quantity: {this.state.qty}</span>
          </div>
        </div>
      </div>
    ];
  }
}

export class OrderDetailsFooter extends React.Component {
  render() {
    let { rate, currency, subtotal, shipping } = this.props;

    return (
      <div className="">
        <hr />
        <div>
          <span>Sub total</span>
          {currency !== "ZAR" && ( // Default
            <span className="uk-float-right" style={{ fontWeight: "100" }}>
              USD {subtotal.toFixed(2)}
            </span>
          )}
          {currency === "ZAR" && ( // For SA market
            <span className="uk-float-right" style={{ fontWeight: "100" }}>
              {currency} {(subtotal * rate).toFixed(2)}
            </span>
          )}
          <br />
        </div>
        <div>
          <span>Shipping</span>
          {currency !== "ZAR" && ( // Default
            <span className="uk-float-right" style={{ fontWeight: "100" }}>
              USD {shipping.toFixed(2)}
            </span>
          )}
          {currency === "ZAR" && ( // For SA market
            <span className="uk-float-right" style={{ fontWeight: "100" }}>
              {currency} {(shipping * rate).toFixed(2)}
            </span>
          )}
          <br />
        </div>

        <hr className="my-1" />
        <div style={{ fontWeight: "500" }}>
          <span>Total</span>
          {currency !== "ZAR" && ( // Default
            <span className="uk-float-right uk-margin-small-left uk-margin-small-right">
              <b>USD {(subtotal + shipping).toFixed(2)}</b>
            </span>
          )}
          {currency !== "ZAR" && ( // Default
            <span className="d-block uk-float-right">
              ({currency} {((subtotal + shipping) * rate).toFixed(2)}){" "}
            </span>
          )}

          {currency === "ZAR" && ( // For SA market
            <span className="uk-float-right">
              <b>
                {currency} {((subtotal + shipping) * rate).toFixed(2)}
              </b>
            </span>
          )}
        </div>
      </div>
    );
  }
}
