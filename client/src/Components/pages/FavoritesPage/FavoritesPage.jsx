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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import styles from './FavoritesPage.module.css';
import card from '../../../assets/card.jpg';
import { NavLink, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import axios from 'axios';

export default function FavoritesPage({ user }) {
  const [favourites, setFavourites] = useState([]);
  const baseUrl = 'http://localhost:3100';
  const { id } = useParams();
  const [isAlert, setIsAlert] = useState(false);
  const [mapCenter, setMapCenter] = useState([55.751244, 37.618423]); // Default: Moscow
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    axiosInstance
      .get(`/favourites/${id}`)
      .then((res) => setFavourites(res.data));
  }, [id]);

  const geocodeAddress = async (address) => {
    onOpen();
    try {
      const response = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=f10e9383-a4f2-4406-8b18-23b4dfdfcb03&format=json&geocode=${encodeURIComponent(
          address
        )}`
      );
      const geoObject =
        response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
      if (geoObject) {
        const coordinates = geoObject.Point.pos
          .split(' ')
          .map(Number)
          .reverse(); // Yandex returns "longitude latitude", reverse it for the map
        setMapCenter(coordinates);
        setSelectedAddress(address);
      } else {
        alert('Address not found');
      }
    } catch (error) {
      console.error('Error geocoding the address:', error);
    }
  };

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
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Карта</ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              justifyContent="center"
              flexDir="column"
              alignItems="center"
            >
              <YMaps>
                <Map
                  defaultState={{ center: mapCenter, zoom: 15 }}
                  state={{ center: mapCenter, zoom: 15 }}
                >
                  {mapCenter && <Placemark geometry={mapCenter} />}
                </Map>
              </YMaps>
              {selectedAddress && (
                <Text overflowWrap="break-word" w="300px">
                  <i>
                    <strong>Адрес: </strong>
                  </i>{' '}
                  {selectedAddress}
                </Text>
              )}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
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
          <Box className={styles.headingContainer}>
            <Heading as="h3" size="lg" my="15px">
              В избранном объявлений : {favourites.length}
            </Heading>
          </Box>

          <Grid gridTemplateColumns="repeat(3, 500px)" gap="20px" my="15px">
            {favourites.map((item) => {
              return (
                <GridItem>
                  <Card
                    minH="550px"
                    key={item.id}
                    className={styles.cartDelete}
                    display="flex"
                    flexDir="column"
                  >
                    <Image
                      className={styles.imgDelete}
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '500px' }}
                      maxH="200px"
                      src={`${baseUrl}${item.Housing.image}`}
                    />
                    <CardBody
                      display="flex"
                      flexDir="column"
                      justifyContent="space-between"
                    >
                      <Heading size="md">{item.Housing.title}</Heading>
                      <Text h="50px" py="2">
                        {item.Housing.desc}
                      </Text>
                      <Flex alignItems="center" mb="30px">
                        <Text w="300px" py="2">
                          <i>{item.Housing.address}</i>
                        </Text>
                        <Spacer />
                        <Button
                          onClick={() => geocodeAddress(item.Housing.address)}
                          variant="outline"
                          colorScheme="blue"
                        >
                          <ExternalLinkIcon />
                        </Button>
                      </Flex>
                      <div className={styles.cartBottom}>
                        <Text py="2">
                          <strong>{item.Housing.price} P</strong>
                        </Text>

                        <Button
                          onClick={() => onRemoveItem(item.id)}
                          variant="solid"
                          colorScheme="blue"
                        >
                          Delete
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </Grid>
        </>
      )}
    </Box>
  );
}
