import { FunctionComponent, useEffect } from "react";
import Head from "next/head";
import { useUser } from "../hooks/use-user";
import { Loading } from "./loading";
import { Navbar } from "./navbar";
import { Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { width } from "../theme/theme";

type Props = {
  title: string;
  isProtectedPage?: boolean;
};

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  title,
  isProtectedPage,
}) => {
  const router = useRouter();
  const { user, error, loading } = useUser();

  // todo skeleton
  return (
    <>
      <Head>
        <title>{title} - SimplyShift</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />

      <Container maxW={width} p={0}>
        {!isProtectedPage || (isProtectedPage && user) ? (
          <>{children}</>
        ) : (
          <Loading />
        )}
      </Container>
    </>
  );
};
