/* eslint-disable import/extensions */
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import { useAuth } from '@/context/AuthContext';
import user from '@/network/lib/user';
import { UpdateUser, User } from '@/types/userInterface';
import useRefresh from '../auth/refresh';
import updateUserSchema from '@/schema/updateUserSchema';

type FormData = yup.InferType<typeof updateUserSchema>;

function useUser() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(updateUserSchema),
  });

  const { setUserData, userData } = useAuth();
  const [isLoading, setLoading] = useState<boolean>(false);

  const toast = useToast();
  const navigate = useNavigate();
  const { validateTokens } = useRefresh();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleBoxClick = () => {
    fileInputRef?.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setValue('image', file);
      trigger('image');
    }
  };

  const getUser = async (accessToken: string): Promise<void> => {
    setUserData((prevUserData) => ({ ...prevUserData, isLoading: true }));
    navigate('/profile');

    const userResponse = await user.getUser(accessToken);

    if (userResponse?.error || userResponse?.message) {
      toast({
        title: `${userResponse.message || userResponse.error}`,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
      setUserData((prevUserData) => ({ ...prevUserData, isLoading: false }));

      navigate('/auth/login');
    } else {
      setUserData({
        isLoading: false,
        user: userResponse as User,
        accessToken,
      });
    }
  };

  const updateUser = async (data: UpdateUser): Promise<void> => {
    setLoading(true);
    validateTokens(userData.accessToken as string);
    const updateResponse = await user.updateUser(
      userData.accessToken as string,
      data
    );
    setLoading(false);
    if (updateResponse.user) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        user: updateResponse.user as User,
      }));
      toast({
        title: `${updateResponse.message}`,
        status: 'success',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
      reset();
      navigate('/profile');
    } else {
      toast({
        title: `${updateResponse.message || updateResponse.error}`,
        status: 'error',
        isClosable: true,
        position: 'top',
        duration: 2000,
      });
    }
  };

  return {
    getUser,
    updateUser,
    isLoading,
    register,
    handleSubmit,
    errors,
    setValue,
    trigger,
    handleFileInputChange,
    handleBoxClick,
    selectedFile,
    fileInputRef,
  };
}

export default useUser;
