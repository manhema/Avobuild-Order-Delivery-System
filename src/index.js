import React from "react";
import ReactDOM from "react-dom";

import Switcher from "./components/switcher.js";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <Switcher />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
