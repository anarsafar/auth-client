/* eslint-disable import/extensions */
import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { Link as BrowserLink } from 'react-router-dom';

import accountIcon from '@assets/account-icon.svg';
import logoutIcon from '@assets/logout-icon.svg';
import useAuth from '@/hooks/auth';
import { useAuth as useAuthContext } from '@/context/AuthContext';

function Header(): JSX.Element {
  const { logOut } = useAuth();
  const { userData } = useAuthContext();
  return (
    <Container maxW="992px">
      <Flex justify="flex-end" align="center" mt="2">
        <Menu>
          <MenuButton as={Button} variant="unstyled">
            <HStack>
              <Avatar
                name={userData.user?.name}
                borderRadius="10px"
                w="2rem"
                h="2rem"
                src={userData.user?.image}
              />
              <Text color="customBlack" fontSize=".75rem" fontWeight="700">
                {userData.user?.name}
              </Text>
              <ChevronDownIcon />
            </HStack>
          </MenuButton>
          <MenuList p="0">
            <MenuItem
              _hover={{ backgroundColor: 'lightGray' }}
              borderRadius=".5rem"
              p=".67rem"
              m=".5rem"
              w="93%"
              as={BrowserLink}
              to="/profile"
            >
              <Image src={accountIcon} w="1.25rem" h="1.25rem" />
              <Text
                color="customBlack"
                fontSize=".75rem"
                fontWeight="600"
                ms=".62rem"
              >
                Profile
              </Text>
            </MenuItem>
            <MenuDivider />
            <MenuItem
              _hover={{ backgroundColor: '#f2f2f2' }}
              borderRadius=".5rem"
              as={BrowserLink}
              onClick={logOut}
              p=".67rem"
              m=".5rem"
              w="93%"
            >
              <Image src={logoutIcon} w="1.25rem" h="1.25rem" />
              <Text
                fontSize=".75rem"
                fontWeight="600"
                ms=".62rem"
                color="customRed"
              >
                Logout
              </Text>
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Container>
  );
}

export default Header;
