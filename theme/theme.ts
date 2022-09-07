import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'Figtree', sans-serif`,
  body: `'Figtree', sans-serif`,
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: '99px',
      fontWeight: '600',
      fontSize: '18px',
    },
    variants: {
      solid: {
        background: '#493CE2',
        color: 'white',
        minWidth: '120px',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          border: '3px solid',
          borderColor: '#131723',
          borderRadius: '4px',
        },
      },
    },
  },
};

export const theme = extendTheme({ fonts, components });
