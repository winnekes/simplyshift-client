import "../styles/globals.scss";

import type { AppProps } from "next/app";
import { Navbar } from "../components/navbar";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
