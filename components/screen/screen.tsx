import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HiOutlineBell, HiMenu } from 'react-icons/hi';
import { createContext, useContext } from 'react';
import { ComponentWithChildren } from '../../types/base';
import { ScreenComponent, ScreenProps, ScreenContextProps } from './types';

const ScreenContext = createContext<ScreenProps & ScreenContextProps>({
  isMobile: false,
  withNavigation: true,
  isFooterPadded: true,
});

export const Screen: ScreenComponent<ScreenProps> = ({
  isFooterPadded,
  withNavigation,
  contentOnly,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <ScreenContext.Provider value={{ isMobile, isFooterPadded, withNavigation, contentOnly }}>
      <VStack
        justifyContent={contentOnly ? 'center' : 'stretch'}
        height="100vh"
        padding={[0, null, 8]}
      >
        {children}
      </VStack>
    </ScreenContext.Provider>
  );
};

const Header: ComponentWithChildren = ({ children }) => {
  const { withNavigation, isMobile } = useContext(ScreenContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <HStack width="100%" padding={6} height="70px" boxShadow=" 0px 2px 4px rgba(0, 0, 0, 0.1);">
      {withNavigation && isMobile && (
        <HStack w="full" justify="space-between" alignItems="center">
          <IconButton
            aria-label="View notifications"
            rounded="full"
            icon={<HiOutlineBell size="24px" />}
            variant="solid"
            color="black"
            backgroundColor=" #E2E8F9"
            onClick={onOpen}
          />

          <Heading fontSize="22px">Hello, username</Heading>
          <Avatar name="simona wine" width="40px" height="40px" padding={5} />
        </HStack>
      )}

      {children}
    </HStack>
  );
};

const Content: ComponentWithChildren = ({ children }) => {
  const { isMobile, contentOnly } = useContext(ScreenContext);

  return (
    <Box
      borderTopRadius={15}
      borderBottomRadius={isMobile ? [0, null, 15] : 15}
      padding={6}
      width="full"
    >
      {children}
    </Box>
  );
};

const Footer: ComponentWithChildren = ({ children }) => {
  const { isFooterPadded, isMobile } = useContext(ScreenContext);

  return (
    <Box
      padding={isMobile || isFooterPadded ? 6 : 0}
      width="full"
      justifyContent="flex-end"
      background={isMobile ? 'white' : 'transparent'}
      marginTop="0 !important"
    >
      {children}
    </Box>
  );
};

Screen.Header = Header;
Screen.Content = Content;
Screen.Footer = Footer;
