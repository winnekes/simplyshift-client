import { EditIcon } from "@chakra-ui/icons";
import { Heading, Icon, SimpleGrid, Spacer, VStack } from "@chakra-ui/react";
import {
  BiBell,
  BiCalendarHeart,
  BiCloudDownload,
  BiShareAlt,
} from "react-icons/bi";
import { BrandText } from "../../common/brand-text";
import { Feature } from "../../common/feature";

export const ComingSoonFeatures = () => {
  return (
    <VStack p={4} mt="150px">
      <Heading mb={20}>
        Coming soon to <BrandText>SimplyShift</BrandText>
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={BiShareAlt} w={10} h={10} />}
          title="Share your calendar"
          text=""
        />
        <Feature
          icon={<Icon as={BiBell} w={10} h={10} />}
          title="Notifications!"
          text=""
        />
        <Feature
          icon={<Icon as={BiCloudDownload} w={10} h={10} />}
          title="Download as image or PDF"
          text=""
        />
        <Feature
          icon={<Icon as={BiCalendarHeart} w={10} h={10} />}
          title="Connect to your personal calendar"
          text=""
        />
        <Feature
          icon={<Icon as={EditIcon} w={10} h={10} />}
          title="Unlimited shifts that you create and customize"
          text=""
        />
        <Feature
          icon={<Icon as={EditIcon} w={10} h={10} />}
          title="Swap shifts without calling or texting"
          text=""
        />
      </SimpleGrid>
      <Spacer />
      <Heading mb={20} size="md">
        ... and more! Let us know what you functionality you are missing!
      </Heading>
    </VStack>
  );
};
