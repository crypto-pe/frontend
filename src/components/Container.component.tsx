import { Flex, FlexProps } from "@chakra-ui/react";

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    alignItems="center"
    justifyContent="flex-start"
    bg="black"
    color="light"
    transition="all 0.15s ease-out"
    minH="100vh"
    h="100%"
    overflow="hidden"
    {...props}
  />
);
