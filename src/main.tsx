import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/chakraTheme';
import MyRoutes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
    <MyRoutes />
  </ChakraProvider>
);
