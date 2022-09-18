import { NextPage } from 'next';
import { AppProps as NextAppProps } from 'next/app';
import { FC, PropsWithChildren, ReactElement, ReactNode } from 'react';

// Custom Type for a React functional component with props and children
export type ComponentWithChildren<T = {}> = FC<PropsWithChildren<T>>;

export type Page = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
  requiresAuthentication: boolean;
};

export type AppProps = NextAppProps & {
  Component: Page;
};
