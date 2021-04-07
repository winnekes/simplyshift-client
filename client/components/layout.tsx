import { FunctionComponent } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Box, Container } from "@chakra-ui/react";

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

      <Container maxW="container.md">
        <Navbar />
        <main>{children}</main>
      </Container>
    </>
  );
};
