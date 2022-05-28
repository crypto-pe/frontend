import {
  AddIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Checkbox,
  HStack,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";
import { AddEmployee } from "components/AddEmployee/AddEmployee.component";
import { DashboardLayout } from "layouts/dashboard.layout";
import { NextPage } from "next";
import Image from "next/image";

const EmployeData: { name: string; role: string; salary: number }[] = [
  {
    name: "Saptarshi Babu",
    role: "Chutiya",
    salary: -69
  },
  {
    name: "Sala Milind",
    role: "Gaand Engineer",
    salary: 36
  },
  {
    name: "Sharma Ji Ka Beta",
    role: "Gaand Engineer",
    salary: 420
  },
  {
    name: "Aadhi- SoulNinja",
    role: "Self Proclaimed Backend Eng",
    salary: 1000
  }
];

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <HStack
        maxW="5xl"
        w="full"
        justifyContent={"space-between"}
        alignItems="flex-end"
      >
        <Heading>Employees</Heading>
        <AddEmployee />
      </HStack>
      <Box mt={10}>
        <TableContainer>
          <Table variant="simple" colorScheme="whiteAlpha" w="full">
            <Thead>
              <Tr borderColor={"red"}>
                <Th>
                  <Checkbox />
                </Th>
                <Th color="light" fontSize="lg">
                  <HStack justifyContent={"space-between"}>
                    <Text>Name</Text>
                    <IconButton aria-label="shrink" variant="unstyled">
                      <Image
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </HStack>
                </Th>
                <Th color="light" fontSize="lg">
                  <HStack justifyContent={"space-between"}>
                    <Text>role</Text>
                    <IconButton aria-label="shrink" variant="unstyled">
                      <Image src="/icons/search.svg" width={24} height={24} />
                    </IconButton>
                  </HStack>
                </Th>
                <Th color="light" fontSize="lg">
                  <HStack justifyContent={"space-between"}>
                    <Text>Salary</Text>
                    <IconButton aria-label="shrink" variant="unstyled">
                      <Image
                        src="/icons/chevron-down.svg"
                        width={24}
                        height={24}
                      />
                    </IconButton>
                  </HStack>
                </Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeData.map(({ name, role, salary }) => (
                <Tr key={name}>
                  <Td>
                    <Checkbox />
                  </Td>
                  <Td>{name}</Td>
                  <Td>{role}</Td>
                  <Td>{salary}</Td>
                  <Td>
                    <HStack
                      gap={4}
                      alignItems="center"
                      justifyContent={"center"}
                    >
                      <Button variant={"unstyled"} pt={2}>
                        <Image src="/icons/edit.svg" height={32} width={32} />
                      </Button>
                      <Button variant="secondary">Pay Salary</Button>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          icon={<ChevronDownIcon boxSize={6} />}
                          variant="unstyled"
                        />
                        <MenuList bgColor="gray.700" borderColor="gray.800">
                          <MenuItem
                            minH="48px"
                            _hover={{ bgColor: "gray.600" }}
                            _focus={{ bgColor: "gray.500" }}
                            icon={<AddIcon />}
                          >
                            <span>Pay Bonus</span>
                          </MenuItem>
                          <MenuItem
                            minH="40px"
                            _hover={{ bgColor: "gray.600" }}
                            _focus={{ bgColor: "gray.500" }}
                            icon={<EditIcon />}
                          >
                            <span>Edit</span>
                          </MenuItem>
                          <MenuItem
                            minH="40px"
                            _hover={{ bgColor: "gray.600" }}
                            _focus={{ bgColor: "gray.500" }}
                            icon={<DeleteIcon />}
                          >
                            <span>Remove</span>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
};

export default Dashboard;
