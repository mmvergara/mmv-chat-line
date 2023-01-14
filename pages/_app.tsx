import { NotificationsProvider } from "@mantine/notifications";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { useState } from "react";
import "../styles/globals.css";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import Layout from "../components/layout/Layout";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useLocalStorage } from "@mantine/hooks";

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
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }}>
              <NotificationsProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionContextProvider>
  );
}
