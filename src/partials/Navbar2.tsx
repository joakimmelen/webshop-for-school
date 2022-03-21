import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Badge, Drawer } from '@mui/material';
import Cart from '../Cart/Cart';
import { StyledButton } from './Navbar.styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRecoilState } from 'recoil'
import { cartState } from '../stores/cart/Atom'
import { CartItemType } from '../types'
import { Link as RouterLink } from "react-router-dom"

type Props = {
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const pages = ['Products', 'About', 'Contact', 'Checkout'];
    
const ResponsiveAppBar = () => {
        const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
        const [cart, setCart] = useRecoilState(cartState);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const getTotalItems = (items: CartItemType[]) => 
  items.reduce((ack: number, item) => ack + item.quantity, 0)

  const addToCart = (clickedItem: CartItemType) => {
    setCart(prev => {
      const isItemInCart = prev.items.find(item => item.id === clickedItem.id);
      
      if (isItemInCart) {
        return {
          ...prev,
          items: prev.items.map(item => item.id === clickedItem.id
                      ? { ...item, quantity: item.quantity + 1 } 
                      : item)
        }
      }
    
      const newCart = { ...prev, items: [...prev.items, { ...clickedItem, quantity: 1 }]}

      window.localStorage.setItem("cart", JSON.stringify(newCart))
      return newCart
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => ({
      ...prev,
      items: prev.items.reduce((ack, item) => {
        if (item.id === id) {
          if (item.quantity === 1) return ack;
          return [...ack, { ...item, quantity: item.quantity - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    
    }))
  };

  return (
    <AppBar style={{ background: 'rgba(170, 150, 183, 1)' }} position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink} 
            to={`/`}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            <img src="/assets/logo.png" alt="logo" height="70px" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem component={RouterLink} to={`/${page}`} key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink} 
            to={`/`}
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <img src="/assets/logo.png" alt="logo" height="50px" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
            {pages.map((page) => (
              <Button
                key={page}
                component={RouterLink} to={`/${page}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
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
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;