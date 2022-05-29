import {
  Box,
  Button,
  Container as ChakraContainer,
  Heading
} from "@chakra-ui/react";
import { Container } from "components/Container.component";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSessionStore } from "store/session";

import { login } from "utils/wallet";

export const SignUpPage = () => {
  const router = useRouter();
  const { account, setSession } = useSessionStore(state => ({
    account: state.account,
    setSession: state.setSession
  }));

  const handleLogin = async () => {
    const newSession = await login();
    setSession({ jwt: newSession.jwtToken, account: newSession.account });
  };

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
      </ChakraContainer>
      <Box mt={"auto"} mb={-4}>
        <Image src="/images/office.png" width={584} height={381} />
      </Box>
    </Container>
  );
};

export default SignUpPage;
