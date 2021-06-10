import { Flex, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

interface Props {
  title: string;
  text: string;
  icon: ReactElement;
}

export const Feature = ({ title, text, icon }: Props) => {
  return (
    <VStack>
      <Flex
        w={16}
        h={16}
        align="center"
        justify="center"
        color="white"
        rounded="full"
        bg="green.500"
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={useColorModeValue("gray.500", "gray.500")}>{text}</Text>
    </VStack>
  );
};
