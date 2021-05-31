import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { colors } from "../../theme/colors";
import { BrandText } from "../common/brand-text";
import { NewsletterSubscribe } from "../form/newsletter-subscribe";

export function Footer() {
  const { colorMode } = useColorMode();

  return (
    <Box
      mt="200px"
      pb="50px"
      bg={colors[colorMode].ui02}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr ", md: "1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Text fontSize="sm">
              © 2021 <BrandText>SimplyShift</BrandText>
            </Text>
          </Stack>
          <Stack align="flex-start">
            <Text fontWeight="500" fontSize="lg" mb={2}>
              About SimplyShift
            </Text>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Found an issue?</Link>
          </Stack>
          <NewsletterSubscribe />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
