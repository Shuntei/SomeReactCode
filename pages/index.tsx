import { useEffect, useState } from "react";

export default function Home() {
  const [counter, setCounter] = useState(0);

  // useEffect(() => {
  //   fetch("http://localhost:5000/api/counter", {
  //     credentials: "include", // 允许携带凭证
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       // if (data.counter !== undefined) {
  //       setCounter(data.counter);
  //       // }
  //     });
  // }, []);

  return (
    <main>
      <h1>Session實作</h1>
      {/* <p>Views: {counter ? counter : "counter start"}</p> */}
      <p>Views: {counter}</p>
    </main>
  );
}
