import { Box, Grid, GridItem, Icon, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react';
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
import { CallToAction } from '../../../components/typography/typogaphy';
import { supabase } from '../../../module/api/client';
import { useBusinessQuery } from '../../../module/api/queries/use-profile';

const DashboardPage: NextPage = () => {
  const { data } = useBusinessQuery();
  console.log(data);
  return (
    <Screen withNavigation>
      <Head>
        <title>Staff | Agropreneur</title>
      </Head>

      <Screen.Header></Screen.Header>
      <Screen.Content>
        <Grid gap="12px" templateColumns="repeat(2, 1fr)">
          <GridItem>
            <LinkBox
              as={Box}
              background="#FDF0F0"
              border="3px solid #131723"
              borderRadius="16px"
              padding="20px"
            >
              <Icon as={HiOutlineUsers} color="#A92938" />
              <Link href="/app" passHref>
                <LinkOverlay>
                  <CallToAction display="flex" justifyContent="space-between" alignItems="center">
                    <span>Staff</span> <Icon as={HiArrowSmRight} />
                  </CallToAction>
                </LinkOverlay>
              </Link>
            </LinkBox>
          </GridItem>
        </Grid>
      </Screen.Content>
    </Screen>
  );
};

export default DashboardPage;
