/* eslint-disable import/extensions */
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Stack,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import Header from '@components/Common/Header';
import { useAuth } from '@/context/AuthContext';

function UserProfile(): JSX.Element {
  const [isMobile] = useMediaQuery('(max-width: 420px)');
  const { userData } = useAuth();
  const navigate = useNavigate();
  const profileUI = (
    <>
      <Text
        color="black"
        fontSize="2.25rem"
        fontWeight="400"
        textAlign="center"
      >
        Personal Info
      </Text>
      <Text color="black" fontSize="1rem" fontWeight="300" textAlign="center">
        Basic info, like your name and photo
      </Text>

      <Box
        borderRadius=".75rem"
        border="1px solid"
        borderColor={{ sm: 'customGray', base: 'white' }}
        my={{ sm: '2.25rem', base: '1rem' }}
      >
        <Flex
          justify="space-between"
          align="center"
          py="1.8rem"
          px={{ sm: '3rem', base: '1.3rem' }}
        >
          <Stack>
            <Text color="black" fontSize="1.5rem" fontWeight="400">
              Profile
            </Text>

            <Text
              color="darkGray"
              fontSize="0.8125rem"
              fontWeight="500"
              w={{ base: '70%' }}
            >
              Some info may be visible to other people
            </Text>
          </Stack>
          <Button
            onClick={() => navigate('/edit-profile')}
            p=".5rem 2rem"
            border="1px solid"
            borderColor="darkGray"
            variant="unstyled"
            color="darkGray"
            fontFamily="noto"
            fontSize="1rem"
            fontWeight="500"
            _hover={{
              backgroundColor: 'orange.200',
              color: 'white',
              borderColor: 'orange.200',
            }}
          >
            Edit
          </Button>
        </Flex>
        <Stack>
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px solid"
            borderColor="customGray"
            py="1.5rem"
            px={{ sm: '3rem', base: '1.3rem' }}
          >
            <Text
              color="customGray"
              fontSize="0.9rem"
              fontWeight="500"
              flexGrow={{ sm: '1', base: '0' }}
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              PHOTO
            </Text>
            <Box
              flexGrow={{ sm: '1.7', base: '0' }}
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              <Avatar
                name={userData.user?.name}
                w="4.5rem"
                h="4.5rem"
                borderRadius=".5rem"
                src={userData.user?.image}
              />
            </Box>
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px solid"
            borderColor="customGray"
            py="1.5rem"
            gap="1rem"
            px={{ sm: '3rem', base: '1.3rem' }}
          >
            <Text
              color="customGray"
              fontSize="0.9rem"
              fontWeight="500"
              flexGrow={{ sm: '1', base: '0' }}
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              NAME
            </Text>
            <Text
              color="customBlack"
              fontSize={{ sm: '1rem', base: '.8125rem' }}
              fontWeight="500"
              flexGrow={{ sm: '1.7', base: '0' }}
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              {userData.user?.name}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px solid"
            borderColor="customGray"
            py="1.5rem"
            gap="1rem"
            px={{ sm: '3rem', base: '1.3rem' }}
          >
            <Text
              color="customGray"
              fontSize="0.9rem"
              fontWeight="500"
              flexGrow="1"
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              PHONE
            </Text>
            <Text
              color="customBlack"
              fontSize={{ sm: '1rem', base: '.8125rem' }}
              fontWeight="500"
              flexGrow={{ sm: '1.7', base: '0' }}
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              {userData.user?.phone}
            </Text>
          </Flex>
          <Flex
            justify="space-between"
            align="center"
            borderTop="1px solid"
            borderColor="customGray"
            py="1.5rem"
            px={{ sm: '3rem', base: '1.3rem' }}
            gap="1rem"
          >
            <Text
              color="customGray"
              fontSize="0.9rem"
              fontWeight="500"
              flexGrow="1"
              flexBasis={{ sm: 0, base: 'auto' }}
            >
              BIO
            </Text>
            <Text
              color="customBlack"
              fontSize={{ sm: '1rem', base: '.8125rem' }}
              fontWeight="500"
              flexBasis={{ sm: 0, base: 'auto' }}
              flexGrow={{ sm: '1.7', base: '0' }}
            >
              {userData.user?.bio}
            </Text>
          </Flex>
          {!userData.user?.googleId &&
            !userData.user?.facebookId &&
            !userData.user?.githubId && (
              <Flex
                justify="space-between"
                align="center"
                borderTop="1px solid"
                borderColor="customGray"
                p="1.5rem"
                gap="1rem"
                px={{ sm: '3rem', base: '1.3rem' }}
              >
                <Text
                  color="customGray"
                  fontSize="0.9rem"
                  fontWeight="500"
                  flexGrow="1"
                  flexBasis={{ sm: 0, base: 'auto' }}
                >
                  EMAIL
                </Text>
                <Text
                  color="customBlack"
                  fontSize={{ sm: '1rem', base: '.8125rem' }}
                  fontWeight="500"
                  flexBasis={{ sm: 0, base: 'auto' }}
                  flexGrow={{ sm: '1.7', base: '0' }}
                >
                  {userData.user?.email}
                </Text>
              </Flex>
            )}
        </Stack>
      </Box>
    </>
  );

  return (
    <>
      <Header />
      {isMobile ? (
        <Box mt="2rem">{profileUI}</Box>
      ) : (
        <Container maxW="53rem" mt="2rem">
          {profileUI}
        </Container>
      )}
    </>
  );
}

export default UserProfile;
