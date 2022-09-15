import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HiOutlineBell, HiMenu, HiLogout, HiPhotograph } from 'react-icons/hi';
import { Children, createContext, useContext } from 'react';
import { ComponentWithChildren } from '../../types/base';
import { ScreenComponent, ScreenProps, ScreenContextProps } from './types';
import { useProfileQuery } from '../../module/api/queries/use-profile';
import { Typography } from '../typography';
import { ChevronDownIcon } from '@chakra-ui/icons';
const ScreenContext = createContext<ScreenProps & ScreenContextProps>({
  isMobile: false,
  headerIsHidden: false,
  contentIsNotPadded: false,
  contentIsCentered: false,
});

export const Screen: ScreenComponent<ScreenProps> = ({
  headerIsHidden = false,
  contentIsNotPadded = false,
  contentIsCentered = false,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <ScreenContext.Provider
      value={{ isMobile, headerIsHidden, contentIsNotPadded, contentIsCentered }}
    >
      <Flex justifyContent="stretch" height="100vh">
        {children}
      </Flex>
    </ScreenContext.Provider>
  );
};

// TODO: error and loading states
const Header: ComponentWithChildren = ({ children }) => {
  const { data, error } = useProfileQuery();

  const { headerIsHidden } = useContext(ScreenContext);

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  console.log({ headerIsHidden });

  const childExists = Children.count(children) > 0;

  return (
    <Flex
      position="fixed"
      top={0}
      width="100%"
      padding={6}
      height="70px"
      boxShadow=" 0px 2px 4px rgba(0, 0, 0, 0.1);"
      background="white"
      justify="center"
    >
      {!headerIsHidden && (
        <>
          {childExists ? (
            children
          ) : (
            <HStack w="full" justify="space-between" alignItems="center">
              <Typography.Title textAlign="center" flex="1">
                Hello, {data.firstName}
              </Typography.Title>

              <Menu>
                <MenuButton as={Link}>
                  <Avatar
                    name={`${data.firstName} ${data.lastName}`}
                    width="40px"
                    height="40px"
                    padding={5}
                  />
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
          )}
        </>
      )}
    </Flex>
  );
};

const Content: ComponentWithChildren = ({ children }) => {
  const { contentIsNotPadded, contentIsCentered, headerIsHidden } = useContext(ScreenContext);

  return (
    <Flex
      justify={contentIsCentered ? 'center' : 'flex-start'}
      width="full"
      height="100%"
      marginTop={headerIsHidden ? 0 : '70px'}
      padding={contentIsNotPadded ? 0 : '24px'}
    >
      {children}
    </Flex>
  );
};

const Footer: ComponentWithChildren = ({ children }) => {
  return (
    <Box
      padding={6}
      width="full"
      justifyContent="flex-end"
      background={'white'}
      marginTop="0 !important"
    >
      {children}
    </Box>
  );
};

Screen.Header = Header;
Screen.Content = Content;
Screen.Footer = Footer;
