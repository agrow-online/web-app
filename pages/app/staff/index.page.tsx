import {
  Box,
  Flex,
  Grid,
  GridItem,
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  HiArrowRight,
  HiArrowSmRight,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiShoppingCart,
  HiUsers,
} from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';
import { CallToAction } from '../../../components/typography/typogaphy';
import { supabase } from '../../../module/api/client';
import { useBusinessQuery } from '../../../module/api/queries/use-profile';

const DashboardPage: NextPage = () => {
  const { data, error, isLoading } = useBusinessQuery();

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }
  // TODO: map roles

  return (
    <Screen notPadded>
      <Head>
        <title>Staff | Agropreneur</title>
      </Head>

      <Screen.Header />
      <Screen.Content>
        <Flex direction="column" gap={'8px'}>
          {data.employees.map((employee) => (
            <Flex
              direction="row"
              justifyContent="space-between"
              key={employee.id}
              boxShadow=" 0px 8px 48px #EBEBEB, 0px 4px 8px rgba(89, 89, 89, 0.08), 0px 0px 1px rgba(89, 89, 89, 0.48);"
              margin="0 !important"
              padding="24px"
            >
              <Box>
                <Typography.CallToAction>
                  {employee.firstName} {employee.lastName}
                </Typography.CallToAction>

                <Typography.Body small color="brand.darkGrey">
                  {employee.role}
                </Typography.Body>
              </Box>
              <Icon as={HiArrowSmRight} />
            </Flex>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  );
};

export default DashboardPage;
