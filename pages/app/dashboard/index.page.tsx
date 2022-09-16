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

import { HiArrowSmRight, HiLogout, HiOutlineUsers, HiPhotograph } from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';

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
                <MenuItem icon={<Icon as={HiPhotograph} />}>Change your picture</MenuItem>
                <MenuDivider />
                <MenuItem icon={<Icon as={HiLogout} />}>Logout</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </HStack>
      </Screen.Header>
      <Screen.Content>
        <Grid gap="12px" templateColumns="repeat(2, 1fr)" w="full">
          <GridItem>
            <LinkBox
              as={Box}
              background="#FDF0F0"
              border="3px solid #131723"
              borderRadius="16px"
              padding="20px"
            >
              <Icon as={HiOutlineUsers} color="#A92938" />
              <NextLink href="/app/staff" passHref>
                <LinkOverlay>
                  <Typography.CallToAction
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <span>Staff</span> <Icon as={HiArrowSmRight} />
                  </Typography.CallToAction>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
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
