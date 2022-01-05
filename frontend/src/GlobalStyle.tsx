import * as React from "react";
import { Global, css } from "@emotion/react";

const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        * {
          box-sizing: border-box;
        }
      `}
    />
  );
};

export default GlobalStyle;
