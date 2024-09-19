import React from 'react';
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import styles from './CardInPage.module.css';

export default function CardInPage({
  title,
  image,
  address,
  price,
  desc,
  user,
}) {
  const baseUrl = 'http://localhost:3100';
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
              {user.email !== 'admin@admin.com' && (
                <Button variant="solid" colorScheme="blue">
                  Добавить в избранное
                </Button>
              )}
              <div>{price} ₽ </div>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}
