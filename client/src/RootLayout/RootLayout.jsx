import React from "react";
import Header from "../Components/ui/Header";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";

function RootLayout({ user, setUser }) {
  return (
    <div className={styles.wrapperPage}>
      <Header user={user} setUser={setUser} />
      <Outlet />
      <footer className={styles.footer}>
        <div>
        adress
        </div>
        |
        <div>
        email vika
        </div>
        </footer>
    </div>
  );
}

export default RootLayout;
