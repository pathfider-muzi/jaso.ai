import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import globalStyles from "../styles/globalStyle";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
