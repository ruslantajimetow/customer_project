import {
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Box,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import styles from './FavoritesPage.module.css';
import card from '../../../assets/card.jpg';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
export default function FavoritesPage({ user }) {
  const [favourites, setFavourites] = useState([]);
  const baseUrl = 'http://localhost:3100';
  const { id } = useParams();
  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/favourites/${id}`)
      .then((res) => setFavourites(res.data));
  }, [id]);

  const onRemoveItem = async (id) => {
    try {
      const response = await axiosInstance.delete(`/favourites/${id}`);
      if (response.status === 201) {
        setIsAlert(true);

        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
      }
      setFavourites((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Box className={styles.wrapper}>
      {isAlert && (
        <Flex mb={10}>
          <Alert status="success" variant="solid">
            <AlertIcon />
            Эта запись успешно удалена!
          </Alert>
        </Flex>
      )}
      {favourites.length === 0 ? (
        <Flex flexDir="column" alignItems="center">
          <Image
            w="500px"
            mb="15px"
            src={card}
            alt="Корзина"
            borderRadius="lg"
          />

          <Heading mb="15px" size="md">
            Ваш список избранных записей пуст.
          </Heading>
          <Heading mb="15px" size="md">
            Для выбора вариантов аренды перейдите на главную страницу сайта.
          </Heading>

          <Divider />

          <ButtonGroup spacing="2">
            <NavLink to="/">
              <Button variant="solid" colorScheme="blue" mt="15px">
                Перейти на главную
              </Button>
            </NavLink>
          </ButtonGroup>
        </Flex>
      ) : (
        <>
          <Box className={styles.headingContainer} mt={4}>
            <Heading as="h3" size="lg">
              В избранном у Вас {favourites.length} объявления
            </Heading>
          </Box>

          <Box className={styles.secondCardContainer} mt={4}>
            {favourites.map((item) => {
              return (
                <Card key={item.id} className={styles.cartDelete}>
                  <Image
                    className={styles.imgDelete}
                    objectFit="cover"
                    maxW={{ base: '100%', sm: '500px' }}
                    src={`${baseUrl}${item.Housing.image}`}
                  />
                  <Stack>
                    <CardBody>
                      <Heading size="md">{item.Housing.title}</Heading>
                      <Text py="2">{item.Housing.desc}</Text>
                      <Text py="2">{item.Housing.address}</Text>
                      <div className={styles.cartBottom}>
                        <Text py="2">{item.Housing.price}</Text>

                        <Button
                          onClick={() => onRemoveItem(item.id)}
                          variant="solid"
                          colorScheme="blue"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardBody>
                  </Stack>
                </Card>
              );
            })}
          </Box>
        </>
      )}
    </Box>
  );
}
