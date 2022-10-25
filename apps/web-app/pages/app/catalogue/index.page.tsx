import { ChevronLeftIcon } from '@chakra-ui/icons';
import { HStack, IconButton, Flex, Button, Text, Box, Badge, Link } from '@chakra-ui/react';
import { NextPage } from 'next';
import Head from 'next/head';
import router from 'next/router';
import { Typography } from '../../../components/typography';
import { roleTextMap } from '../../../types/user';
import { Screen } from '../../../components/screen/screen';
import { useProductsQuery } from '../../../modules/api/queries/use-products';
import { useCallback, useRef } from 'react';
import { Product } from '../../../types/products';

const CataloguePage: NextPage = () => {
  const { data, error, isLoading } = useProductsQuery();

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
            Add a new product
          </Typography.Title>
        </HStack>
      </Screen.Header>
      <Screen.Content>
        <Flex direction="column" gap={'8px'} w="full">
          <HStack
            justify="space-between"
            background="white"
            boxShadow="0px 2px 4px rgba(0, 0, 0, 0.1);"
            paddingX="16px"
            paddingY="12px"
            marginBottom="-8px"
          >
            <Typography.Body>
              Products: <strong>{data.count}</strong>
            </Typography.Body>

            <Link color="brand.primary" fontWeight="bold">
              Filter
            </Link>
          </HStack>
          {data.products.map((product) => (
            <Box
              key={product.id}
              boxShadow=" 0px 8px 48px #EBEBEB, 0px 4px 8px rgba(89, 89, 89, 0.08), 0px 0px 1px rgba(89, 89, 89, 0.48);"
              padding="16px"
              width="full"
              onClick={() => router.push(`/app/catalogue/add/${encodeURIComponent(product.id)}`)}
            >
              <Typography.CallToAction>
                {product.name} ({product.quantity}
                {product.unit.toLowerCase()})
              </Typography.CallToAction>
              <Typography.Body small color="brand.darkGrey">
                {product.brand.name}
              </Typography.Body>
              <HStack gap="8px" mt="16px">
                <Badge paddingY="8px" paddingX="16px" rounded="full">
                  {product.category.name}
                </Badge>
                <Badge paddingY="8px" paddingX="16px" rounded="full">
                  {product.subCategory.descriptiveName}
                </Badge>
              </HStack>
            </Box>
          ))}
        </Flex>
      </Screen.Content>
      <Screen.Footer>
        <Button
          width="full"
          paddingX="12px"
          paddingY="24px"
          onClick={() => router.push('/app/catalogue/add')}
        >
          Add new product
        </Button>
      </Screen.Footer>
    </Screen>
  );
};

export default CataloguePage;
