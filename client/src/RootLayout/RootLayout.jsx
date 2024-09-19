import React from 'react';
import Header from '../Components/ui/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Components/ui/Footer/Footer';
import { Flex, Spacer } from '@chakra-ui/react';

function RootLayout({ user, setUser }) {
  return (
    <Flex flexDir="column" minH="100vh">
      <Header user={user} setUser={setUser} />
      <Outlet />
      <Spacer />
      <Footer mt="auto" />
    </Flex>
  );
}

export default RootLayout;
