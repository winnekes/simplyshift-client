import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import Head from "next/head";
import { useAuth } from "../../contexts/auth-context";
import { Loading } from "../common/loading";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Container } from "@chakra-ui/react";
import { width } from "../../theme/theme";

type Props = {
  title: string;
  isProtectedPage?: boolean;
};

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  title,
  isProtectedPage,
}) => {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>{title} - SimplyShift</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navbar />
      <Container maxW={width} p={[5, 5, 5, 0]}>
        {!isProtectedPage || (isProtectedPage && user) ? (
          <>{children}</>
        ) : (
          <Loading />
        )}
      </Container>
      {!isProtectedPage && <Footer />}
    </>
  );
};
