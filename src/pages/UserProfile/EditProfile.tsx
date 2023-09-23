/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/extensions */
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';

import Header from '@/components/Common/Header';
import { useAuth } from '@/context/AuthContext';
import photoIcon from '@/assets/photo.svg';
import usePassword from '@/hooks/password';
import useUser from '@/hooks/user';
import { UpdateUser } from '@/types/userInterface';

function EditProfile() {
  const [isMobile] = useMediaQuery('(max-width: 420px)');
  const { userData } = useAuth();
  const navigate = useNavigate();

  const {
    errors,
    register,
    handleSubmit,
    changePassword,
    isLoading,
    isOpen,
    onClose,
    onOpen,
  } = usePassword();

  const {
    errors: updateErrors,
    register: updateRegister,
    handleSubmit: handleUpdateSubmit,
    isLoading: updateLoading,
    updateUser,
    setValue,
    fileInputRef,
    selectedFile,
    handleBoxClick,
    handleFileInputChange,
  } = useUser();

  useEffect(() => {
    if (userData.user?.image) {
      setValue('image', userData.user?.image);
    }
  }, [setValue, userData.user?.image]);

  const editUI = (
    <Box>
      <Button
        variant="unstyled"
        color="customLightBlue"
        fontSize="14px"
        fontFamily="noto"
        fontWeight="normal"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => navigate(-1)}
        px={{ sm: '0', base: '1.3rem' }}
      >
        <Icon as={ArrowBackIcon} />
        <Text display="inline" ps="3px">
          Go Back
        </Text>
      </Button>
      <Box
        borderRadius=".75rem"
        border="1px solid"
        borderColor={{ sm: 'customGray', base: 'white' }}
        my="1rem"
      >
        <Box py="1.8rem" px={{ sm: '3rem', base: '1.3rem' }}>
          <Stack>
            <Text color="black" fontSize="1.5rem" fontWeight="400">
              Change Info
            </Text>

            <Text color="darkGray" fontSize="0.8125rem" fontWeight="500">
              Changes will be reflected to every services
            </Text>
          </Stack>
          <Flex alignItems="center" mt={3} gap={5} pos="relative">
            <Input
              type="file"
              accept="image/*"
              display="none"
              ref={fileInputRef}
              onChange={handleFileInputChange}
            />
            <Box
              position="relative"
              border="2px solid"
              borderColor="white"
              borderRadius=".5rem"
              _hover={{ borderColor: 'gray.300' }}
              cursor="pointer"
              onClick={handleBoxClick}
            >
              <Avatar
                w="4.5rem"
                h="4.5rem"
                borderRadius=".5rem"
                src={
                  selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : userData.user?.image
                }
              />
              <Image
                src={photoIcon}
                pos="absolute"
                top={25}
                left={25}
                cursor="pointer"
              />
            </Box>
            <Text color="darkGray" fontSize="0.8125rem" fontWeight="500">
              Update Photo
            </Text>
          </Flex>
          <Text fontSize="xs" color="red.500" mt="7.2px">
            {updateErrors.image?.message}
          </Text>
          <FormControl w={{ sm: '65%', base: '100%' }}>
            <FormLabel
              color="#4F4F4F"
              fontFamily="noto"
              fontSize="0.8125rem"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              mt="1rem"
            >
              Name
            </FormLabel>
            <Input
              type="text"
              placeholder="Enter your name..."
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              defaultValue={userData.user?.name}
              {...updateRegister('name')}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {updateErrors.name?.message}
            </Text>
            <FormLabel
              color="#4F4F4F"
              fontFamily="noto"
              fontSize="0.8125rem"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              mt="1rem"
            >
              Bio
            </FormLabel>
            <Textarea
              placeholder="Enter your bio..."
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              {...updateRegister('bio')}
              defaultValue={userData.user?.bio}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {updateErrors.bio?.message}
            </Text>
            <FormLabel
              color="#4F4F4F"
              fontFamily="noto"
              fontSize="0.8125rem"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
              mt="1rem"
            >
              Phone
            </FormLabel>
            <Input
              type="text"
              placeholder="Enter your phone..."
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              {...updateRegister('phone')}
              defaultValue={userData.user?.phone}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {updateErrors.phone?.message}
            </Text>
            {!userData.user?.facebookId &&
              !userData.user?.googleId &&
              !userData.user?.githubId && (
                <Button
                  onClick={onOpen}
                  colorScheme="blackAlpha"
                  mt="1rem"
                  loadingText="Submitting"
                  fontFamily="noto"
                  borderRadius="8px"
                  w={{ sm: 'auto', base: '100%' }}
                >
                  Change Password
                </Button>
              )}

            <Button
              mt="1rem"
              loadingText="Updating..."
              isLoading={updateLoading}
              onClick={handleUpdateSubmit((data) =>
                updateUser(data as UpdateUser)
              )}
              bg="customBlue"
              color="white"
              fontFamily="noto"
              w="100%"
              borderRadius="8px"
            >
              Update Profile
            </Button>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );

  const modal = (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="black" fontSize="1.5rem" fontWeight="400">
          Change Password
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              placeholder="Old password"
              type="text"
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              {...register('oldPassword')}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {errors.oldPassword?.message}
            </Text>
          </FormControl>

          <FormControl mt={4}>
            <Input
              placeholder="New password"
              type="text"
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              {...register('newPassword')}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {errors.newPassword?.message}
            </Text>
          </FormControl>
          <FormControl mt={4}>
            <Input
              placeholder="Confirm new password"
              type="text"
              borderColor="darkGray"
              borderRadius=" 0.75rem;"
              _placeholder={{
                color: 'customGray',
                fontFamily: 'noto',
                fontSize: '0.8125rem',
              }}
              {...register('confirmNewPassword')}
            />
            <Text fontSize="xs" color="red.500" mt="7.2px">
              {errors.confirmNewPassword?.message}
            </Text>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="red"
            isLoading={isLoading}
            loadingText="Submitting"
            mr={3}
            onClick={handleSubmit((data) => {
              changePassword({
                currentPassword: data.oldPassword.trim(),
                newPassword: data.newPassword.trim(),
              });
            })}
          >
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <>
      <Header />
      {isMobile ? (
        <Box mt="2rem">{editUI}</Box>
      ) : (
        <Container maxW="53rem" mt="2rem">
          {editUI}
        </Container>
      )}
      {modal}
    </>
  );
}

export default EditProfile;
