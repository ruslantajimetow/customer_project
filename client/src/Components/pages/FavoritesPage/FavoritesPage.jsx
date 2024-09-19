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
} from '@chakra-ui/react';
import styles from './FavoritesPage.module.css';
import card from '../../../assets/card.jpg';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
export default function FavoritesPage({
  title,
  desc,
  image,
  price,
  address,
  deleteProduct,
  id,
}) {
  const [favourites, setFavourites] = useState([]);
  return (
    <Box className={styles.wrapper}>
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
              Ваш список избранных записей об аренде жилья ~ count ~ объекта
            </Heading>
          </Box>

          <Box className={styles.secondCardContainer} mt={4}>
            <Card className={styles.cartDelete}>
              <Image
                className={styles.imgDelete}
                objectFit="cover"
                maxW={{ base: '100%', sm: '500px' }}
                src={
                  'https://i.sutochno.ru/By43GBjr76loQg5Zrt-qcMJcsrQOitplEDHutsobfeU/rs:fit:1920:1080/el:1/czM6Ly9zdGF0aWMuc3V0b2Nobm8ucnUvZG9jL2ZpbGVzL29iamVjdHMvMS82MTMvODgwLzY0ZWUwZWM3NzdmZGEuanBn.webp'
                }
              />
              <Stack>
                <CardBody>
                  <Heading size="md">
                    {title} Сдам квартиру. Квартира находится на 5 этаже из 11.
                  </Heading>
                  <Text py="2">
                    {desc} Всего 3 комнаты, общая площадь – 70 кв.м (жилая
                    площадь – 54 кв.м) Ремонт делали год назад, все свежее и
                    уютное. В коридоре в районе крючков для курток вздулись
                    обои, но под верхней одеждой эти дефекты не видны. В
                    гостиной есть диван, стеллаж, подставка под телевизор. В
                    обеих спальнях есть двуспальные кровати с только что
                    купленными матрасами, шкаф-купе, зеркало. Высокоскоростной
                    интернет. Полностью оборудованная кухня: холодильник, плита
                    с 4 конфорками, духовка, микроволновка, электрический
                    чайник, небольшой набор посуды. Санузел совмещенный, есть
                    стиральная машина. Из окна виден парк. Квартира сдается на
                    срок от года платежеспособным жильцам без детей и крупных
                    животных, воспитанные коты и небольшие собаки обсуждаются.
                  </Text>
                  <Text py="2">
                    {address} г. Москва, ул. Краснореченская, д. 123, кв.45
                  </Text>
                  <div className={styles.cartBottom}>
                    <Text py="2">
                      {price} Цена: 30 тысяч в месяц + страховой депозит 30
                      тысяч (можно разбить на два платежа){' '}
                    </Text>

                    <Button
                      variant="solid"
                      colorScheme="blue"
                      onClick={() => deleteProduct(id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardBody>
              </Stack>
            </Card>
          </Box>
        </>
      )}
    </Box>
  );
}
