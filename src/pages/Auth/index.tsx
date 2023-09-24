/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Text,
} from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Link as BrowserLink, useLocation } from 'react-router-dom';

import passwordIcon from '@assets/password.svg';
import mailIcon from '@assets/mail.svg';
import googleIcon from '@assets/social/google.svg';
import facebookIcon from '@assets/social/facebook.svg';
import githubIcon from '@assets/social/github.svg';

import UIContainer from '@components/container';
import SocialButton from '@components/Common/SocialButton';
import useAuth from '@/hooks/auth';
import useUser from '@/hooks/user';

interface AuthorizeProps {
  isLoginView: boolean;
}

function Authorize({ isLoginView }: AuthorizeProps) {
  const { signUp, logIn, isLoading, register, handleSubmit, errors } =
    useAuth();
  const { getUser } = useUser();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const accessToken = queryParams.get('accessToken');

  useLayoutEffect(() => {
    const authSocial = async () => {
      await getUser(accessToken as string);
    };

    if (accessToken) {
      authSocial();
    }
  }, []);

  return (
    <UIContainer>
      <Box
        border="1px solid"
        borderColor={{ sm: 'customGray', base: 'white' }}
        borderRadius="24px"
        p="35px"
        w={{ sm: '400px', base: '100%' }}
      >
        <Text
          color="customBlack"
          fontSize="18px"
          fontWeight="600"
          lineHeight="22px"
          textAlign={{ sm: 'center', base: 'left' }}
        >
          {isLoginView
            ? 'Login'
            : 'Join thousands of learners from around the world'}
        </Text>
        {!isLoginView && (
          <Text
            color="customBlack"
            fontSize="16px"
            fontWeight="400"
            lineHeight="22px"
            mt="14.5px"
          >
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </Text>
        )}
        <FormControl mt="20px">
          <InputGroup mb={!errors.email ? '14.5px' : 'auto'}>
            <InputLeftElement pointerEvents="none">
              <Image src={mailIcon} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Email"
              id="email"
              {...register('email')}
            />
          </InputGroup>
          <Text fontSize="xs" color="red.500" my="7.2px">
            {errors.email?.message}
          </Text>
          <InputGroup mb={!errors.password ? '8px' : 'auto'}>
            <InputLeftElement pointerEvents="none">
              <Image src={passwordIcon} />
            </InputLeftElement>
            <Input
              type="password"
              placeholder="Password"
              id="password"
              {...register('password')}
            />
          </InputGroup>
          <Text fontSize="xs" color="red.500" mt="7.2px">
            {errors.password?.message}
          </Text>
          <Box mb="8px">
            {isLoginView && (
              <Link
                as={BrowserLink}
                to="/forgot-password"
                color="customLightBlue"
                fontSize="14px"
              >
                Forgot password?
              </Link>
            )}
          </Box>
          <Button
            isLoading={isLoading}
            loadingText="Submitting"
            bg="customBlue"
            color="white"
            w="100%"
            borderRadius="8px"
            onClick={isLoginView ? handleSubmit(logIn) : handleSubmit(signUp)}
          >
            {isLoginView ? 'Login' : 'Start coding now'}
          </Button>
        </FormControl>
        <Text mt="1rem" color="customGray" textAlign="center">
          or continue with these social profile
        </Text>
        <Flex justify="center" align="center" gap="20px" my="16px">
          <SocialButton param="google" icon={googleIcon} />
          <SocialButton param="facebook" icon={facebookIcon} />
          <SocialButton param="github" icon={githubIcon} />
        </Flex>
        <Text
          color="customGray"
          fontSize="14px"
          fontWeight="400"
          textAlign="center"
        >
          {isLoginView ? "Don't have an account yet?" : 'Adready a member?'}

          <Link
            as={BrowserLink}
            to={isLoginView ? '/auth/signup' : '/auth/login'}
            ms="5px"
            color="customLightBlue"
          >
            {isLoginView ? 'Sign up' : 'Login'}
          </Link>
        </Text>
      </Box>
    </UIContainer>
  );
}

export default Authorize;
