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
import { useProfileQuery } from '../../module/api/queries/use-profile';
import { Typography } from '../typography';

const ScreenContext = createContext<ScreenProps & ScreenContextProps>({
  isMobile: false,
  withNavigation: true,
  notPadded: false,
});

export const Screen: ScreenComponent<ScreenProps> = ({
  withNavigation = true,
  notPadded = false,
  children,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <ScreenContext.Provider value={{ isMobile, withNavigation, notPadded }}>
      <VStack justifyContent="stretch" height="100vh" padding={[0, null, 8]}>
        {children}
      </VStack>
    </ScreenContext.Provider>
  );
};

// TODO: error and loading states
const Header: ComponentWithChildren = ({ children }) => {
  const { data, error } = useProfileQuery();

  const { withNavigation } = useContext(ScreenContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (error) {
    return null;
  }

  if (!data) {
    return null;
  }

  return (
    <HStack width="100%" padding={6} height="70px" boxShadow=" 0px 2px 4px rgba(0, 0, 0, 0.1);">
      {withNavigation && (
        <HStack w="full" justify="space-between" alignItems="center">
          <IconButton
            aria-label="View notifications"
            rounded="full"
            icon={<HiOutlineBell size="24px" />}
            variant="solid"
            color="black"
            backgroundColor=" #E2E8F9"
            onClick={onOpen}
            flexShrink={1}
          />

          <Typography.Title>Hello, {data.firstName}</Typography.Title>
          <Avatar name="simona wine" width="40px" height="40px" padding={5} flexShrink={1} />
        </HStack>
      )}

      {children}
    </HStack>
  );
};

const Content: ComponentWithChildren = ({ children }) => {
  const { notPadded } = useContext(ScreenContext);

  return (
    <Box
      borderTopRadius={15}
      borderBottomRadius={[0, null, 15]}
      padding={notPadded ? 0 : 6}
      width="full"
    >
      {children}
    </Box>
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
