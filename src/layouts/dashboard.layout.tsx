import { AddIcon, ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useOrgnizationsStore } from "store/organizations";
import { useSessionStore } from "store/session";

import client from "utils/client";
import { getAuthHeaders } from "utils/jwt";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const { setCurrentOrgId, currentOrgId, setOrganizations } =
    useOrgnizationsStore(state => state);
  const jwt = useSessionStore(state => state.jwt);

  useEffect(() => {
    console.log(getAuthHeaders(jwt));
    client
      .getAllOrganizations(getAuthHeaders(jwt))
      .then(res => {
        console.log(res);
        setOrganizations(res.organizations);
        if (currentOrgId) {
          const currentOrg = res.organizations.find(
            org => org.id === currentOrgId
          );
          // Reset currentOrgId if its invalid (doesnt exist in db)
          if (!currentOrg) {
            setCurrentOrgId(
              res.organizations.length ? res.organizations[0].id : ""
            );
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [jwt]);

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
      <Link href="/dashboard">
        <Button variant="unstyled">
          <Image src="/icons/home.svg" width={45} height={45} />
        </Button>
      </Link>
      <Link href="/dashboard/transactions">
        <Button variant="unstyled">
          <Image src="/icons/history.svg" width={45} height={45} />
        </Button>
      </Link>
      <Link href="/dashboard/settings">
        <Button variant="unstyled">
          <Image src="/icons/settings.svg" width={45} height={45} />
        </Button>
      </Link>
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
          Google
        </MenuButton>
        <MenuList bgColor="gray.700" borderColor="gray.800">
          <MenuItem
            minH="48px"
            _hover={{ bgColor: "gray.600" }}
            _focus={{ bgColor: "gray.500" }}
            icon={<ArrowRightIcon />}
          >
            <span>Macrosoft</span>
          </MenuItem>

          <MenuItem
            minH="40px"
            _hover={{ bgColor: "gray.600" }}
            _focus={{ bgColor: "gray.500" }}
            icon={<AddIcon />}
          >
            <span>New Organization</span>
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
