import { CheckIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  Stack,
  Text,
  VStack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { BrandText } from "../components/common/brand-text";
import { ChakraNextImage } from "../components/common/chakra-next-image";
import { PageWrapper } from "../components/layout/page-wrapper";
import Link from "next/link";
import { useAuth } from "../hooks/use-auth";

export default function Home() {
  const { initialising, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initialising && user) {
      router.push("/calendar");
    }
  }, []);

  return (
    <PageWrapper>
      <Stack
        align="left"
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <VStack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            as="h1"
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            alignSelf="flex-start"
          >
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "green.500",
                zIndex: -1,
              }}
            >
              SimplyShift,
            </Text>
            <br />
            <Text as="span" color="green.500">
              the simple shift scheduler
            </Text>
          </Heading>
          <Container maxWidth="container." py={5}>
            <Text fontSize="xl">
              Are you a nurse, a firefighter or a doctor? Is your work schedule
              ever-changing? Then <BrandText>SimplyShift</BrandText> is for you!{" "}
              <br />
              Let us help you keep track of your work schedule, vacation time,
              over-time and more!
            </Text>
          </Container>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Link href="/signup">
              <Button
                leftIcon={<CheckIcon />}
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                variant="primary"
              >
                Try it out now!
              </Button>
            </Link>
          </Stack>

          <ChakraNextImage
            h="lg"
            src={useColorModeValue("/laptop_light.png", "/laptop_dark.png")}
            w="100%"
            alt="Preview of app inside, shown on a laptop"
          />
        </VStack>
      </Stack>
      {/*<Features />*/}
      {/*<ComingSoonFeatures />*/}
    </PageWrapper>
  );
}
