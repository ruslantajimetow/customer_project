import {
  Text,
  Button,
  Flex,
  FormControl,
  Box,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { setAccessToken } from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

function SignIn({ setUser }) {
  const [feedBack, setFeedBack] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await axiosInstance.post(`/auth/signin`, {
      email,
      password,
    });
    if (response.status === 401) {
      setFeedBack(response.data.message);
    }
    setFeedBack('');
    setUser(response.data.user);
    setAccessToken(response.data.accessToken);
    navigate('/');
  };
  return (
    <Flex mt={10} justifyContent="center">
      <form onSubmit={submitHandler}>
        <FormControl w="500px" isRequired={true}>
          {feedBack.length > 0 && <Text color="red">{feedBack}</Text>}
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
