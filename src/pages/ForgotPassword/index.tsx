/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import {
  Box,
  Button,
  FormControl,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';

import mailIcon from '@assets/mail.svg';
import { ArrowBackIcon } from '@chakra-ui/icons';
import UIContainer from '@/components/container';
import usePassword from '@/hooks/password';
import resetSchema from '@/schema/resetSchema';

type FormData = yup.InferType<typeof resetSchema>;

function ForgotPassoword(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(resetSchema),
  });
  const { resetPassword, isLoading } = usePassword();
  const navigate = useNavigate();

  return (
    <UIContainer>
      <Box
        border="1px solid"
        borderColor={{ sm: 'customGray', base: 'white' }}
        borderRadius="24px"
        p="35px"
        pt="20px"
        w={{ sm: '400px', base: '100%' }}
      >
        <Button
          variant="unstyled"
          color="customLightBlue"
          fontSize="14px"
          fontFamily="noto"
          fontWeight="normal"
          _hover={{ textDecoration: 'underline' }}
          onClick={() => navigate(-1)}
        >
          <Icon as={ArrowBackIcon} />
          <Text display="inline" ps="3px">
            Go Back
          </Text>
        </Button>
        <FormControl mt="5px">
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
          <Button
            loadingText="Submitting"
            isLoading={isLoading}
            bg="customBlue"
            color="white"
            w="100%"
            borderRadius="8px"
            onClick={handleSubmit(resetPassword)}
          >
            Reset Password
          </Button>
        </FormControl>
      </Box>
    </UIContainer>
  );
}

export default ForgotPassoword;
