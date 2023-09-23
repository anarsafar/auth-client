/* eslint-disable import/extensions */
import { useDisclosure, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import password from '@/network/lib/password';
import { useAuth } from '@/context/AuthContext';
import useRefresh from '../auth/refresh';
import changePasswordSchema from '@/schema/changePasswordSchema';

type FormData = yup.InferType<typeof changePasswordSchema>;

function usePassword() {
  const toast = useToast();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { userData } = useAuth();
  const { validateTokens } = useRefresh();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(changePasswordSchema),
  });

  const resetPassword = async (data: { email: string }) => {
    setLoading(true);
    const result = await password.resetPassword(data);
    setLoading(false);

    toast({
      title: `${result.error ? result.error : result.message}`,
      status: `${result.error ? 'error' : 'success'}`,
      isClosable: true,
      position: 'top',
      duration: 2000,
    });
  };

  const changePassword = async (data: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    validateTokens(userData.accessToken as string);

    const result = await password.changePassword(
      data,
      userData.accessToken as string
    );

    setLoading(false);

    toast({
      title: `${result.error ? result.error : result.message}`,
      status: `${result.error ? 'error' : 'success'}`,
      isClosable: true,
      position: 'top',
      duration: 2000,
    });

    if (!result.error) {
      onClose();
      reset();
    }
  };

  return {
    resetPassword,
    isLoading,
    changePassword,
    register,
    handleSubmit,
    errors,
    isOpen,
    onOpen,
    onClose,
  };
}

export default usePassword;
