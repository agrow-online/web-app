import { ChevronLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Flex } from '@chakra-ui/react';
import { Box } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { Typography } from '../../../components/typography';
import { roleTextMap } from '../../../types/user';
import { Screen } from '../../../components/screen/screen';

const InventoryPage: NextPage = () => {
  return (
    <Screen contentIsNotPadded>
      <Head>
        <title>Inventory | Agropreneur</title>
      </Head>

      <Screen.Header>
        <HStack w="full" justify="space-between" alignItems="center">
          <IconButton
            aria-label="Return to previous page"
            icon={<ChevronLeftIcon w={6} h={6} />}
            rounded="full"
            color="black"
            background="#E2E8F9"
            onClick={() => router.back()}
          ></IconButton>
          <Typography.Title flex="1" textAlign="center">
            Inventory
          </Typography.Title>
        </HStack>
      </Screen.Header>
      <Screen.Content>
        <Flex direction="column" gap={'8px'} w="full"></Flex>
      </Screen.Content>
    </Screen>
  );
};

export default InventoryPage;
