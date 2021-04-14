import { FunctionComponent, useEffect } from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Container } from "@chakra-ui/react";
import { useAuthContext } from "../contexts/auth-context";
import { useRouter } from "next/router";

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

  return (
    <>
      <Head>
        <title>{title} - SimplyShift</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <Navbar />

      <Container maxW="container.md">
        {!isProtectedPage || (isProtectedPage && auth.token && auth.user) ? (
          <main>{children}</main>
        ) : (
          <div>Not allowed</div>
        )}
      </Container>
    </>
  );
};
