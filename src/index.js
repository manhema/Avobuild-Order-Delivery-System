import React from "react";
import ReactDOM from "react-dom";

import Switcher from "./components/switcher.js";
import Authenticate from "./components/auth/auth.js";
import "./styles.css";

class RenderPage extends React.PureComponent {
  state = {
    isLoggedIn: false,
    payload: null
  };

  login = async payload => {
    await this.setState({
      isLoggedIn: true,
      payload: payload
    });
  };

  logout = () => {
    this.setState({
      isLoggedIn: false,
      payload: null
    });
  };

  render() {
    switch (this.state.isLoggedIn) {
      case true:
        return <Switcher logout={this.logout} authed={this.state.payload} />;

      case false:
      default:
        return <Authenticate login={this.login} />;
    }
  }
}

function App() {
  return (
    <div className="App">
      <RenderPage />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
