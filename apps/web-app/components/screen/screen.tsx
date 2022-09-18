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
// TODO: z-indices
const Header: ComponentWithChildren = ({ children }) => {
  const { headerIsHidden } = useContext(ScreenContext);

  if (headerIsHidden) {
    return null;
  }

  return (
    <Portal>
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
        {children}
      </Flex>
    </Portal>
  );
};

const Content: ComponentWithChildren = ({ children }) => {
  const { contentIsNotPadded, contentIsCentered, headerIsHidden } = useContext(ScreenContext);

  return (
    <Flex
      justify={contentIsCentered ? 'center' : 'flex-start'}
      width="full"
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
