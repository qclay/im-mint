import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";
import { Image } from "@chakra-ui/react";
import metamasklogo from "../../../images/metamask-logo.svg";
import { useTokenBalance } from "../../../hooks";

export default function ConnectButton({ handleOpenModal }) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const countOfNFT = useTokenBalance(account) 

  function handleConnectWallet() {
    activateBrowserWallet();
  }

  return account ? (
    <>
      <Box display='flex' alignItems='center' background='steelblue.900' borderRadius='xl' py='0'>
        <Box px='3'>
          <Text textStyle='normalbody'>
            {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH |{" "}
            {countOfNFT ? countOfNFT.toNumber() : 0} IM
          </Text>
        </Box>
        <Button
          onClick={handleOpenModal}
          colorScheme='steelblue'
          border='1px solid transparent'
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "gold.500",
            backgroundColor: "steelblue.400",
          }}
          borderRadius='xl'
          m='1px'
          px={3}
          height='48px'
        >
          <Text textStyle='normalbody' mr={2}>
            {account && `${account.slice(0, 6)}...${account.slice(account.length - 4, account.length)}`}
          </Text>
          <Identicon />
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Box display='flex' alignItems='center' background='steelblue.900' borderRadius='lg' py='0'>
        <Button
          leftIcon={
            <Box boxSize='45px'>
              <Image src={metamasklogo} alt='metamasklogo' />
            </Box>
          }
          bgColor='steelblue.900'
          color='gold.500'
          border='1px solid transparent'
          m='1px'
          px={3}
          height='48px'
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: "gold.100",
            backgroundColor: "steelblue.700",
          }}
          variant='solid'
          size='lg'
          onClick={handleConnectWallet}
        >
          Connect to MetaMask
        </Button>
      </Box>
    </>
  );
}
