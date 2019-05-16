import React from "react";
import ReactDOM from "react-dom";

import Switcher from "./components/switcher.js";
import Authenticate from "./components/auth/auth.js";
import "./styles.css";

class RenderPage extends React.PureComponent {
  state = {
    isLoggedIn: true
  };

  login = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  logout = () => {
    this.setState({
      isLoggedIn: false
    });
  };

  render() {
    switch (this.state.isLoggedIn) {
      case true:
        return <Switcher logout={this.logout} />;

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
