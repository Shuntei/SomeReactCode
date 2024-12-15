import React from "react";
import dynamic from "next/dynamic";
// import DynamicComponent from "@/components/dynamicComponent";

const DynamicComponent = dynamic(
  () => import("../components/dynamicComponent"),
  { loading: () => <p>Loading...</p> }
);

export default function CodeSpliting() {
  return (
    <div>
      <h1>Welcome</h1>
      <DynamicComponent />
    </div>
  );
}
