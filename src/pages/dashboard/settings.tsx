import {
  Heading,
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
  Input,
  Select,
  Box,
  Button,
  HStack,
  Center,
  Container
} from "@chakra-ui/react";
import { DashboardLayout } from "layouts/dashboard.layout";
import { NextPage } from "next";
import Image from "next/image";

const SettingsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Container maxW="3xl" mt={14}>
        <HStack
          maxW="2xl"
          w="full"
          justifyContent={"space-between"}
          alignItems="flex-end"
        >
          <Heading>Settings</Heading>
          <Button
            mt={10}
            variant="primary"
            color="light"
            leftIcon={
              <Image
                src="/icons/save.svg"
                width={24}
                height={24}
                style={{ color: "white" }}
              />
            }
          >
            Save Changes
          </Button>
        </HStack>
        <TableContainer mt={12}>
          <Table variant="simple" colorScheme="whiteAlpha" maxW="2xl">
            <Tbody>
              <Tr>
                <Td textTransform="uppercase">Name</Td>
                <Td px="0">
                  <Input
                    float="right"
                    variant="primary"
                    maxW={60}
                    defaultValue={"Google"}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td textTransform="uppercase">Currency</Td>
                <Td px="0">
                  <Box float="right">
                    <Select
                      placeholder="Choose a Stable Coin"
                      variant="primary"
                      defaultValue={"usdc"}
                    >
                      <option value="usdc">USDC</option>
                      <option value="dai">DAI</option>
                    </Select>
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  );
};

export default SettingsPage;
