import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App";
import Rem from "./common/js/rem";

ReactDOM.render(
  <Rem vw="10">
    <App />
  </Rem>,
  document.getElementById("root")
);
