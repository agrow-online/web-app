import { extendTheme } from '@chakra-ui/react';

const fonts = {
  heading: `'Figtree', sans-serif`,
  body: `'Figtree', sans-serif`,
};

const colors = {
  brand: {
    primary: '#113DAC',
    secondary: '',
    darkGrey: '#545962',
    black: '#0B0C0C',
  },
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
        background: 'brand.primary',
        color: 'white',
        minWidth: '120px',
      },
    },
  },
  Input: {
    variants: {
      outline: {
        field: {
          border: '2px solid',
          borderColor: 'brand.black',
          borderRadius: '4px',
        },
      },
    },
  },
};

export const theme = extendTheme({ colors, fonts, components });
