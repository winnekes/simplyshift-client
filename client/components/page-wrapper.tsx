import { FunctionComponent, useEffect } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Container } from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";
import { width } from "../constants/theme";

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
  const auth = useAuthContext();

  useEffect(() => {
    if (isProtectedPage && (!auth.token || !auth.user)) {
      router.replace("/login");
    }
  }, []);

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
        {!isProtectedPage || (isProtectedPage && auth.token && auth.user) ? (
          <>{children}</>
        ) : (
          <>Not allowed</>
        )}
      </Container>
    </>
  );
};
