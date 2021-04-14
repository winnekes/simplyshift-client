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
} from "@chakra-ui/react";
import RouteLink from "next/link";
import { useAuthContext } from "../contexts/auth-context";

export function Navbar() {
  const auth = useAuthContext();
  return (
    <Box bg="#ffffff" mb="2rem" borderBottom="1px solid lightgray">
      <Flex
        m="0 auto"
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxWidth="container.md"
      >
        <HStack spacing={8} alignItems="center">
          <Heading>SimplyShift</Heading>
        </HStack>

        <Flex alignItems="center">
          <Menu>
            {auth.token && (
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
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={() => auth.logout()}>Logout</MenuItem>
                </MenuList>
              </>
            )}
            {!auth.token && (
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
