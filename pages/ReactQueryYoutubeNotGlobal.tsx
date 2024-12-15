import ReactQueryYoutubeDemo from "@/components/ReactQueryYoutubeDemo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function ReactQueryYoutube() {
  const [showDemo, setShowDemo] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
      {showDemo && <ReactQueryYoutubeDemo />}
    </QueryClientProvider>
  );
}

export default ReactQueryYoutube;
