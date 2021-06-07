import { MoonIcon, SettingsIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
  Badge,
  LinkOverlay,
  LinkBox,
  Image,
} from "@chakra-ui/react";
import Link from "next/link";
import RouteLink from "next/link";
import { useGoogleLogout } from "react-google-login";
import { BiExit } from "react-icons/bi";
import { useAuth } from "../../hooks/use-auth";
import { colors } from "../../theme/colors";
import { width } from "../../theme/theme";

export function Navbar() {
  const { user, logout } = useAuth();
  const { signOut } = useGoogleLogout({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {},
    onFailure: () => {},
  });

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      py={2}
      px={[6, 6, 6, 0]}
      bg={colors[colorMode].ui02}
      mb="2rem"
      borderBottom={`1px solid ${colors[colorMode].ui03}`}
    >
      <Flex
        mx={[0, "auto"]}
        my={[0, "0"]}
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxWidth={width}
      >
        <HStack spacing={4} alignItems="center">
          <LinkBox>
            <Link href="/" passHref>
              <LinkOverlay>
                <HStack px={2}>
                  <Image src="/logo.svg" alt="Brand logo" h="32px" w="32px" />{" "}
                  <Heading size="1xl" mr={0}>
                    SimplyShift
                  </Heading>
                  <Badge ml={0} colorScheme="green">
                    Early Access
                  </Badge>
                </HStack>
              </LinkOverlay>
            </Link>
          </LinkBox>

          {user && (
            <Link href="/calendar">
              <Box cursor="pointer">Calendar</Box>
            </Link>
          )}
        </HStack>

        <Flex alignItems="center">
          <IconButton
            size="lg"
            color="gray.500"
            aria-label="Switch color mode"
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            variant="ghost"
            onClick={toggleColorMode}
          />
          <Menu>
            {user && (
              <>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="ghost"
                  p={0}
                  cursor="pointer"
                >
                  <Avatar bg="green.400" size="sm" />
                </MenuButton>
                <MenuList bg={colors[colorMode].ui02}>
                  <Link href="/settings" passHref>
                    <MenuItem icon={<SettingsIcon />}>Settings</MenuItem>
                  </Link>
                  <MenuDivider />
                  <MenuItem
                    icon={<BiExit />}
                    onClick={() => {
                      signOut();
                      logout();
                    }}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </>
            )}
            {!user && (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify="flex-end"
                direction="row"
                spacing={6}
              >
                <RouteLink href="/login" passHref>
                  <Button as="a" fontSize="sm" fontWeight={400} variant="link">
                    Sign In
                  </Button>
                </RouteLink>
                <RouteLink href="/signup" passHref>
                  <Button variant="primary" fontSize="sm" fontWeight={600}>
                    Sign Up
                  </Button>
                </RouteLink>
              </Stack>
            )}
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
}
