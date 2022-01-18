import globalStyles from "@/constants/styles/globalStyle";
import { rootReducer } from "@/modules";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools());

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Global styles={globalStyles} />
          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
