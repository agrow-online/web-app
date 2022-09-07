import {
  Box,
  Flex,
  HStack,
  IconButton,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { HiMenu } from 'react-icons/hi';
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
        justifyItems={contentOnly ? 'center' : 'stretch'}
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
    <Box width="100%" padding={6} justifySelf="stretch">
      {withNavigation && isMobile && (
        <HStack justify="flex-end">
          <IconButton
            aria-label="Open menu"
            icon={<HiMenu size="32px" />}
            variant="ghost"
            onClick={onOpen}
            size="lg"
            marginRight="-12px"
          />
        </HStack>
      )}

      {children}
    </Box>
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
