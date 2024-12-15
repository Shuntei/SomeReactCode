import React, { useState } from "react";
import HeavyComponent from "@/components/heavy";
import dynamic from "next/dynamic";

// const DynamicHeavyComponent = dynamic(() => import("../components/heavy"), {
//   ssr: false,
//   loading: () => <p>I am fetching</p>,
// });

export default function LazyLoading() {
  const [shouldSlow, setShouldSlow] = useState<boolean>(false);

  return (
    <main>
      <h1>Hello world</h1>
      <button onClick={() => setShouldSlow(true)}>Click me</button>
      {shouldSlow && <HeavyComponent />}
    </main>
  );
}
