import { BoxProps } from '@chakra-ui/react';
import { ComponentWithChildren } from '../../types/base';

export type ScreenComponent<T> = ComponentWithChildren<T> & {
  Header: ComponentWithChildren<T>;
  Content: ComponentWithChildren<T>;
  Footer: ComponentWithChildren<T>;
};

export type ScreenProps = {
  headerIsHidden?: boolean;
  contentIsNotPadded?: boolean;
  contentIsCentered?: boolean;
};

export type ScreenContextProps = {
  isMobile?: boolean;
};
