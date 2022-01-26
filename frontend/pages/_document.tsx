import { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => {
  return (
    <Html>
      {/* <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" /> */}
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  );
};

export default MyDocument;
