import { EmailIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
  Divider,
  Icon,
  Image,
  HStack,
} from "@chakra-ui/react";
import { BiHeart } from "react-icons/bi";
import { colors } from "../../theme/colors";
import { width } from "../../theme/theme";
import { BrandText } from "../common/brand-text";
import { NewsletterSubscribe } from "../form/newsletter-subscribe";

export function Footer() {
  const { colorMode } = useColorMode();

  return (
    <Box
      mt="200px"
      py="50px"
      bg={colors[colorMode].ui02}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container maxW={width} px={[5, 5, 5, 0]}>
        <SimpleGrid
          templateColumns={{ sm: "1fr ", md: "1fr 1fr 1.5fr" }}
          spacing={8}
        >
          <Stack spacing={2} fontSize="sm">
            <Box>
              <HStack>
                <Image
                  src="/logo.svg"
                  alt="Brand logo"
                  h="32px"
                  w="32px"
                  py="5px"
                />{" "}
                <span>
                  © 2021 <BrandText>SimplyShift</BrandText>.
                </span>
              </HStack>
              <Text color="gray.400">
                Made with <Icon as={BiHeart} color="green.500" /> by{" "}
                <Link isExternal href="https://tinyhive.dev">
                  tinyhive.dev <ExternalLinkIcon mx="2px" />
                </Link>
              </Text>
              <Divider my={5} />
              <BrandText>Found an issue?</BrandText> <br />
              Let us know at{" "}
              <Link
                href="mailto:simplyshift@tinyhive.dev"
                isExternal
                style={{ whiteSpace: "nowrap" }}
              >
                <EmailIcon /> simplyshift@tinyhive.dev
              </Link>
            </Box>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              About SimplyShift
            </Text>
            <Link href="/privacy">Privacy Policy</Link>
          </Stack>
          <NewsletterSubscribe />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
