import { Flex, Portal, useBreakpointValue } from '@chakra-ui/react';

import { createContext, useContext } from 'react';
import { ComponentWithChildren } from '../../types/base';
import { ScreenComponent, ScreenProps, ScreenContextProps } from './types';

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
      flexDirection="column"
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
    <Portal>
      <Flex
        width="full"
        padding="12px"
        background="white"
        position="fixed"
        bottom={0}
        height="80px"
        alignItems="center"
        justifyContent="center"
        outline="1px solid #D0D0D0"
        boxShadow="0px -2px 4px rgba(11, 12, 12, 0.1);"
        borderRadius="12px 12px 0px 0px"
      >
        {children}
      </Flex>
    </Portal>
  );
};

Screen.Header = Header;
Screen.Content = Content;
Screen.Footer = Footer;
