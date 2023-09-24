/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useLayoutEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/react';
import { useAuth } from '@/context/AuthContext';
import useRefresh from '@/hooks/auth/refresh';

interface ComponentProps {
  element: ReactNode;
}

function ProtectedRoute({ element }: ComponentProps): ReactNode {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const { validateTokens } = useRefresh();

  useLayoutEffect(() => {
    validateTokens(userData.accessToken);
  }, []);

  useEffect(() => {
    if (!userData.user && !userData.isLoading) {
      navigate('/auth/login');
    }
  }, [userData, navigate]);

  if (userData.isLoading) {
    return (
      <Flex justify="center" align="center" w="100vw" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  return userData.user && element;
}

export default ProtectedRoute;
