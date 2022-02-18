import globalStyles from "@/constants/styles/globalStyle";
import wrapper from "@/modules/store";
import * as gtag from "@/utils/gtag";
import { Global } from "@emotion/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageView(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

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
