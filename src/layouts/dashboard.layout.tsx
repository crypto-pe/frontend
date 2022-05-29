import { AddIcon, ArrowRightIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  VStack
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useOrgnizationsStore } from "store/organizations";
import { useSessionStore } from "store/session";

import client from "utils/client";
import { getAuthHeaders } from "utils/jwt";

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const router = useRouter();
  const {
    setCurrentOrgId,
    currentOrgId,
    setOrganizations,
    setLoading,
    setIsAdmin
  } = useOrgnizationsStore(state => state);
  const [jwt, account] = useSessionStore(state => [state.jwt, state.account]);

  useEffect(() => {
    if (!jwt) {
      router.push("/login");
    } else {
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
              setLoading(true);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [jwt]);

  useEffect(() => {
    // Check if user is admin when select org changes
    if (currentOrgId) {
      setLoading(true);
      console.log("UUID:", currentOrgId);
      client
        .getOrganizationMember(
          { organizationID: currentOrgId, memberAddress: account.address },
          getAuthHeaders(jwt)
        )
        .then(res => {
          setIsAdmin(res.organizationMember.isAdmin);
        })
        .catch(err => console.log(err));
    }
  }, [currentOrgId]);

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
  const setSession = useSessionStore(state => state.setSession);
  const { organizations } = useOrgnizationsStore(state => ({
    organizations: state.organizations
  }));

  const handleLogout = () => {
    setSession({ jwt: "", account: undefined });
  };

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

      <Box display={"flex"} alignItems="center" gap="4">
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
            {organizations.map(({ id, name }) => (
              <MenuItem
                minH="48px"
                _hover={{ bgColor: "gray.600" }}
                _focus={{ bgColor: "gray.500" }}
                icon={<ArrowRightIcon />}
                key={id}
              >
                <span>{name}</span>
              </MenuItem>
            ))}

            <Link href="/create-organization">
              <MenuItem
                minH="40px"
                _hover={{ bgColor: "gray.600" }}
                _focus={{ bgColor: "gray.500" }}
                icon={<AddIcon />}
              >
                <span>New Organization</span>
              </MenuItem>
            </Link>
          </MenuList>
        </Menu>
        <IconButton
          aria-label="logout"
          // size="sm"
          variant={"unstyled"}
          onClick={handleLogout}
        >
          <Image src="/icons/log-out.svg" width={22} height={22} />
        </IconButton>
      </Box>
    </Flex>
  );
};
