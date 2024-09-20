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
} from '@chakra-ui/react';
import styles from './CardInPage.module.css';
import axiosInstance from '../../../axiosInstance';

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
            <Text py="2">{address}</Text>
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
