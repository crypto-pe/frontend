import {
  Box,
  Button,
  Container as ChakraContainer,
  FormControl,
  FormErrorMessage,
  Heading,
  Input
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { useSessionStore } from "store/session";
import { createNewAccount } from "utils/wallet";

interface SignUpFormInput {
  name: string;
  email: string;
}

export const SignUpPage = () => {
  const router = useRouter();
  const { account, setSession } = useSessionStore(state => ({
    account: state.account,
    setSession: state.setSession
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    setFocus
  } = useForm<SignUpFormInput>();

  const handleSignUp = async (data: SignUpFormInput) => {
    try {
      const newSession = await createNewAccount(data.name, data.email);
      setSession({ jwt: newSession.jwtToken, account: newSession.account });
    } catch (error) {
      if (error.code === "already exists") {
        setError("email", {
          message:
            "An account with the given email or wallet address already exists."
        });
      }
    }
  };

  useEffect(() => {
    console.log(router.query.email);
    if (router.query.email && typeof router.query.email === "string") {
      setValue("email", router.query.email);
      setFocus("name");
    } else {
      setFocus("email");
    }
  }, [router.query.email]);

  useEffect(() => {
    if (account) {
      router.push("/dashboard");
    }
  }, [account]);

  return (
    <Container>
      <ChakraContainer maxW="container.xl" mt={6}>
        <Image src="/images/Logo.png" width={140} height={30} />
      </ChakraContainer>
      <ChakraContainer maxW="lg" mt={32}>
        <Heading textAlign="center" fontSize="5xl">
          Sign Up
        </Heading>
        <ChakraContainer
          as={"form"}
          onSubmit={handleSubmit(handleSignUp)}
          maxW="sm"
          gap={4}
          display="flex"
          flexDir={"column"}
          mt={10}
        >
          <FormControl isInvalid={!!errors.email}>
            <Input
              placeholder="Email"
              variant="primary"
              bg="slategray"
              name="email"
              type="email"
              {...register("email", {
                required: "Email is required"
              })}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.name}>
            <Input
              placeholder="Name"
              variant="primary"
              bg="slategray"
              name="name"
              {...register("name", { required: "Name is required" })}
            />
            <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
          </FormControl>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </ChakraContainer>
      </ChakraContainer>
      <Box mt={"auto"} mb={-4}>
        <Image src="/images/office.png" width={584} height={381} />
      </Box>
    </Container>
  );
};

export default SignUpPage;
