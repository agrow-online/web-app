import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  LinkBox,
  Link,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import {
  withPageAuth,
  getUser,
  supabaseServerClient,
  supabaseClient,
} from '@supabase/auth-helpers-nextjs';

import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';

import {
  HiArrowSmRight,
  HiLogout,
  HiOutlineClipboardList,
  HiOutlineUsers,
  HiPhotograph,
} from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';
import { TileLink } from './components/tile-link';

const DashboardPage: NextPage = ({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Screen>
      <Head>
        <title>Dashboard | Agropreneur</title>
      </Head>

      <Screen.Header>
        <HStack w="full" justify="space-evenly" alignItems="center">
          <Typography.Title textAlign="center" flex="1">
            Hello, {profile.firstName}
          </Typography.Title>

          <Menu>
            <MenuButton as={Link}>
              <Avatar src={profile.avatarUrl} width="40px" height="40px" />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem icon={<Icon as={HiLogout} />}>Logout</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </HStack>
      </Screen.Header>
      <Screen.Content>
        <Grid gap="12px" templateColumns="repeat(2, 1fr)" w="full">
          <GridItem>
            <TileLink
              text="Inventory"
              href="/app/inventory"
              icon={HiOutlineClipboardList}
              iconColor="#0369A1"
              tileColor="#F0F9FF"
            />
          </GridItem>
          <GridItem>
            <TileLink
              text="Staff"
              href="/app/staff"
              icon={HiOutlineUsers}
              iconColor="#A92938"
              tileColor="#FDF0F0"
            />
          </GridItem>
        </Grid>
      </Screen.Content>
    </Screen>
  );
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/sign-in',
  async getServerSideProps(ctx) {
    // Access the user object
    const { user } = await getUser(ctx);
    const { data } = await supabaseServerClient(ctx).from('users').select('*').eq('id', user.id);

    return { props: { user, profile: data?.[0] } };
  },
});
