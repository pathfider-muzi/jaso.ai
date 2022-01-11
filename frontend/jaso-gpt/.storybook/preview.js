import { Global } from "@emotion/react";
import * as nextImage from "next/image";
import globalStyles from "../styles/globalStyle";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});

export const decorators = [
  (Story) => (
    <>
      <Global styles={globalStyles} />
      <Story />
      <div id="modal-root" />
    </>
  ),
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "centered",
};
