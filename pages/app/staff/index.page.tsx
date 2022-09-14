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
  Icon,
  LinkBox,
  LinkOverlay,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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

const DashboardPage: NextPage = () => {
  const { data, error, isLoading } = useBusinessQuery();
  const [selectedEmployee, setSelectedEmployee] = useState<{
    id: string;
    firstName: string;
    lastName: string;
    role: any;
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

      <Screen.Header />
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
                  {employee.role}
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
  employee: { id: string; firstName: string; lastName: string; role: any };
  onClose: () => void;
}) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={true}>
      <DrawerOverlay />
      <DrawerContent borderRadius="16px 16px 0px 0px">
        <DrawerHeader>
          <Typography.Title>Edit {employee.firstName}'s details </Typography.Title>
        </DrawerHeader>
        <DrawerBody>
          {employee.firstName} {employee.lastName} {employee.role}
        </DrawerBody>
        <DrawerFooter>
          <Button w="full">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DashboardPage;
