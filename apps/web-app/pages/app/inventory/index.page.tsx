import { ChevronLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Flex, Button, Text, Box, Badge, Link, Center } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { Typography } from '../../../components/typography';
import { roleTextMap } from '../../../types/user';
import { Screen } from '../../../components/screen/screen';
import { useInventoryQuery } from '../../../modules/api/queries/use-inventory';
import { useCallback, useRef } from 'react';
import { Product } from '../../../types/products';

const CataloguePage: NextPage = () => {
  const { data, error, isLoading } = useInventoryQuery();

  if (isLoading) {
    return null;
  }

  if (error || !data) {
    return null;
  }

  return (
    <Screen contentIsNotPadded>
      <Head>
        <title>Inventory | agrow</title>
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
        <Flex direction="column" gap={'8px'} w="full">
          <Center height="100%" padding="16px">
            no inventory items
          </Center>
        </Flex>
      </Screen.Content>
      <Screen.Footer>
        <Button
          width="full"
          paddingX="12px"
          paddingY="24px"
          onClick={() => router.push('/app/catalogue')}
        >
          Add new product
        </Button>
      </Screen.Footer>
    </Screen>
  );
};

export default CataloguePage;
