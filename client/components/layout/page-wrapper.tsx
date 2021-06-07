import { useAnimatedState } from "framer-motion/types/animation/use-animated-state";
import { get } from "idb-keyval";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import Head from "next/head";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../common/loading";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import {
  ColorMode,
  Container,
  Flex,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { width } from "../../theme/theme";

interface Props {
  title: string;
  isProtectedPage?: boolean;
}

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  title,
  isProtectedPage,
}) => {
  const [loadColorMode, setLoadColorMode] = useState(true);
  const { initialising, user } = useAuth();
  const router = useRouter();
  const { setColorMode } = useColorMode();

  useEffect(() => {
    if (!initialising) {
      if (isProtectedPage && !user) {
        router.replace("/login");
      }

      if (!isProtectedPage && user) {
        router.replace("/calendar");
      }
    }
  }, []);

  useEffect(() => {
    get<ColorMode>("colorMode").then((value) => {
      console.log(value);
      setColorMode(value);
      setLoadColorMode(false);
    });
  }, []);

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
