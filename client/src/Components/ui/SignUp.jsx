import {
  Button,
  Flex,
  FormControl,
  Box,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

function SignUp({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post(`/auth/signup`, {
      username: name,
      email,
      password,
    });
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    setName('');
    setEmail('');
    setPassword('');
    navigate('/');
  };

  return (
    <Flex mt={10} justifyContent="center">
      <form onSubmit={submitHandler}>
        <FormControl w="500px" isRequired={true}>
          <VStack spacing={8}>
            <Box w="100%">
              <FormLabel>Ваше имя:</FormLabel>
              <Input
                type="text"
                name="name"
                size="sm"
                value={name}
                onChange={nameChangeHandler}
              />
            </Box>
            <Box w="100%">
              <FormLabel>Адрес электронной почты:</FormLabel>
              <Input
                type="email"
                name="email"
                size="sm"
                value={email}
                onChange={emailChangeHandler}
              />
            </Box>
            <Box w="100%">
              <FormLabel>Пароль:</FormLabel>
              <Input
                type="password"
                name="password"
                size="sm"
                value={password}
                onChange={passwordChangeHandler}
              />
            </Box>
            <Box display="flex" justifyContent="center">
              <Button type="submit" colorScheme="blue" mx="auto">
                Регистрация
              </Button>
            </Box>
          </VStack>
        </FormControl>
      </form>
    </Flex>
  );
}

export default SignUp;
