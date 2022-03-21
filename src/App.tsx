import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import News from './pages/News'
import Products from './pages/Products'
import SingleProduct from './pages/SingleProduct'
import About from './pages/About'
import Contact from './pages/Contact'
import ErrorPage from './pages/ErrorPage'
import { Drawer } from '@mui/material'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import { Wrapper } from './App.styles'
import Cart from './Cart/Cart'
import Checkout from './pages/Checkout'
import Navbar from './partials/Navbar'
import Navbar2 from './partials/Navbar2'
import { CartItemType } from './types'
import { useRecoilState } from 'recoil'
import { cartState } from './stores/cart/Atom'

function App() {
  const [cart, setCart] = useRecoilState(cartState);

  useEffect(() => { 
    const localCart = localStorage.getItem("cart");
    const parsedCart = localCart ? JSON.parse(localCart) as CartItemType[] : []
    
  	setCart({ ...cart, items: parsedCart })  
  }, [])

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart.items))
  }, [cart.items])

    const handleAddToCart = (clickedItem: CartItemType) => {
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

    const handleRemoveFromCart = (id: number) => {
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
    <div className="App">
      {/* <Navbar 
      addToCart={handleAddToCart}
      removeFromCart={handleRemoveFromCart}
      /> */}
      <Navbar2 />
        <Routes key={location.pathname}>
        <Route path="/" element={<News />} />
        <Route path="/products" element={<Products 
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        />} />
        <Route path="/products/:productId" element={<SingleProduct addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<Checkout cartItems={cart.items}
      addToCart={handleAddToCart}
      removeFromCart={handleRemoveFromCart}/>} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    <Drawer anchor='right' open={cart.open} onClose={() => setCart({...cart, open: false})}>
      <Cart 
      cartItems={cart.items} 
      addToCart={handleAddToCart}
      removeFromCart={handleRemoveFromCart} 
      />

    </Drawer>
      
    </div>
  )
}

export default App
