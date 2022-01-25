import { Container } from "@chakra-ui/react";

import MintSquare from "./MintSquare";

import { VStack, Text, Center } from "@chakra-ui/react";

import { Box } from "@chakra-ui/layout";

import Slide from "react-reveal/Slide";

export default function MintSection() {
  return (
    <>
      <VStack spacing={4} my="40px">

        <Text align='center' textStyle='subheads' id='minty' mb='0px' mx="10px">
          Internet Made
        </Text>

        <Box align='center' textAlign='center' maxWidth="88%">
          <Text as='span' textStyle='emphasis' fontSize='4xl' maxWidth='43ch' align='center'>
            Playing with Reality!
          </Text>
        </Box>

        <Container maxW={"1200px"} py={8} px={0}>
          <Container maxW={"600px"}>
            <Slide bottom>
              <Center>
                <MintSquare />
              </Center>
            </Slide>
          </Container>
        </Container>
      </VStack>
      {/* <Box visibility='hidden' my='30px'>
        -
      </Box> */}
    </>
  );
}
