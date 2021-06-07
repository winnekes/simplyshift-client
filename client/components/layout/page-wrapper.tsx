import { FunctionComponent } from "react";
import Head from "next/head";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../common/loading";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { Container, Flex, Spacer } from "@chakra-ui/react";
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
      <Flex direction="column">
        <Container maxW={width} px={[5, 5, 5, 0]}>
          {!isProtectedPage || (isProtectedPage && user) ? (
            <>{children}</>
          ) : (
            <Loading />
          )}
        </Container>
        <Spacer />
        {!isProtectedPage && <Footer />}
      </Flex>
    </>
  );
};
