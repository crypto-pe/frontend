import {
  Box,
  Heading,
  Input,
  Container as ChakraContainer,
  Button,
  Select,
  Text,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import { NextPage } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { TokenType } from "utils/api.gen";
import client from "utils/client";

interface CreateOrganizationInputs {
  name: string;
  token: TokenType;
}

const CreateOrganizationPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    setFocus
  } = useForm<CreateOrganizationInputs>();
  const handleCreateOrganization = async (data: CreateOrganizationInputs) => {
    const organization = await client.createOrganization({
      name: data.name,
      token: data.token
    });
  };
  return (
    <Container>
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
          as="form"
          onSubmit={handleSubmit(handleCreateOrganization)}
        >
          <FormControl isInvalid={!!errors.name}>
            <Input
              placeholder="Organization/Company Name"
              variant="primary"
              bg="slategray"
              {...register("name", { required: "Name is required" })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <Box>
            <FormControl isInvalid={!!errors.token}>
              <Select
                placeholder="Choose a Stable Coin"
                variant="primary"
                {...register("token", { required: "Select one" })}
              >
                <option value="usdc">USDC</option>
                <option value="dai">DAI</option>
              </Select>
              <FormErrorMessage>{errors.token?.message}</FormErrorMessage>
            </FormControl>
            <Text color="gray" mt={1} fontSize={"xs"}>
              You can change this later
            </Text>
          </Box>
          {/* todo: add submit handler */}
          <Button mt={4} variant="primary" type="submit">
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
