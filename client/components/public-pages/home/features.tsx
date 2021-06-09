import { EditIcon, TimeIcon } from "@chakra-ui/icons";
import { Icon, SimpleGrid, VStack } from "@chakra-ui/react";
import { Feature } from "../../common/feature";

export const Features = () => {
  return (
    <VStack p={4} mt="150px">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={TimeIcon} w={10} h={10} />}
          title="Fast and easy"
          text="Are you a nurse, a firefighter or a doctor? Is your work schedule
              ever-changing? Then"
        />
        <Feature
          icon={<Icon as={EditIcon} w={10} h={10} />}
          title="Unlimited shifts"
          text="Are you a nurse, a firefighter or a doctor? Is your work schedule
              ever-changing? Then"
        />
        <Feature
          icon={<Icon as={EditIcon} w={10} h={10} />}
          title="Work. Life. Balance"
          text="Carry your work schedule with you everwhere"
        />
      </SimpleGrid>
    </VStack>
  );
};
