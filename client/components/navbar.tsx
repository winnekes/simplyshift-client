import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import Link from "next/link";
import RouteLink from "next/link";
import { useAuthContext } from "../contexts/auth-context";
import { useUser } from "../hooks/use-user";
import { colors } from "../theme/colors";
import { width } from "../theme/theme";

export function Navbar() {
  const auth = useAuthContext();
  const { user, error, loading } = useUser();
  const { toggleColorMode } = useColorMode();
  const { colorMode } = useColorMode();

  return (
    <Box
      py={2}
      bg={colors[colorMode].ui02}
      mb="2rem"
      borderBottom={`1px solid ${colors[colorMode].ui03}`}
    >
      <Flex
        mx={[4, "auto"]}
        my={[0, "0"]}
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxWidth={width}
      >
        <HStack spacing={4} alignItems="center">
          <Heading size="1xl" onClick={toggleColorMode}>
            SimplyShift
          </Heading>

          {user && (
            <Link href="/calendar">
              <Box>Calendar</Box>
            </Link>
          )}
        </HStack>

        <Flex alignItems="center">
          <Menu>
            {user && (
              <>
                <MenuButton
                  as={Button}
                  rounded="full"
                  variant="link"
                  cursor="pointer"
                >
                  <Avatar
                    size="sm"
                    src="https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  />
                </MenuButton>
                <MenuList>
                  <Link href="/profile" passHref>
                    <MenuItem>Profile</MenuItem>
                  </Link>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => auth.logout()}>Logout</MenuItem>
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
                  <Button
                    fontSize="sm"
                    fontWeight={600}
                    color="white"
                    bg="brand01.100"
                    _hover={{
                      bg: "brand01.200",
                    }}
                  >
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
