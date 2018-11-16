import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./pages/App.js";
import Rem from "./common/js/rem";
import { isInIOS, isInWechat } from "./common/js/utils";
import registerServiceWorker from "./registerServiceWorker";

if (isInIOS()) {
  document.body.classList.add("ios");
}

if (isInWechat()) {
  document.body.classList.add("wechat");
}

ReactDOM.render(
  <Rem vw='10'>
    <App />
  </Rem>,
  document.getElementById("root")
);
registerServiceWorker();
