/* eslint-disable import/extensions */
import { Box, Button, Icon, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import UIContainer from '@/components/container';

function Error() {
  const navigate = useNavigate();
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
          fontSize="2rem"
          fontWeight="600"
          lineHeight="22px"
          textAlign="center"
        >
          Error 404 🤔
        </Text>
        <Text
          mt="1rem"
          color="customBlack"
          fontSize="1rem"
          fontWeight="400"
          lineHeight="22px"
          textAlign="center"
        >
          Sorry page you looking for does not exist.
        </Text>
        <Button
          variant="unstyled"
          color="customLightBlue"
          fontSize="14px"
          fontFamily="noto"
          fontWeight="normal"
          _hover={{ textDecoration: 'underline' }}
          onClick={() => navigate(-1)}
          w="100%"
        >
          <Icon as={ArrowBackIcon} />
          <Text display="inline" ps="3px">
            Go Back
          </Text>
        </Button>
      </Box>
    </UIContainer>
  );
}

export default Error;
