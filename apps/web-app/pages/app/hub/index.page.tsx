import {
  Avatar,
  Grid,
  GridItem,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from '@chakra-ui/react';
import { createBrowserSupabaseClient, withPageAuth } from '@supabase/auth-helpers-nextjs';
import { InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { HiLogout, HiOutlineClipboardList, HiOutlineUsers } from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';
import { TileLink } from './components/tile-link';

const DashboardPage: NextPage = ({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  const logout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/');
  };
  return (
    <Screen>
      <Head>
        <title>Dashboard | agrow</title>
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
                <MenuItem icon={<Icon as={HiLogout} />} onClick={logout}>
                  Logout
                </MenuItem>
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
          {profile.role === 'ADMIN' ? (
            <GridItem>
              <TileLink
                text="Staff"
                href="/app/staff"
                icon={HiOutlineUsers}
                iconColor="#A92938"
                tileColor="#FDF0F0"
              />
            </GridItem>
          ) : null}
        </Grid>
      </Screen.Content>
    </Screen>
  );
};

export default DashboardPage;

export const getServerSideProps = withPageAuth({
  redirectTo: '/sign-in',
  async getServerSideProps(ctx, supabase) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase.from('users').select('*').eq('id', user?.id);

    return { props: { user, profile: data?.[0] ?? null } };
  },
});
