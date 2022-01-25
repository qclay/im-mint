
import { Box, Center, VStack } from "@chakra-ui/layout";
import { Progress } from "@chakra-ui/react";

export default function LogoSplash() {
  return (
    <>
      <Center height='100vh' width='100%'>
        <VStack>
          <Box width='300px'>
            <Progress size='sm' isIndeterminate colorScheme='red' />
          </Box>
        </VStack>
      </Center>
    </>
  );
}
