import { Box, Container, Typography } from '@mui/material'
import React, { Component } from 'react'
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../types"
import Cart from "../Cart/Cart"
import { Wrapper } from '../App.styles';
import { useRecoilState } from 'recoil';
import { cartState } from '../stores/cart/Atom';
        
type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Checkout: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const [cart, setCart] = useRecoilState(cartState)
    const calculateTotal = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
    const calculateQuantity = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity, 0);

    return (
        <Wrapper>
            <Box sx={{display: "flex", marginLeft: "auto" }}>
            <Typography sx= {{ marginBottom: 10, display: "flex", justifyContent: "end", marginRight: "auto" }} variant='h2' component="h1" >Cashout</Typography>
            </Box>
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: 'white', height: 'auto' }}>
        {cartItems.map(item => (
            <CartItem 
            key={item.id}
            item={item}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            />
            )
            )
        }
        </Box>
            <Box sx={{ bgcolor: 'whitesmoke', height: 'auto' }}>
            <Typography variant='h3' component="h3" >{calculateQuantity(cartItems)} items</Typography>
                <Typography variant='h2' component="h3" >Total: ${calculateTotal(cartItems).toFixed(2)}</Typography>
            </Box>
    </Container>
        </Wrapper>

    )
}

export default Checkout;

// function Checkout() {
//   return (
//     <Container maxWidth="lg">
//     <Box sx={{ bgcolor: 'orange', height: '100vh' }}>
//        <Typography>Hi!!,!! please come again</Typography>
//     </Box>
// </Container>
//   )
// }

// export default Checkout