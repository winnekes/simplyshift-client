import { get } from "idb-keyval";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Loading } from "../common/loading";
import { Footer } from "../public-pages/footer";
import { Navbar } from "../public-pages/navbar";
import {
  ColorMode,
  Container,
  Flex,
  Spacer,
  useColorMode,
} from "@chakra-ui/react";
import { width } from "../../theme/theme";

interface Props {
  isProtectedPage?: boolean;
}

export const PageWrapper: FunctionComponent<Props> = ({
  children,
  isProtectedPage,
}) => {
  const [, setLoadColorMode] = useState(true);
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
      setColorMode(value || "light");
      setLoadColorMode(false);
    });
  }, []);

  return (
    <>
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
