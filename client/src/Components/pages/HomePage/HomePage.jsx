import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import {
  Alert,
  AlertIcon,
  Button,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import CardInPage from './CardInPage.jsx';
import axiosInstance from '../../../axiosInstance.js';
import { NavLink } from 'react-router-dom';

export default function Homepage({ housings, user }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    axiosInstance.get(`/categories`).then((res) => setCategories(res.data));
  }, []);

  const filteredHousings =
    selectedCategory === 'All'
      ? housings
      : housings.filter(
          (item) =>
            item.Category.name.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className={styles.container}>
      <div className={styles.buttonTop}>
        <Button
          onClick={() => setSelectedCategory('All')}
          colorScheme="blue"
          variant={selectedCategory === 'All' ? 'solid' : 'outline'}
        >
          All
        </Button>
        {categories.map((item) => {
          return (
            <Button
              key={item.id}
              onClick={() => setSelectedCategory(item.name)}
              colorScheme="blue"
              variant={selectedCategory === item.name ? 'solid' : 'outline'}
            >
              {item.name.toUpperCase()}
            </Button>
          );
        })}
      </div>
      <Grid gridTemplateColumns="repeat(1, 1100px)" justifyContent="center">
        {filteredHousings.map(({ id, title, image, address, desc, price }) => {
          return (
            <GridItem key={id}>
              <CardInPage
                title={title}
                image={image}
                address={address}
                desc={desc}
                price={price}
                user={user}
                id={id}
              />
            </GridItem>
          );
        })}
      </Grid>
    </div>
  );
}
