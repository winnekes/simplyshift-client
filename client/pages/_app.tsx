import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { Navbar } from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container is-mobile mt-6 is-white">
      <Navbar />
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
