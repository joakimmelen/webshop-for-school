import React from 'react'
import { Link } from "react-router-dom";
import Item from '../Item/Item'
import { Badge, Box, Container, Drawer, Grid, Paper } from '@mui/material'
import { useQuery } from "react-query"
import { useState } from 'react'
import { LinearProgress } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Cart from '../Cart/Cart';
import { Wrapper, StyledButton } from './Products.styles';
import { cartState } from '../stores/cart/Atom';
import { useRecoilState } from 'recoil';
import { CartItemType } from '../types';

const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();

type Props = {
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

function Products({ addToCart, removeFromCart }: Props) {
    const [cart, setCart] = useRecoilState(cartState);

    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products', 
        getProducts
        );

    const getTotalItems = (items: CartItemType[]) => 
      items.reduce((ack: number, item) => ack + item.quantity, 0)

    // const handleAddToCart = (clickedItem: CartItemType) => {
    //   setCartItems(prev => {
    //     //1. Is the item already added in the cart? 
    //     const isItemInCart = prev.find(item => item.id === clickedItem.id)

    //     if (isItemInCart) {
    //       return prev.map(item => 
    //         item.id === clickedItem.id
    //         ? { ...item, quantity: item.quantity + 1 }
    //         : item
    //       );
    //     }
    //     // First time the item is added
    //     const newCart = [...prev, { ...clickedItem, quantity: 1 }];
    //     window.localStorage.setItem("cart", JSON.stringify(newCart))
    //     return newCart
    //   });
    // };

    // const handleRemoveFromCart = (id: number) => {
    //   setCartItems(prev => 
    //     prev.reduce((ack, item) => {
    //       if (item.id === id) {
    //         if (item.quantity === 1) return ack;
    //         return [...ack, { ...item, quantity: item.quantity - 1 }];
    //       } else {
    //         return [...ack, item];
    //       }
    //     }, [] as CartItemType[])
    //   );
    // };

    if (isLoading) return <LinearProgress />;
    if (error) return <div>Something went wrong..</div>

  return (
<Wrapper>
    <Container>
    <Box sx={{ bgcolor: 'white', height: 'auto', padding: '10px' }}>
      <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={3}>
           
            <Item item={item} handleAddToCart={addToCart} />
            
            </Grid>
        ))}
      </Grid>
        </Box>
        </Container>
  </Wrapper>
  )
}

export default Products