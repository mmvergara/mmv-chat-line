import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../styles/globals.css";
import { ColorScheme, ColorSchemeProvider } from "@mantine/core";
import Layout from "../components/layout/Layout";
const config = {
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(config));

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ColorSchemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
