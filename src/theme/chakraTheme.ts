import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  sm: '420px',
};

const theme = extendTheme({
  colors: {
    customGray: '#BDBDBD',
    darkGray: '#828282',
    customBlack: '#333',
    customBlue: '#2F80ED',
    customLightBlue: '#2D9CDB',
    lightGray: '#F2F2F2',
    customRed: '#EB5757',
  },
  fonts: {
    noto: `'Noto Sans', sans-serif`,
  },
  styles: {
    global: {
      'html, body': {
        fontFamily: 'noto',
        fontStyle: 'normal',
      },
    },
  },
  breakpoints,
});

export default theme;
