import { ChevronLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Flex, Button } from '@chakra-ui/react';
import { Box } from 'framer-motion';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { Typography } from '../../../components/typography';
import { roleTextMap } from '../../../types/user';
import { Screen } from '../../../components/screen/screen';
import { useProductsQuery } from '../../../modules/api/queries/use-products';
import AutoSizer from 'react-virtualized-auto-sizer';

import InfiniteLoader from 'react-window-infinite-loader';
import { FixedSizeList } from 'react-window';
const InventoryPage: NextPage = () => {
  const { data, error } = useProductsQuery();
  const products = data ?? [];
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
        <Flex direction="column" gap={'8px'} w="full">
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                innerElementType="ul"
                itemData={products}
                itemCount={products.length}
                itemSize={20}
                height={height}
                width={width}
              >
                {({ data, index, style }) => {
                  return <li style={style}>{data[index].name}</li>;
                }}
              </FixedSizeList>
            )}
          </AutoSizer>
          ,
        </Flex>
      </Screen.Content>
      <Screen.Footer>
        <Button width="full" paddingX="12px" paddingY="24px">
          Add new product
        </Button>
      </Screen.Footer>
    </Screen>
  );
};

export default InventoryPage;
