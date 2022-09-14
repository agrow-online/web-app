import { Box, Grid, GridItem, Icon, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react';

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { HiArrowSmRight, HiOutlineUsers } from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';

const DashboardPage: NextPage = () => {
  return (
    <Screen withNavigation>
      <Head>
        <title>Dashboard | Agropreneur</title>
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
              <Link href="/app/staff" passHref>
                <LinkOverlay>
                  <Typography.CallToAction
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span>Staff</span> <Icon as={HiArrowSmRight} />
                  </Typography.CallToAction>
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
