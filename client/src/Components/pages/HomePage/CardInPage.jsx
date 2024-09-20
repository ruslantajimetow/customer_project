import React, { useState } from 'react';
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import styles from './CardInPage.module.css';
import axiosInstance from '../../../axiosInstance';
import axios from 'axios';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { ExternalLinkIcon } from '@chakra-ui/icons';

export default function CardInPage({
  title,
  image,
  address,
  price,
  desc,
  user,
  id,
}) {
  const baseUrl = 'http://localhost:3100';
  const [isAlert, setIsAlert] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [mapCenter, setMapCenter] = useState([55.751244, 37.618423]); // Default: Moscow
  const [selectedAddress, setSelectedAddress] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

  const onAddToFavourites = async () => {
    try {
      const response = await axiosInstance.post('/favourites', {
        userId: user.id,
        housingId: id,
      });
      if (response.status === 201) {
        setIsAlert(true);

        setTimeout(() => {
          setIsAlert(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data);

      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }
  };
  return (
    <div>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        maxH="300px"
        mb="30px"
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '300px' }}
          src={`${baseUrl}${image}`}
          alt="Uploaded"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{title}</Heading>

            <Text py="2">{desc}</Text>
            <Text py="2">
              {address}{' '}
              <Button
                onClick={() => geocodeAddress(address)}
                ml="5px"
                variant="outline"
                colorScheme="blue"
              >
                <ExternalLinkIcon />
              </Button>
            </Text>

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
          </CardBody>

          <CardFooter>
            <div className={styles.cardBottom}>
              {user.email && user.email !== 'admin@admin.com' ? (
                <Button
                  onClick={onAddToFavourites}
                  variant="solid"
                  colorScheme="blue"
                >
                  Добавить в избранное
                </Button>
              ) : null}
              {isAlert && (
                <Flex>
                  <Alert h="40px" status="success" variant="solid">
                    <AlertIcon />
                    Это объявление успешно добавлено!
                  </Alert>
                </Flex>
              )}
              {isAdded && (
                <Flex>
                  <Alert h="40px" status="warning" variant="solid">
                    <AlertIcon />
                    Вы уже добавили это объявление!
                  </Alert>
                </Flex>
              )}

              <div>{price} ₽ </div>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}
