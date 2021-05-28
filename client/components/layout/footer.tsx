import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Input,
  IconButton,
  useColorModeValue,
  useColorMode,
  HStack,
  VStack,
  FormControl,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { BiMailSend } from "react-icons/bi";
import { colors } from "../../theme/colors";
import { BrandText } from "../common/brand-text";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight="500" fontSize="lg" mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box
      mt="100px"
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
            {/*<Box>*/}
            {/*  /!*<Logo color={useColorModeValue("gray.700", "white")} />*!/*/}
            {/*</Box>*/}
            <Text fontSize="sm">
              © 2021 <BrandText>SimplyShift</BrandText>
            </Text>
          </Stack>
          <Stack align="flex-start">
            <ListHeader>About SimplyShift</ListHeader>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Found an issue?</Link>
          </Stack>

          <VStack align="flex-start">
            <ListHeader>
              Follow us! Be the first to hear about new features
            </ListHeader>
            <Stack direction="row">
              <Input
                alignSelf="stretch"
                placeholder="Your email address"
                bg={useColorModeValue("gray.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />
              <IconButton
                color="white"
                bg="green.400"
                _hover={{
                  bg: "green.500",
                }}
                aria-label="Subscribe"
                icon={<BiMailSend />}
              />
            </Stack>
          </VStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
