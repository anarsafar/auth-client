/* eslint-disable import/extensions */
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import user from '@/network/lib/user';
import { useAuth } from '@/context/AuthContext';
import authUser from '@/network/lib/auth';

function useRefresh() {
  const toast = useToast();
  const { setUserData } = useAuth();
  const navigate = useNavigate();

  const validateTokens = async (accessToken: string) => {
    const userResponse = await user.getUser(accessToken);

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
        setUserData((prevUserData) => ({
          ...prevUserData,
          accessToken: tokenResponse.accessToken as string,
        }));
      }
    }
  };
  return { validateTokens };
}
export default useRefresh;
