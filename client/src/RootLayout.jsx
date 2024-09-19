import React from 'react';
import Header from './Components/ui/Header';
import { Outlet } from 'react-router-dom';

function RootLayout({ user, setUser }) {
  return (
    <>
      <Header user={user} setUser={setUser} />
      <Outlet />
    </>
  );
}

export default RootLayout;
