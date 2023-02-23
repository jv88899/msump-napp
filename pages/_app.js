import "@/styles/globals.css";
import React from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const [supabase] = React.useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <Component {...pageProps} />
      <Toaster />
    </SessionContextProvider>
  );
}
