import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import React from "react";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return (
    <Container maxW="full">
      <Flex w="100%" color="light">
        <Sidebar />
        <VStack
          flex="1"
          width="full"
          maxW="8xl"
          id="vstack"
          mx={"auto"}
          gap={16}
        >
          <TopBar />

          <Box w="full" maxW="6xl">
            {children}
          </Box>
        </VStack>
      </Flex>
    </Container>
  );
};

const Sidebar = () => {
  return (
    <VStack gap={12} mt={40} ml={6}>
      <Button variant="unstyled">
        <Image src="/icons/home.svg" width={45} height={45} />
      </Button>
      <Button variant="unstyled">
        <Image src="/icons/history.svg" width={45} height={45} />
      </Button>
      <Button variant="unstyled">
        <Image src="/icons/settings.svg" width={45} height={45} />
      </Button>
    </VStack>
  );
};

const TopBar = () => {
  return (
    <Flex
      width={"full"}
      mt={8}
      bgColor="slategray"
      alignItems={"center"}
      justifyContent="space-between"
      py={4}
      px={5}
      borderRadius="2xl"
    >
      <Box>
        <Image src="/images/Logo.png" width={120} height={28} />
      </Box>

      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          variant="primary"
          px={6}
          py={2}
          rounded="full"
        >
          Your Cats
        </MenuButton>
        <MenuList bgColor="gray.700" borderColor="gray.800">
          <MenuItem
            minH="48px"
            _hover={{ bgColor: "gray.600" }}
            _focus={{ bgColor: "gray.500" }}
          >
            <span>Fluffybuns the Destroyer</span>
          </MenuItem>
          <MenuItem
            minH="40px"
            _hover={{ bgColor: "gray.600" }}
            _focus={{ bgColor: "gray.500" }}
          >
            <span>Simon the pensive</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
