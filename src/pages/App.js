import React, { Component } from "react";
import "./App.scss";
import Iday from "./iday/index";
import Line from "./line/index";

class App extends Component {
  render() {
    return (
      <div>
        <Iday />
        <Line />
      </div>
    );
  }
}

export default App;
