"use client";

import { store } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Provider } from "react-redux";

const client = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
}
