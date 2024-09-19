import React from "react";
import styles from "./HomePage.module.css";
import { Button } from "@chakra-ui/react";
import CardInPage from "./CardInPage.jsx";

export default function Homepage() {
  return (
    <div className={styles.container}>
      <div className={styles.buttonTop}>
        <Button className={styles.button}>Все категории</Button>
        <Button className={styles.button}>Комнаты</Button>
        <Button className={styles.button}>Квартиры</Button>
        <Button className={styles.button}>Дома</Button>
      </div>
      <div className={styles.card}>
        <CardInPage />
      </div>
    </div>
  );
}
