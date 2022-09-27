import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { HiArrowSmRight } from 'react-icons/hi';

import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import { getUser, supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs';

import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';
import { useBusinessQuery } from '../../../module/api/queries/use-profile';
import { roleTextMap } from '../../../types/user';

const StaffPage: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data, error } = useBusinessQuery(user.id);

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Screen contentIsNotPadded>
      <Head>
        <title>Staff | Agropreneur</title>
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
            Staff
          </Typography.Title>
        </HStack>
      </Screen.Header>
      <Screen.Content>
        <Flex direction="column" gap={'8px'} w="full">
          {data.employees.map((employee) => (
            <Box
              key={employee.id}
              boxShadow=" 0px 8px 48px #EBEBEB, 0px 4px 8px rgba(89, 89, 89, 0.08), 0px 0px 1px rgba(89, 89, 89, 0.48);"
              padding="24px"
              width="full"
            >
              <Typography.CallToAction>
                {employee.firstName} {employee.lastName}
              </Typography.CallToAction>

              <Typography.Body small color="brand.darkGrey">
                {roleTextMap[employee.role]}
              </Typography.Body>
            </Box>
          ))}
        </Flex>
      </Screen.Content>
    </Screen>
  );
};

export default StaffPage;

// TODO: place logic in a shared place
export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/sign-in',
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data } = await supabaseServerClient(ctx).from('users').select('*').eq('id', user.id);

    return { props: { user, profile: data?.[0] } };
  },
});
