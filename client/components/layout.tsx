import { FunctionComponent } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";

type Props = {
  title: string;
};

export const Layout: FunctionComponent<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title} - SimplyShift</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="container mt-4 is-white box">
        <Navbar />
        <main className="hero px-4 py-6 is-white">{children}</main>
      </div>
    </>
  );
};
