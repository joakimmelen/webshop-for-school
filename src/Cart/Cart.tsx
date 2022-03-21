import CartItem from "../CartItem/CartItem";
//styles
import { Wrapper } from "./Cart.styles";
//types
import { CartItemType } from "../types"
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cartState } from "../stores/cart/Atom";

type Props = {
    cartItems: CartItemType[];
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
    const [cart, setCart] = useRecoilState(cartState)
    const calculateTotal = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity * item.price, 0);
    const calculateQuantity = (items: CartItemType[]) => 
    items.reduce((ack: number, item) => ack + item.quantity, 0);

   
    return (
        <Wrapper>
            <h2>Your Shopping Cart <Button onClick={() => setCart({...cart, open: false})}>Close cart</Button> </h2> <Button onClick={() => setCart({...cart, open: false})} component={Link} to="/checkout" size="large">Checkout</Button>
            {cartItems.length === 0 ? <p>No items in cart.</p> : null}
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
            {cartItems.length > 0 ? <Button variant="text" onClick={() => setCart({...cart, items: [] as CartItemType[]})}>Empty cart</Button> : null}
            
            <div className="cartTotal">
                <p>{calculateQuantity(cartItems)} items</p>
                <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
            </div>
        </Wrapper>
    )
}

export default Cart;