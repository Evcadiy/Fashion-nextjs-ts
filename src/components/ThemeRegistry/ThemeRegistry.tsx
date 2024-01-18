"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import theme from "./theme";
import { Provider } from "react-redux";
import store from "@/redux/store";
import QueryClientProv from "@/providers/QueryClientProv";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
        <QueryClientProv>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </QueryClientProv>
      </NextAppDirEmotionCacheProvider>
    </Provider>
  );
}
