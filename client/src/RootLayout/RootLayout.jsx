import React from "react";
import Header from "../Components/ui/Header";
import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.css";
import Footer from "../Components/ui/Footer/Footer";

function RootLayout({ user, setUser }) {
  return (
    <div className={styles.wrapperPage}>
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default RootLayout;
