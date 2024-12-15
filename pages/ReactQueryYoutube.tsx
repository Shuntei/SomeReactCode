import ReactQueryYoutubeDemo from "@/components/ReactQueryYoutubeDemo";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";
import ReactQueryCrud from "./ReactQueryCrud";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//     },
//   },
// });

function ReactQueryYoutube() {
  const [showDemo, setShowDemo] = useState(true);
  // const [toggle, setToggle] = useState(true);

  return (
    // <QueryClientProvider client={queryClient}>
    <>
      <div>
        <button onClick={() => setShowDemo(!showDemo)}>Toggle Demo</button>
        {showDemo && <ReactQueryYoutubeDemo />}
      </div>
      {/* <div>
        <button onClick={() => setToggle(!toggle)}>Toggle content</button>
        {toggle && <ReactQueryCrud />}
      </div> */}
    </>

    // </QueryClientProvider>
  );
}

export default ReactQueryYoutube;
