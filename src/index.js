import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./pages/App.js";
import ctrip from "@ctrip/easy";
import { NestRem } from "@ctrip/nest";
import registerServiceWorker from "./registerServiceWorker";

if (ctrip.isInIOS()) {
  document.body.classList.add("ios");
}

if (ctrip.isInWechat()) {
  document.body.classList.add("wechat");
}

ctrip.ready(() => {
  render(
    <NestRem vw="10" pixel>
      <App />
    </NestRem>,
    document.getElementById("root")
  );
});

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
