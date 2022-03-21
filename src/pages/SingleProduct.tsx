import { PictureAsPdfRounded } from '@mui/icons-material';
import { BottomNavigation, Box, Button, Container, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { preview } from 'vite';
import CartItem from '../CartItem/CartItem';
import Item from '../Item/Item';
import { cartState } from '../stores/cart/Atom';
import { CartItemType } from '../types';
import { Wrapper } from "./SingleProduct.styles"

const getProducts = async (): Promise<CartItemType[]> =>
await (await fetch('https://fakestoreapi.com/products')).json();

type Props = {
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

// const SingleProduct({ addToCart, removeFromCart }: Props) {
//     // const [cart, setCart] = useRecoilValue(cartState)

//     const params = useParams()

//     const { data, isLoading, error } = useQuery<CartItemType[]>(
//         'products', 
//         getProducts
//         );

//         if (isLoading) return <LinearProgress />;
//         if (error) return <div>Something went wrong..</div>
        // function findProduct(hack: Array<CartItemType>, jack: number) {
        //     hack.find(jack)
        // }
        function parsed(x: string, y: number) {
            const parsed = parseInt(x, y)
            return parsed;
        }
        // const item = data?
    // const product = data?.find(item => item.id === parseInt(params.item.id))

       

        
// };


function SingleProduct({ addToCart, removeFromCart }: Props) {
    const [cart, setCart] = useRecoilState(cartState);

    const { data, isLoading, error } = useQuery<CartItemType[]>(
        'products', 
        getProducts
        );

        const params = useParams<{productId: string}>();
        console.log(data, params)
        
        if (isLoading) return <LinearProgress />;
        if (error) return <div>Something went wrong..</div>
        if (!params.productId) return <div>tja</div>
        // @ts-ignore
        const product = data?.find(product => product.id === parseInt(params.productId))
        console.log(product)
        if (!product) return <div>Errorerrorr</div>
  return (
      <Wrapper>

    <Container>
      <Typography variant="h3" component="h1" marginTop={3}>
      {product.title}
      </Typography>
      {/* <Box marginTop={3} sx={{ display: "flex" }}> */}
        <img
          src={product.image}
          height={350}
        //   width={500}
        />
      
      {/* </Box> */}
      <Typography variant="h6" component="h4" marginTop={3}>
        About this product
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h5" component="p" marginY={3}>
        {product.description}
        </Typography>
      </Box>
      <Typography variant="h6" component="h4" marginBottom={3}>
        Frequently Asked Questions
      </Typography>
      
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
      
        >
          
        </BottomNavigation>
      </Paper>
    </Container>

      </Wrapper>
      
  
  )
};

export default SingleProduct;