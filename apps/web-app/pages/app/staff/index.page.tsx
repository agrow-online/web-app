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
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  LinkBox,
  LinkOverlay,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { Role } from '@prisma/client';
import { getUser, supabaseServerClient, withPageAuth } from '@supabase/auth-helpers-nextjs';

import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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
import { roleTextMap } from '../../../types/user';

const StaffPage: NextPage = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { data, error, isLoading } = useBusinessQuery(user.id);
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    role: Role;
  } | null>(null);

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }
  // TODO: map roles

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
            <Flex
              direction="row"
              justifyContent="space-between"
              key={employee.id}
              boxShadow=" 0px 8px 48px #EBEBEB, 0px 4px 8px rgba(89, 89, 89, 0.08), 0px 0px 1px rgba(89, 89, 89, 0.48);"
              margin="0 !important"
              padding="24px"
              width="full"
              onClick={() => setSelectedEmployee(employee)}
            >
              <Box>
                <Typography.CallToAction>
                  {employee.firstName} {employee.lastName}
                </Typography.CallToAction>

                <Typography.Body small color="brand.darkGrey">
                  {roleTextMap[employee.role]}
                </Typography.Body>
              </Box>
              <Icon as={HiArrowSmRight} />
            </Flex>
          ))}
        </Flex>
      </Screen.Content>

      {selectedEmployee && (
        <EditEmployee employee={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
      )}
    </Screen>
  );
};

const EditEmployee = ({
  employee,
  onClose,
}: {
  employee: { id: string; firstName: string; lastName: string; role: Role };
  onClose: () => void;
}) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={true} preserveScrollBarGap>
      <DrawerOverlay />
      <DrawerContent borderRadius="16px 16px 0px 0px">
        <DrawerHeader>
          <Typography.Title>
            {employee.firstName} {employee.lastName}
          </Typography.Title>
        </DrawerHeader>
        <DrawerBody>
          <Typography.Body small color="brand.darkGrey">
            Role
          </Typography.Body>
          {roleTextMap[employee.role]}
          <Typography.Body color="#B8322A" fontWeight="600" textAlign="center">
            Remove from staff
          </Typography.Body>
        </DrawerBody>
        <DrawerFooter>
          <Button w="full">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default StaffPage;

export const getServerSideProps: GetServerSideProps = withPageAuth({
  redirectTo: '/sign-in',
  async getServerSideProps(ctx) {
    // Access the user object
    const { user } = await getUser(ctx);
    const { data } = await supabaseServerClient(ctx).from('users').select('*').eq('id', user.id);

    return { props: { user, profile: data?.[0] } };
  },
});
