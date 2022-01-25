import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  //ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useEthers, useEtherBalance } from "@usedapp/core";
import Identicon from "./Identicon";
import { useTokenBalance } from "../../../hooks";
import { formatEther } from "@ethersproject/units";
import { TransactionsList } from "./Notifications";
import { useRef } from "react";
import { HStack } from "@chakra-ui/layout";

export default function AccountModal({ isOpen, onClose }) {
  const { account, deactivate } = useEthers();
  const etherBalance = useEtherBalance(account);
  const countOfNFT = useTokenBalance(account);

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }

  const initialRef = useRef();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='md' initialFocusRef={initialRef} scrollBehavior='outside' isCentered>
      <ModalOverlay />
      <ModalContent
        background='steelblue.900'
        border='1px'
        borderStyle='solid'
        borderColor='steelblue.500'
        borderRadius='2xl'
      >
        <ModalHeader color='whiteAlpha.500' px={4} fontSize='lg' fontWeight='medium'>
          Account
        </ModalHeader>
        <ModalCloseButton
          ref={initialRef}
          color='white'
          fontSize='sm'
          _focus={{ boxShadow: "none" }}
          _hover={{
            color: "gold.500",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box borderRadius='2xl' border='1px' borderStyle='solid' borderColor='steelblue.500' px={3} py={3} mb={2}>
            <Flex justifyContent='space-between' alignItems='center' mb={3}>
              <Text color='whiteAlpha.500' fontSize='sm'>
                Connected with MetaMask
              </Text>
              <Button
                variant='outline'
                size='sm'
                borderColor='gold.900'
                borderRadius='2xl'
                color='gold.100'
                fontSize='13px'
                fontWeight='normal'
                px={2}
                height='26px'
                _hover={{
                  background: "none",
                  borderColor: "gold.500",
                  textDecoration: "underline",
                }}
                onClick={handleDeactivateAccount}
              >
                Disconnect
              </Button>
            </Flex>
            <HStack alignItems='left' my={3}>
              <Identicon />

              <Link
                display='flex'
                alignItems='center'
                href={`https://etherscan.io/address/${account}`}
                isExternal
                _focus={{ boxShadow: "none" }}
                _hover={{
                  color: "white",
                  textDecoration: "underline",
                }}
              >
                <HStack color='white'>
                  <Text color='white' fontSize={["sm", "md", "md"]} lineHeight='1.2'>
                    {account && `${account}`}
                  </Text>
                  <ExternalLinkIcon ml={1} />
                </HStack>
              </Link>
            </HStack>
            <Text textStyle='normalbody' fontSize='md' lineHeight='1.2'>
              {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH (Ethereum)
            </Text>
            <Text textStyle='normalbody' fontSize='md' lineHeight='1.2'>
              {countOfNFT ? countOfNFT.toNumber() : 0} IM (Internet Made NFT)
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter
          justifyContent='start'
          background='steelblue.700'
          borderBottomLeftRadius='2xl'
          borderBottomRightRadius='2xl'
          p={4}
        >
          <Box>
            <Text color='whiteAlpha.500' fontSize='lg' fontWeight='medium' lineHeight='150%'>
              Transactions History
            </Text>

            <TransactionsList />
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
