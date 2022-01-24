import globalStyles from "@/constants/styles/globalStyle";
import wrapper from "@/modules/store";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Global styles={globalStyles} />
        <NextNProgress height={10} showOnShallow={true} options={{ easing: "ease", speed: 500 }} />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
};

export default wrapper.withRedux(App);
