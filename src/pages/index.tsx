import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack
} from "@chakra-ui/react";
import { MotionBox } from "components/Motion/Box.motion";

import { Navbar } from "components/Navbar.component";
import { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const imgVariants: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: { ease: "easeInOut", duration: 0.5 }
  },
  hidden: { opacity: 0, x: 300 }
};

const container: Variants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeInOut", duration: 0.5 }
  },
  hidden: { opacity: 0, y: 70 }
};

const Index = () => {
  const [email, setEmail] = useState("");

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      bg="black"
      color="light"
      transition="all 0.15s ease-out"
      minH="100vh"
      h="100%"
      overflow="hidden"
    >
      <Navbar />
      <Box
        w="100%"
        mt={32}
        position="relative"
        display={"flex"}
        flexDir="column"
        alignItems={{ base: "center", xl: "normal" }}
        // px={16}
      >
        <Box>
          <MotionBox
            maxW={"container.xl"}
            mx={{ base: "auto" }}
            animate="visible"
            initial="hidden"
            variants={container}
          >
            <Text
              fontSize={"sm"}
              fontWeight="bold"
              color="gray"
              textTransform="uppercase"
            >
              Welcome To CryptoPe
            </Text>
            <Heading fontWeight="bold" fontSize={"7xl"}>
              Pay your <br /> Employees
              <br /> with Crypto
            </Heading>
            <VStack
              maxW="md"
              mt={10}
              display="flex"
              alignItems="flex-end"
              id="main"
            >
              {/* DO NOT TOUCH. Chakra places InputElements with absolute positioning, so explicit values are being used  */}
              <InputGroup display="flex" alignItems="center" h={16}>
                <InputLeftElement my={3} ml={4}>
                  <Image src="/icons/at.svg" width={32} height={32} />
                </InputLeftElement>

                <Input
                  borderRadius="full"
                  borderBottomRightRadius={0}
                  bgColor="#1A75FF12"
                  variant="filled"
                  placeholder="Your Email"
                  type="email"
                  aria-label="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  my={4}
                  pr={4}
                  pl={16}
                  h={16}
                  _hover={{
                    backgroundColor: "gray.800"
                  }}
                  overflow="none"
                />
              </InputGroup>
              <Link href={`/signup?email=${email}`}>
                <Button
                  marginLeft="auto"
                  bgColor="primary.500"
                  size="lg"
                  borderRadius={"full"}
                  borderTopRightRadius="0"
                  marginTop={0}
                  _hover={{
                    bgColor: "primary.600"
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </VStack>
          </MotionBox>
        </Box>
        <MotionBox
          position={{ base: "relative", xl: "absolute" }}
          mt={{ base: 10, xl: -10 }}
          ml="auto"
          top="0"
          right="0"
          variants={imgVariants}
          initial="hidden"
          animate="visible"
          shadow={"xl"}
        >
          <Image src="/images/home-demo.png" width={720} height={700} />
        </MotionBox>
      </Box>
    </Flex>
  );
};

export default Index;
