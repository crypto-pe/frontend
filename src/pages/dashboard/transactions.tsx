import {
  Container,
  Heading,
  HStack,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
  Text
} from "@chakra-ui/react";
import { DashboardLayout } from "layouts/dashboard.layout";
import { NextPage } from "next";
import Image from "next/image";

const TransactionsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <Container maxW="5xl" mt={14}>
        <Heading>Transactions</Heading>
        <TableContainer mt={12}>
          <Table variant="simple" colorScheme={"whiteAlpha"}>
            <Thead>
              <Tr>
                <Th color="light" fontSize="lg">
                  ID
                </Th>
                <Th color="light" fontSize="lg">
                  Hash
                </Th>
                <Th color="light" fontSize="lg">
                  Employee Name
                </Th>
                <Th color="light" fontSize="lg">
                  Amount
                </Th>
                <Th color="light" fontSize="lg">
                  <HStack justifyContent={"space-between"}>
                    <Text>Date</Text>
                    <IconButton aria-label="shrink" variant="unstyled">
                      <Image
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </HStack>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>121</Td>
                <Td>2q4qeqwdasdaasd</Td>
                <Td>Aadhi- Soulninja</Td>
                <Td>1009</Td>
                <Td>Friday 13th</Td>
              </Tr>
              <Tr>
                <Td>121</Td>
                <Td>2q4qeqwdasdaasd</Td>
                <Td>Aadhi- Soulninja</Td>
                <Td>1009</Td>
                <Td>Friday 13th</Td>
              </Tr>
              <Tr>
                <Td>121</Td>
                <Td>2q4qeqwdasdaasd</Td>
                <Td>Aadhi- Soulninja</Td>
                <Td>1009</Td>
                <Td>Friday 13th</Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </DashboardLayout>
  );
};

export default TransactionsPage;
