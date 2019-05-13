import React from "react";

export function MainNav(props) {
  return (
    <nav
      className="uk-navbar-container"
      data-uk-navbar="boundary-align: true; align: center;"
      data-uk-navbar="dropbar: false"
    >
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li>
            <a href="#">
              <img
                src="https://s3.us-east-2.amazonaws.com/avobuild/logos/favicon.png"
                alt="Avobuild logo"
                style={{ height: "3.5em", marginRight: "0.5rem" }}
              />
              Delivery System
            </a>
          </li>
        </ul>
      </div>

      <div className="uk-navbar-right">
        <ul className="uk-navbar-nav">
          <li>
            <a
              href="#"
              className="uk-padding-remove-left"
              onClick={(type, payload) => props.view("scan", null)}
            >
              SCAN CODE
            </a>
          </li>
          {/* <li>
            <a href="#" onClick={() => props.sync()}>
              Sync
            </a>
          </li> */}
          <li>
            <a href="#" className="uk-padding-remove-left">
              <img
                className="uk-border-circle"
                src="https://s3.us-east-2.amazonaws.com/avobuild/profile-5b2be48df62152462c99596d.jpeg"
                alt="Avobuild logo"
                style={{
                  height: "3.5em",
                  width: "3.5em",
                  maxWidth: "3.5rem",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
            </a>
            <div className="uk-navbar-dropdown">
              <ul className="uk-nav uk-navbar-dropdown-nav">
                <li className="uk-nav-header">Hi, Tino</li>
                <li className="uk-nav-divider" />
                <li>
                  <a href="#">
                    Logout{" "}
                    <span className="uk-float-right" data-uk-icon="sign-out" />
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export function BackNav({ view, page }) {
  return (
    <nav
      className="uk-navbar-container"
      uk-navbar="boundary-align: true; align: center;"
    >
      <div className="uk-navbar-left">
        <ul className="uk-navbar-nav">
          <li>
            <a href="#" onClick={(type, payload) => view(page, null)}>
              <span uk-icon="arrow-left" style={{ paddingLeft: "1rem" }} />
              Back
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
