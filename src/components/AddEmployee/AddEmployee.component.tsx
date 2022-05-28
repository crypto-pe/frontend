import { AddIcon, CloseIcon, CopyIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

export const AddEmployee = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isLinkModalOpen,
    onOpen: onLinkModalOpen,
    onClose: onLinkModalClose
  } = useDisclosure();

  const handleAddEmployee = () => {
    onClose();
    onLinkModalOpen();
  };

  const handleAnother = () => {
    onLinkModalClose();
    onOpen();
  };

  return (
    <>
      <Button variant="unstyled" onClick={onOpen}>
        <Image src="/icons/user-plus.svg" width={32} height={32} />
      </Button>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent bg="darken" color="light" mt={40}>
          <ModalHeader
            alignItems={"center"}
            justifyContent="space-between"
            gap={6}
            display="flex"
          >
            {" "}
            <Box>
              <Image src="/icons/user-plus.svg" width={28} height={28} />
            </Box>{" "}
            <Text mb={1}>Add Employee</Text>
            <IconButton
              variant="unstyled"
              aria-label="Close modal"
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            <VStack maxW="xs" mx="auto" gap={4}>
              <Input
                variant="primary"
                placeholder="Employee Name"
                autoFocus={true}
              />
              <Input variant="primary" placeholder="Enter Role" />
              <InputGroup size="md" w="40">
                <Input placeholder="Salary" variant="primary" />
                <InputRightAddon bg="gray.800" borderColor="gray.800">
                  USDT
                </InputRightAddon>
              </InputGroup>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center" mt={14} mb={6}>
            <Button variant="primary" w={40} onClick={handleAddEmployee}>
              Invite Now
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Link Copy Modal */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isLinkModalOpen}
        onClose={onLinkModalClose}
        size="md"
      >
        <ModalOverlay />
        <ModalContent bg="darken" color="light" mt={40}>
          <ModalHeader
            alignItems={"center"}
            justifyContent="space-between"
            gap={6}
            display="flex"
          >
            {" "}
            <Box>
              <Image src="/icons/user-plus.svg" width={28} height={28} />
            </Box>{" "}
            <Text mb={1}>Add Employee</Text>
            <IconButton
              variant="unstyled"
              aria-label="Close modal"
              onClick={onLinkModalClose}
            >
              <CloseIcon />
            </IconButton>
          </ModalHeader>

          <ModalBody>
            <VStack maxW="md" mx="auto" gap={4}>
              <InputGroup>
                <Input
                  value="https://asdasd.com/asdasd/asd/asd/asd"
                  isReadOnly
                  variant="primary"
                />
                <InputRightElement bg="gray.800" borderColor="gray.800">
                  <IconButton
                    borderLeftRadius={0}
                    aria-label="Copy link"
                    _focus={{ bgColor: "primary.500" }}
                    variant="unstyled"
                  >
                    <CopyIcon />
                  </IconButton>
                </InputRightElement>
              </InputGroup>
              <Text fontSize={"sm"} color="gray" w={"sm"}>
                Send this link to your new employee. This link will be only
                valid for 24 hrs. <br /> WARNING: DO NOT SEND THIS LINK TO
                ANYONE ELSE
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter justifyContent="center" mt={14} mb={6}>
            <Button
              variant="outline"
              leftIcon={<AddIcon />}
              onClick={handleAnother}
            >
              Add Another
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
