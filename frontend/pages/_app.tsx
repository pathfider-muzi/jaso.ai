import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import globalStyles from "@/styles/globalStyle";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default App;
