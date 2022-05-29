import {
  Box,
  Heading,
  Input,
  Container as ChakraContainer,
  Button,
  Select,
  Text
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import { NextPage } from "next";
import Image from "next/image";

const CreateOrganizationPage: NextPage = () => {
  return (
    <Container>
      {/* <VStack
        mx={5}
        mt={4}
        justifyContent="flex-start"
        alignItems={"flex-start"}
      > */}
      <ChakraContainer maxW="container.xl" mt={6}>
        <Image src="/images/Logo.png" width={140} height={30} />
      </ChakraContainer>

      <ChakraContainer maxW="lg" mt={32}>
        <Heading textAlign="center">Create Organization</Heading>
        <ChakraContainer
          maxW="sm"
          gap={4}
          display="flex"
          flexDir={"column"}
          mt={10}
        >
          <Input
            placeholder="Organization/Company Name"
            variant="primary"
            bg="slategray"
          />
          <Box>
            <Select placeholder="Choose a Stable Coin" variant="primary">
              <option value="usdc">USDC</option>
              <option value="dai">DAI</option>
            </Select>
            <Text color="gray" mt={1} fontSize={"xs"}>
              You can change this later
            </Text>
          </Box>
          {/* todo: add submit handler */}
          <Button mt={4} variant="primary">
            Create Organization
          </Button>
        </ChakraContainer>
      </ChakraContainer>
      <Box mt={"auto"} mb={-4}>
        <Image src="/images/office.png" width={584} height={381} />
      </Box>

      {/* </VStack> */}
    </Container>
  );
};

export default CreateOrganizationPage;
