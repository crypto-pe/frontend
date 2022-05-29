import {
  Box,
  Button,
  Container as ChakraContainer,
  Heading,
  Text,
  Link as ChakraLink
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSessionStore } from "store/session";

import { login } from "utils/wallet";

export const LoginPage = () => {
  const router = useRouter();
  const { jwt, setSession } = useSessionStore(state => ({
    jwt: state.jwt,
    setSession: state.setSession
  }));

  const handleLogin = async () => {
    const newSession = await login();
    setSession({ jwt: newSession.jwtToken, account: newSession.account });
  };

  useEffect(() => {
    if (jwt) {
      router.push("/dashboard");
    }
  }, [jwt]);

  return (
    <Container>
      <ChakraContainer maxW="container.xl" mt={6}>
        <Image src="/images/Logo.png" width={140} height={30} />
      </ChakraContainer>
      <ChakraContainer maxW="lg" mt={32}>
        <Heading textAlign="center" fontSize="5xl">
          Login With Wallet
        </Heading>
        <ChakraContainer
          maxW="sm"
          gap={4}
          display="flex"
          flexDir={"column"}
          mt={10}
        >
          <Button variant="primary" type="submit" onClick={handleLogin}>
            Connect Your Wallet
          </Button>
        </ChakraContainer>
        <Text textAlign={"center"} mt={2} color="gray.400">
          Don&apos;t have an account?{" "}
          <Link href="/signup">
            <ChakraLink color="primary.500">Sign Up</ChakraLink>
          </Link>
        </Text>
      </ChakraContainer>
      <Box mt={"auto"} mb={-4}>
        <Image src="/images/office.png" width={584} height={381} />
      </Box>
    </Container>
  );
};

export default LoginPage;
