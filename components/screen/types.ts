import { BoxProps } from '@chakra-ui/react';
import { ComponentWithChildren } from '../../types/base';

export type ScreenComponent<T> = ComponentWithChildren<T> & {
  Header: ComponentWithChildren<T>;
  Content: ComponentWithChildren<T>;
  Footer: ComponentWithChildren<T>;
};

export type ScreenProps = {
  withNavigation?: boolean;
  contentOnly?: boolean;
  isContentFullScreen?: boolean;
  isFooterPadded?: boolean;
};

export type ScreenContextProps = {
  isMobile?: boolean;
};
