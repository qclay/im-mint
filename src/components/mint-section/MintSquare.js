import { useDisclosure } from "@chakra-ui/hooks";

import ConnectButton from "./mint-square/ConnectButton";
import AccountModal from "./mint-square/AccountModal";
import MintButton from "./mint-square/MintButton";
import { NotificationsList } from "./mint-square/Notifications";
import { Box } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";

export default function MintSquare() {
  // Pull the disclosure methods
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <VStack px={3} py={2} spacing='20px' position='relative'>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />

        <MintButton />

        {/* Notifications normally is a popup absolute from bottom of screen, here I am making it absolute relative to its parent. Note the parent has position: relative */}
        <Box position='absolute' top={["445px", "445px", "455px"]}>
          <NotificationsList />
        </Box>
      </VStack>
      
    </>
  );
}
