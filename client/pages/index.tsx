import { BellIcon, EditIcon, IconProps, TimeIcon } from "@chakra-ui/icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  Image,
  SimpleGrid,
  VStack,
  Center,
  Button,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { BlobIcon } from "../components/common/blob-icon";
import { BrandText } from "../components/common/brand-text";
import { Feature } from "../components/common/feature";
import { PageWrapper } from "../components/layout/page-wrapper";
import Link from "next/link";
import {
  BiBell,
  BiCalendarHeart,
  BiCloudDownload,
  BiShareAlt,
} from "react-icons/bi";

export default function Home() {
  return (
    <PageWrapper title="A simple calendar to keep track of your shifts">
      <Stack
        align="center"
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
                bg: "green.400",
                zIndex: -1,
              }}
            >
              SimplyShift,
            </Text>
            <br />
            <Text as="span" color="green.400">
              the simplest scheduling solution!
            </Text>
          </Heading>
          <Container maxWidth="container.md" py={5}>
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
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                variant="primary"
              >
                Try it out now!
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                rounded="full"
                size="lg"
                fontWeight="normal"
                px={6}
                colorScheme="gray"
                bg={useColorModeValue("gray.200", "gray.700")}
              >
                Watch the demo
              </Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>
      <Flex
        my="100px"
        flex={1}
        justify="center"
        align="center"
        position="relative"
        w="full"
      >
        <BlobIcon
          w="150%"
          h="150%"
          position="absolute"
          top="-20%"
          left={0}
          zIndex={-1}
          color="green.100"
        />
        <Box
          mx={6}
          position="relative"
          height="300px"
          rounded="2xl"
          boxShadow="2xl"
          width="full"
          overflow="hidden"
        >
          <Image
            alt="Hero Image"
            fit="cover"
            align="center"
            w="100%"
            h="100%"
            src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
          />
        </Box>
      </Flex>

      <VStack p={4} mt="150px">
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <Feature
            icon={<Icon as={TimeIcon} w={10} h={10} />}
            title="Fast and easy"
            text=""
          />
          <Feature
            icon={<Icon as={EditIcon} w={10} h={10} />}
            title="Unlimited shifts"
            text=""
          />
          <Feature
            icon={<Icon as={EditIcon} w={10} h={10} />}
            title="Instant Delivery"
            text=""
          />
        </SimpleGrid>
      </VStack>

      {/*<VStack p={4} mt="150px">*/}
      {/*  <Heading mb={20}>*/}
      {/*    Coming soon to <BrandText>SimplyShift</BrandText>*/}
      {/*  </Heading>*/}
      {/*  <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={BiShareAlt} w={10} h={10} />}*/}
      {/*      title="Share your calendar"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={BiBell} w={10} h={10} />}*/}
      {/*      title="Notifications!"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={BiCloudDownload} w={10} h={10} />}*/}
      {/*      title="Download as image or PDF"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={BiCalendarHeart} w={10} h={10} />}*/}
      {/*      title="Connect to your personal calendar"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={EditIcon} w={10} h={10} />}*/}
      {/*      title="Unlimited shifts that you create and customize"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*    <Feature*/}
      {/*      icon={<Icon as={EditIcon} w={10} h={10} />}*/}
      {/*      title="Instant Delivery"*/}
      {/*      text=""*/}
      {/*    />*/}
      {/*  </SimpleGrid>*/}
      {/*  <Spacer />*/}
      {/*  <Heading mb={20} size="md">*/}
      {/*    ... and more! Let us know what you functionality you are missing!*/}
      {/*  </Heading>*/}
      {/*</VStack>*/}
    </PageWrapper>
  );
}
