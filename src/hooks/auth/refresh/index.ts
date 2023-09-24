/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import user from '@/network/lib/user';
import { useAuth } from '@/context/AuthContext';
import authUser from '@/network/lib/auth';
import { User } from '@/types/userInterface';

function useRefresh() {
  const toast = useToast();
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const getUser = async (accessToken: string): Promise<void> => {
    const userResponse = await user.getUser(accessToken);

    if (userResponse?.error || userResponse?.message) {
      setUserData((prevUserData) => ({ ...prevUserData, isLoading: false }));
    } else {
      setUserData({
        isLoading: false,
        user: userResponse as User,
        accessToken,
      });
    }
  };

  const validateTokens = async (accessToken: string | null) => {
    let userResponse;
    if (accessToken) {
      userResponse = await user.getUser(accessToken);
    } else {
      setUserData((prevUserData) => ({ ...prevUserData, isLoading: true }));

      userResponse = { error: 'error' };
    }

    if (userResponse?.error || userResponse?.message) {
      const tokenResponse = await authUser.getNewAccessToken(accessToken);

      if (tokenResponse.error) {
        setUserData({
          user: null,
          accessToken: null,
          isLoading: false,
        });
        navigate('/auth/login');
        toast({
          title: `${tokenResponse.error}`,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 2000,
        });
      } else {
        await getUser(tokenResponse.accessToken as string);
      }
    }
  };

  return { validateTokens };
}
export default useRefresh;
