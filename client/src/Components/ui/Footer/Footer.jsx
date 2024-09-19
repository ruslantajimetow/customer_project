import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div >Aдрес: ул. Орджоникидзе, 11, стр. 10, Москва, 119071</div> | <div> email: victoria.vaskova@elbruboot.camp </div>
    </div>
  );
}
