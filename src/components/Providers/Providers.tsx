"use client";

import { createStore, PreloadedState } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useMemo } from "react";
import { Provider } from "react-redux";

const client = new QueryClient();

export default function Providers({
  children,
  preloadedState,
}: {
  children: ReactNode;
  preloadedState: PreloadedState;
}) {
  const store = useMemo(() => createStore(preloadedState), [preloadedState]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
