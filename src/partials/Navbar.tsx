import { Badge, Box, Button, Drawer, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Cart from '../Cart/Cart'
import { Wrapper, StyledButton } from './Navbar.styles'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRecoilState } from 'recoil'
import { cartState } from '../stores/cart/Atom'
import { CartItemType } from '../types'

type Props = {
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

function Navbar({ addToCart, removeFromCart }: Props) {
    const [cart, setCart] = useRecoilState(cartState);

    const getTotalItems = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity, 0)

  return (
    <Wrapper>
        <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        spacing={2}
        >
            <img src="src/assets/logo/logo_ful.png" alt="logo" height="50px" />
            <nav>
                <Link to="/">News</Link>
                <Link to="/products">Products</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/Checkout">Checkout</Link>
            </nav>
            <Drawer anchor='right' open={cart.open} onClose={() => setCart({...cart, open: false})}>
            <Cart 
            cartItems={cart.items} 
            addToCart={addToCart}
            removeFromCart={removeFromCart} 
            />
            </Drawer>
            <StyledButton onClick={() => setCart({...cart, open: true})}>
                <Badge badgeContent={getTotalItems(cart.items)} color='error'>
                    <AddShoppingCartIcon />
                </Badge>
            </StyledButton>
        </Stack>
  </Wrapper>
  )
}

export default Navbar