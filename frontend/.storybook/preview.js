import globalStyles from "@/constants/styles/globalStyle";
import { Global } from "@emotion/react";
import * as nextImage from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: props => <img {...props} />
});

const queryClient = new QueryClient();

export const decorators = [
  Story => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <Story />
          <div id="modal-root" />
        </QueryClientProvider>
      </>
    );
  }
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  },
  layout: "centered"
};
