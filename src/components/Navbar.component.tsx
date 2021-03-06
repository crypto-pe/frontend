import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button, Center } from "@chakra-ui/react";
import { Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useSessionStore } from "store/session";
import { MotionFlex } from "./Motion/Box.motion";

const navbarVariants: Variants = {
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  },
  hidden: {
    y: -100,
    opacity: 0.3
  }
};

export const Navbar = () => {
  const account = useSessionStore(state => state.account);

  return (
    <Center w="100%">
      <MotionFlex
        animate="visible"
        initial="hidden"
        variants={navbarVariants}
        justifyContent="space-between"
        alignItems="center"
        maxW="container.xl"
        w="100%"
        bgColor="darken"
        borderRadius={16}
        px={6}
        py={4}
        mt={4}
        marginX="8"
      >
        <Image src="/images/Logo.png" width={140} height={30} />
        {account?.name ? (
          <Link href="/dashboard">
            <Button
              rightIcon={<ChevronRightIcon />}
              rounded={"full"}
              px={5}
              py={6}
              variant="primary"
            >
              Dashboard
            </Button>
          </Link>
        ) : (
          <Link href="login">
            <Button
              leftIcon={<Image width={24} height={24} src="/icons/disc.svg" />}
              rounded={"full"}
              px={5}
              py={6}
              variant="primary"
            >
              Login
            </Button>
          </Link>
        )}
      </MotionFlex>
    </Center>
  );
};
