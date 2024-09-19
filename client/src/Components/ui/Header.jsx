import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  Box,
} from '@chakra-ui/react';
import { CalendarIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { setAccessToken } from '../../axiosInstance';

function Header({ user, setUser }) {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    const response = await axiosInstance.get(`/auth/logout`);
    if (response.status === 200) {
      setUser({});
      setAccessToken('');
      navigate('/');
    }
  };
  return (
    <Flex p={5} bgColor="gray.200">
      <HStack spacing={3}>
        <NavLink to="/">
          <Image
            src="https://img.freepik.com/premium-photo/logo-real-estate-agency-sale-rental-apartments-houses-ads-social-media_653623-10380.jpg"
            cursor="pointer"
            w="60px"
          />
        </NavLink>
        <Box>
          <Heading fontSize="20px" color="gray.600">
            Сервис для поиска аренды жилья
          </Heading>
        </Box>
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        {user?.email === 'admin@admin.com' && (
          <NavLink to="/dashboard">
            <Button variant="ghost" colorScheme="blue">
              Админ-панель
            </Button>
          </NavLink>
        )}
        {!user?.email && user?.email !== 'admin@admin.com' ? (
          <>
            <NavLink to="/signIn">
              <Button variant="ghost" colorScheme="blue">
                Вход
              </Button>
            </NavLink>
            <NavLink to="/signUp">
              <Button colorScheme="blue">Регистрация</Button>
            </NavLink>
          </>
        ) : (
          <Button onClick={logoutHandler} colorScheme="blue">
            Выйти
          </Button>
        )}

        {user?.email && user?.email !== 'admin@admin.com' && (
          <NavLink to="/cart">
            <Button colorScheme="orange" leftIcon={<CalendarIcon />}>
              Избранное
            </Button>
            <Text>Привет {user.username}</Text>
          </NavLink>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
