import * as React from "react";
import * as ReactDOM from "react-dom";
import GlobalStyle from "./GlobalStyle";

import App from "./App";

const $root = document.getElementById("root");
ReactDOM.render(
  <>
    <GlobalStyle />
    <App />
  </>,
  $root
);
