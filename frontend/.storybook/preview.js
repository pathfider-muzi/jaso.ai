import globalStyles from "@/constants/styles/globalStyle";
import { makeStore } from "@/modules/store";
import { Global } from "@emotion/react";
import * as nextImage from "next/image";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: props => <img {...props} />
});

const queryClient = new QueryClient();
const store = makeStore();

export const decorators = [
  Story => {
    return (
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <Story />
          <div id="modal-root" />
        </QueryClientProvider>
      </ReduxProvider>
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
