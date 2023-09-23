import { Button, Image } from '@chakra-ui/react';

interface SocialButtonProps {
  icon: string;
  param: string;
}

function SocialButton({ icon, param }: SocialButtonProps): JSX.Element {
  return (
    <Button
      variant="unstyled"
      as="a"
      href={`https://auth-server-iv8b.onrender.com/auth/${param}`}
    >
      <Image
        src={icon}
        border="1px solid"
        borderRadius="50px"
        borderColor="customGray"
        w="40px"
        p="2"
        _hover={{
          transform: 'scale(1.5)',
          borderColor: 'white',
          transition: 'transform 0.3s ease-in-out',
        }}
      />
    </Button>
  );
}

export default SocialButton;
