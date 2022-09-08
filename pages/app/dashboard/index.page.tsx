import { Box, Grid, GridItem, Icon, Stack } from '@chakra-ui/react';
import { useUser } from '@supabase/auth-helpers-react';
import { NextPage } from 'next';
import { useEffect } from 'react';
import {
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineUsers,
  HiShoppingCart,
} from 'react-icons/hi';
import { Screen } from '../../../components/screen/screen';
import { supabase } from '../../../utils/supabase';

const DashboardPage: NextPage = () => {
  const { user } = useUser();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const use = await supabase.from('users').select('*').eq('authId', user?.aud);
    console.log(use);
  };
  return (
    <Screen>
      <Screen.Header></Screen.Header>
      <Screen.Content>
        <Grid gap="12px" templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Box background="#F0FDFA" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineShoppingCart} />
              <br />
              Point of Sale
            </Box>
          </GridItem>

          <GridItem>
            <Box background="#FDF0F0" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineUsers} color="#A92938" />
              <br />
              Staff
            </Box>
          </GridItem>
          <GridItem>
            <Box background="#F0FDFA" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineShoppingCart} />
              <br />
              Point of Sale
            </Box>
          </GridItem>

          <GridItem>
            <Box background="#FDF0F0" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineUsers} color="#A92938" />
              <br />
              Staff
            </Box>
          </GridItem>
          <GridItem>
            <Box background="#F0FDFA" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineShoppingCart} />
              <br />
              Point of Sale
            </Box>
          </GridItem>

          <GridItem>
            <Box background="#FDF0F0" border="3px solid #131723" borderRadius="16px" padding="20px">
              <Icon as={HiOutlineUsers} color="#A92938" />
              <br />
              Staff
            </Box>
          </GridItem>
        </Grid>
      </Screen.Content>
    </Screen>
  );
};

export default DashboardPage;
