import {
  getExplorerTransactionLink,
  useNotifications,
  useTransactions,
  getStoredTransactionState,
  shortenTransactionHash,
} from "@usedapp/core";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { formatEther } from "@ethersproject/units";
import { BigNumber } from "ethers";
import { HStack, Link } from "@chakra-ui/layout";
import { Text } from "@chakra-ui/layout";
import { ExternalLinkIcon, CheckIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import { chakra, Icon, Flex } from "@chakra-ui/react";
import { GrConnect } from "react-icons/gr";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsLightningFill } from "react-icons/bs";

//---------format balance-------------//
const formatter = new Intl.NumberFormat("en-us", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

const formatBalance = (balance) => formatter.format(parseFloat(formatEther(balance ?? BigNumber.from("0"))));
//---------end format balance-------------//

const TransactionLink = ({ transaction }) => (
  <>
    {transaction && (
      <Link
        href={getExplorerTransactionLink(transaction.hash, transaction.chainId)}
        target='_blank'
        rel='noopener noreferrer'
        _focus={{ boxShadow: "none" }}
      >
        <HStack color='white'>
          <Text textStyle='normalbody' fontSize='md'>
            View on Etherscan
          </Text>
          <ExternalLinkIcon />
        </HStack>
      </Link>
    )}
  </>
);

const notificationContent = {
  transactionFailed: { title: "Transaction failed", icon: <Icon as={BsLightningFill} color='white' boxSize={6} /> },
  transactionStarted: {
    title: "Transaction Started",
    icon: <Icon as={AiOutlineClockCircle} color='white' boxSize={6} />,
  },
  transactionSucceed: {
    title: "Transaction Succeeded",
    icon: <Icon as={IoMdCheckmarkCircle} color='white' boxSize={6} />,
  },
  walletConnected: { title: "Wallet connected", icon: <Icon as={GrConnect} color='white' boxSize={6} /> },
};

const MotionBox = motion(Box);

//------------Transaction History List---------------//
// const ListElementWrapper = styled(motion.div)`
//   display: flex;
//   justify-content: left;
// `;

const DateCell = ({ date }) => {
  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString();
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <HStack>
      <Text textStyle='normalbody' fontSize='md' ml='2'>
        {formattedDate}
      </Text>
      <Text textStyle='normalbody' fontSize='md' ml='2'>
        {formattedTime}
      </Text>
    </HStack>
  );
};

const ListElement = ({ transaction, icon, title, date }) => {
  return (
    <MotionBox layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <HStack color='white'>
        {icon}
        <Text textStyle='normalbody' fontSize='md'>
          {title}
        </Text>
        <TransactionLink transaction={transaction} />
        <DateCell date={date} />
      </HStack>
    </MotionBox>
  );
};

function TransactionIcon(transaction) {
  if (getStoredTransactionState(transaction) === "Mining") {
    return <Icon as={AiOutlineClockCircle} color='white' boxSize={6} />;
  } else if (getStoredTransactionState(transaction) === "Fail") {
    return <Icon as={BsLightningFill} color='white' boxSize={6} />;
  } else if (transaction.transactionName === "mint") {
    return <Icon as={AiOutlineClockCircle} color='white' boxSize={6} />;
  } else {
    return <CheckIcon />;
  }
}

export const TransactionsList = () => {
  const { transactions } = useTransactions();
  return (
    <AnimatePresence initial={false}>
      {transactions.map((transaction) => (
        <ListElement
          transaction={transaction.transaction}
          title={transaction.transactionName}
          icon={TransactionIcon(transaction)}
          key={transaction.transaction.hash}
          date={transaction.submittedAt}
        />
      ))}
    </AnimatePresence>
  );
};

//------------End Transaction History List---------------//

//-------------Notification Toasts-------------------------//

const NotificationElement = ({ transaction, icon, title }) => {
  return (
    <>
      {" "}
      <MotionBox layout initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
        <Flex w='full' p={5} alignItems='center' justifyContent='center'>
          <Flex maxW='sm' w='full' mx='auto' bg='steelblue.900' shadow='md' rounded='lg' overflow='hidden'>
            <Flex justifyContent='center' alignItems='center' w={12} bg='neutral.500'>
              {icon}
            </Flex>

            <Box mx={-3} py={2} px={4}>
              <Box mx={3}>
                <chakra.span color='gold.500' fontWeight='bold'>
                  {title}
                </chakra.span>

                <TransactionLink transaction={transaction} />

                <HStack>
                  <Text textStyle='normalbody' fontSize='md'>
                    {transaction && `${shortenTransactionHash(transaction?.hash)} #${transaction.nonce}`}{" "}
                  </Text>

                  {transaction && (
                    <Text textStyle='normalbody' fontSize='md' style={{ marginRight: "auto" }}>
                      ( - {formatBalance(transaction.value)} ETH )
                    </Text>
                  )}
                </HStack>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </MotionBox>
    </>
  );
};

export const NotificationsList = () => {
  const { notifications } = useNotifications();
  return (
    <Box>
      {/* change initial to false so it won't show at beginning*/}
      <AnimatePresence initial={true}>
        {notifications.map((notification) => {
          if ("transaction" in notification)
            return (
              <NotificationElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
                transaction={notification.transaction}
                date={Date.now()}
              />
            );
          else
            return (
              <NotificationElement
                key={notification.id}
                icon={notificationContent[notification.type].icon}
                title={notificationContent[notification.type].title}
                date={Date.now()}
              />
            );
        })}
      </AnimatePresence>
    </Box>
  );
};

//-------------end Notification Bottom Toast------------------//
