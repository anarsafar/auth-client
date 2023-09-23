/* eslint-disable import/extensions */
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import authSchema from '@schema/authSchema';
import authUser from '@/network/lib/auth';
import FormTypes from '@/types/formInterface';
import useUser from '../user';
import { useAuth as useAuthContext } from '@/context/AuthContext';

type FormData = yup.InferType<typeof authSchema>;

function useAuth() {
  const { getUser } = useUser();
  const { setUserData, userData } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(authSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const signUp = async (data: FormTypes) => {
    try {
      setIsLoading(true);
      const result = await authUser.signUp(data);
      toast({
        title: `${result.message ? result.message : result.error}`,
        status: `${
          result.message && result.message !== 'Network Error'
            ? 'success'
            : 'error'
        }`,
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logIn = async (data: FormTypes) => {
    setIsLoading(true);
    const result = await authUser.logIn(data);

    if (result.error || result.message) {
      toast({
        title: `${result.error ? result.error : result.message}`,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    } else {
      const access = result.accessToken as string;
      await getUser(access);
    }
    setIsLoading(false);
  };

  const logOut = async () => {
    setUserData((prevUserData) => ({ ...prevUserData, isLoading: true }));
    navigate('/auth/login');

    const { accessToken } = userData;

    localStorage.clear();
    setUserData({
      isLoading: false,
      user: null,
      accessToken: null,
    });

    if (accessToken) {
      const result = await authUser.logOut(accessToken);

      if (result.error) {
        toast({
          title: `${result.error}`,
          status: 'error',
          isClosable: true,
          position: 'top',
          duration: 2000,
        });
      }
    }
  };

  return {
    signUp,
    logIn,
    logOut,
    isLoading,
    register,
    handleSubmit,
    errors,
  };
}

export default useAuth;
