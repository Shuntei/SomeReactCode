// import "@/styles/globals.css";
import UseReactQuery from "@/context/UseReactQuery";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UseReactQuery>
      <Component {...pageProps} />
    </UseReactQuery>
  );
}
