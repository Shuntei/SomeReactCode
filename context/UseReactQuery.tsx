import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useContext, createContext, ReactNode } from "react";

// const ReactQueryContext = createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function UseReactQuery({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

// export const useReactQuery = () => useContext(ReactQueryContext);
