import { Flex } from '@chakra-ui/react';

interface UIContainerProps {
  children: React.ReactNode;
}

function UIContainer({ children }: UIContainerProps): JSX.Element {
  return (
    <Flex w="100wv" h="100vh" justify="center" align="center">
      {children}
    </Flex>
  );
}

export default UIContainer;
