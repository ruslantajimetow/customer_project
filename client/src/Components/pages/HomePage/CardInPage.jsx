import React from "react";
import {
  Card,
  Button,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import styles from "./CardInPage.module.css";

export default function CardInPage() {
  return (
    <div>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        width="1100px"
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "400px" }}
          width="500px"
          src="https://i.pinimg.com/originals/e8/a5/aa/e8a5aab431ef11caa24282a3fef66e21.jpg"
          alt=""
        />

        <Stack>
          <CardBody>
            <Heading size="md">Апартаменты "Mua"</Heading>

            <Text py="2">
              Современные апартаменты в самом сердце старого города.
            </Text>
          </CardBody>

          <CardFooter>
            <div className={styles.cardBottom}>
              <Button variant="solid" colorScheme="blue">
                Добавить в избранное
              </Button>
              <div>5400₽ за сутки</div>
            </div>
          </CardFooter>
        </Stack>
      </Card>
    </div>
  );
}
