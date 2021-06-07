import { Box, BoxProps, ComponentWithAs } from "@chakra-ui/react";
import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

export const ChakraNextImage: ComponentWithAs<"div", BoxProps & ImageProps> = ({
  src,
  alt,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Image objectFit="cover" layout="fill" src={src} alt={alt} />
    </Box>
  );
};
