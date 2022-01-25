import { useEthers } from "@usedapp/core";
import { useState } from "react";
import { Box, Text, Button, Center } from "@chakra-ui/react";
import { useContractMethod } from "../../../hooks";
import { utils } from "ethers";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/react";
import { WarningIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { presaleFFTokenPrice, presaleTokenPrice, tokenPrice } from "../../../contracts/config"
import { useOnlyWhitelistedFF, useOnlyWhitelisted, useOnlyPublicSale } from "../../../hooks";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { whitelistHashedAddresses } from "../../../contracts/config";


export default function MintButton() {
  const MAX_MINT_AMOUNT_whitelistFF = 1;
  const MAX_MINT_AMOUNT_whitelist = 2;
  const MAX_MINT_AMOUNT_publicSale = 1;
  const TOOL_TIP_TEXT = 'Max 2 NFTs for Whitelist. Max 1 NFT for Public Sale.'

  const { account, chainId } = useEthers();
  const { state: mintStateWhitelistedFF, send: mintWhitelistedFF } = useContractMethod("mintWhitelistedFF");
  const { state: mintStateWhitelisted, send: mintWhitelisted } = useContractMethod("mintWhitelisted");
  const { state: mintStatePublicSale, send: mintPublicSale } = useContractMethod("mintPublicSale");

  const onlyWhitelistedFF = useOnlyWhitelistedFF(account)
  const onlyWhitelisted = useOnlyWhitelisted(account)
  const onlyPublicSale = useOnlyPublicSale(account)


  //const { notifications } = useNotifications();
  //console.log( " {notifications}",notifications[0].transaction.hash)
  const [input, setInput] = useState(1);

  async function handleSetCountMintButtonClick() {
    const _count = parseInt(input);

    console.log("_count: ", _count);
    console.log("mintStateWhitelistedFF: ", mintStateWhitelistedFF)
    console.log("mintStateWhitelisted: ", mintStateWhitelisted)
    console.log("mintStatePublicSale: ", mintStatePublicSale)
    console.log("onlyWhitelistedFF: ", onlyWhitelistedFF)
    console.log("onlyWhitelisted: ", onlyWhitelisted)
    console.log("onlyPublicSale: ", onlyPublicSale)

    if (onlyWhitelistedFF) {
      //merkle
      const leafNodes = whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const addr = account
      const hexProof = merkleTree.getHexProof(keccak256(addr));

      if (_count) {
        mintWhitelistedFF(_count, hexProof, {
          value: utils.parseEther((presaleFFTokenPrice * input).toString()),
        }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
      }
    }

    if (onlyWhitelisted) {
      //merkle
      const leafNodes = whitelistHashedAddresses.map((leafJson) => Buffer.from(leafJson, "hex"));
      const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
      const addr = account
      const hexProof = merkleTree.getHexProof(keccak256(addr));

      if (_count) {
        mintWhitelisted(_count, hexProof, {
          value: utils.parseEther((presaleTokenPrice * input).toString()),
        }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
      }
    }

    if (onlyPublicSale) {
      if (_count) {
        mintPublicSale(_count, {
          value: utils.parseEther((tokenPrice * input).toString()),
        }); //calling the mint here! arguments and a config object at end for value wow read comments here https://dev.to/jacobedawson/send-react-web3-dapp-transactions-via-metamask-2b8n
      }
    }
  }

  function handleInput(valueAsString) {
    setInput(valueAsString);
  }

  return (
    <Box
      width={["330px", "460px"]}
      minHeight={["240px", "240px"]}
      alignItems='center'
      background='steelblue.900'
      borderRadius='xl'
      p='15px'
    >
      <Tooltip
        hasArrow
        label={TOOL_TIP_TEXT}
        bg='neutral.500'
        placement='top'
      >
        <Center>
          <NumberInput
            size='lg'
            maxW='77px'
            min={1}
            max={onlyWhitelistedFF ? MAX_MINT_AMOUNT_whitelistFF : (onlyWhitelisted ? MAX_MINT_AMOUNT_whitelist : MAX_MINT_AMOUNT_publicSale)}
            my={2}
            value={input}
            onChange={handleInput}
            allowMouseWheel
            errorBorderColor='red.500'
            focusBorderColor='gold.500'
            inputMode='numeric'
            precision={0}
            aria-label='number of NFTs to mint'
          >
            <NumberInputField color='white' />
            <NumberInputStepper>
              <NumberIncrementStepper color='white' />
              <NumberDecrementStepper color='white' />
            </NumberInputStepper>
          </NumberInput>
        </Center>
      </Tooltip>

      <Box
        minHeight="30px"
        alignItems='center'
        background='steelblue.900'
        borderRadius='xl'
        p='15px'
      >
      </Box>

      {/* IMPORTANT to DISABLE MINTING BUTTON set disabled={true}   */}
      {/* IMPORTANT to ENABLE BACK MINTING set disabled={!account}   */}

      <Button
        disabled={!account}
        bgColor='gold.500'
        color='white'
        border='1px solid transparent'
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "steelblue.100",
          backgroundColor: "gold.100",
        }}
        _focus={{ boxShadow: "none" }}
        variant='solid'
        size='lg'
        isFullWidth
        onClick={handleSetCountMintButtonClick}
        mt={0}
        mb={8}
        textStyle='clock'
      >
        Mint {input} Internet Made NFT!
      </Button>

      {!account ? (
        <Center>
          <Text textStyle='normalbody' fontSize='md'>
            To Start Minting, Connect to MetaMask First.
          </Text>
        </Center>
      ) : (mintStateWhitelistedFF.status === "Mining" || mintStateWhitelisted.status === "Mining" || mintStatePublicSale.status === "Mining") ? (
        <>
          <Center>
            <HStack>
              <Spinner thickness='8px' speed='0.65s' emptyColor='steelblue.100' color='gold.500' size='md' />
              <Text textStyle='normalbody' fontSize='md'>
                Miners hard at work making your NFT!
              </Text>
            </HStack>
          </Center>
        </>
      ) : (mintStateWhitelistedFF.status === "Exception" || mintStateWhitelisted.status === "Exception" || mintStatePublicSale.status === "Exception") ? (
        <>
          <Center>
            <HStack>
              <WarningTwoIcon w={[3, 5]} h={[3, 5]} color='red.500' ml={1} />
              <Text textStyle='normalbody' fontSize='md'>
                {mintStateWhitelistedFF.errorMessage && mintStateWhitelistedFF.errorMessage.slice(0, 31) === "err: insufficient funds for gas" ? "Insufficient funds in current connected Account" : mintStateWhitelistedFF.errorMessage}
                {mintStateWhitelisted.errorMessage && mintStateWhitelisted.errorMessage.slice(0, 31) === "err: insufficient funds for gas" ? "Insufficient funds in current connected Account" : mintStateWhitelisted.errorMessage}
                {mintStatePublicSale.errorMessage && mintStatePublicSale.errorMessage.slice(0, 31) === "err: insufficient funds for gas" ? "Insufficient funds in current connected Account" : mintStatePublicSale.errorMessage}
              </Text>
            </HStack>
          </Center>
        </>
      ) : (
        <Center>
          {chainId !== 1 ? (
            <>
              <Text textStyle='normalbody' fontSize={["sm", "md"]}>
                You are NOT connected to Ethereum Mainnet.{" "}
              </Text>
              <Tooltip
                hasArrow
                label='Please use your Metamask wallet to change the network to Ethereum Mainnet to begin minting.'
                bg='red.600'
              >
                <WarningIcon w={[3, 5]} h={[3, 5]} color='red.500' ml={1} />
              </Tooltip>
            </>
          ) : (
            <>
              <Text textStyle='normalbody' fontSize={["sm", "md"]}>
                Connected to Ethereum Mainnet.
              </Text>
            </>
          )}
        </Center>
      )}
    </Box>
  );
}
