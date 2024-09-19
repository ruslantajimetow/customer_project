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
    <Flex
      p={5}
      bgColor="gray.200"
      shadow="md"
      borderRadius="lg"
      alignItems="center"
    >
      <HStack spacing={3}>
        <NavLink to="/">
          <Image
            src="https://img.freepik.com/premium-photo/logo-real-estate-agency-sale-rental-apartments-houses-ads-social-media_653623-10380.jpg"
            cursor="pointer"
            w="60px"
            borderRadius="lg"
          />
        </NavLink>
        <Box>
          <Heading fontSize="20px" color="gray.600" fontWeight="bold">
            Сервис для поиска аренды жилья
          </Heading>
        </Box>
      </HStack>
      <Spacer />
      <HStack spacing={4}>
        {user?.email && user?.email !== 'admin@admin.com' && (
          <HStack spacing={2}>
            <Text fontSize="20px" color="gray.600" fontWeight="bold">
              Привет, {user.username}!
            </Text>
            <NavLink to={`/favourites/${user.id}`}>
              <Button
                colorScheme="orange"
                leftIcon={<CalendarIcon />}
                variant="solid"
                borderRadius="lg"
              >
                Избранное
              </Button>
            </NavLink>
          </HStack>
        )}
        {user?.email && user?.email === 'admin@admin.com' ? (
          <Button
            onClick={logoutHandler}
            colorScheme="blue"
            variant="solid"
            borderRadius="lg"
          >
            Выйти
          </Button>
        ) : (
          <>
            <NavLink to="/signIn">
              <Button
                variant="ghost"
                colorScheme="blue"
                borderRadius="lg"
                fontSize="md"
              >
                Вход
              </Button>
            </NavLink>
            <NavLink to="/signUp">
              <Button
                colorScheme="blue"
                variant="solid"
                borderRadius="lg"
                fontSize="md"
              >
                Регистрация
              </Button>
            </NavLink>
          </>
        )}
        {user?.email === 'admin@admin.com' && (
          <NavLink to="/dashboard">
            <Button
              variant="ghost"
              colorScheme="blue"
              borderRadius="lg"
              fontSize="md"
            >
              Админ-панель
            </Button>
          </NavLink>
        )}
      </HStack>
    </Flex>
  );
}

export default Header;
