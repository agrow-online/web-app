import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton } from '@chakra-ui/react';

import { Screen } from '../../../components/screen/screen';
import { Typography } from '../../../components/typography';
import { useBusinessQuery } from '../../../modules/api/queries/use-profile';
import { roleTextMap } from '../../../types/user';

const StaffPage: NextPage = () => {
  const router = useRouter();
  const { data, error } = useBusinessQuery();

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <Screen contentIsNotPadded>
      <Head>
        <title>Staff | agrow</title>
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
