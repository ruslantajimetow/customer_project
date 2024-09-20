import {
  Text,
  Button,
  Flex,
  FormControl,
  Box,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

function SignIn({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isAlert, setIsAlert] = useState(false);
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/auth/signin`, {
        email,
        password,
      });

      setUser(response.data.user);
      setAccessToken(response.data.accessToken);
      navigate('/');
    } catch (error) {
      console.log(error);
      setIsAlert(true);

      setTimeout(() => {
        setIsAlert(false);
      }, 2000);
    }
  };
  return (
    <Flex mt={10} justifyContent="center" flexDir="column" alignItems="center">
      {isAlert && (
        <Flex mb="10px">
          <Alert h="40px" status="error" variant="solid">
            <AlertIcon />
            Неверный адрес электронной почты или пароль!
          </Alert>
        </Flex>
      )}
      <form onSubmit={submitHandler}>
        <FormControl w="500px" isRequired={true}>
          <VStack spacing={8}>
            <Box w="100%">
              <FormLabel>Адрес электронной почты:</FormLabel>
              <Input
                type="email"
                name="email"
                size="sm"
                onChange={emailChangeHandler}
                value={email}
              />
            </Box>
            <Box w="100%">
              <FormLabel>Пароль:</FormLabel>
              <Input
                type="password"
                name="password"
                size="sm"
                onChange={passwordChangeHandler}
                value={password}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button type="submit" colorScheme="blue" mx="auto">
                Вход
              </Button>
            </Box>
          </VStack>
        </FormControl>
      </form>
    </Flex>
  );
}

export default SignIn;
