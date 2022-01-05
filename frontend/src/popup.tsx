import * as React from "react";
import * as ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";

import App from "./App";

const $popup = document.getElementById("popup");
ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  $popup,
);
