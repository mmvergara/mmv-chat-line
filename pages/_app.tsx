import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../styles/globals.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import Layout from "../components/layout/Layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const config = {
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(config));
  const [supabase] = useState(() => createBrowserSupabaseClient());

  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MantineProvider>
          </ColorSchemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
