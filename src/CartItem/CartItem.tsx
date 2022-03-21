import { Button } from "@mui/material";
//types
import { CartItemType } from "../types"
//styles
import { Wrapper } from "./CartItem.styles"

type Props = {
    item: CartItemType;
    addToCart: (clickedItem: CartItemType) => void;
    removeFromCart: (id: number) => void;
}


const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => (
    <Wrapper>
        <div>
            <h3>{item.title}</h3>
            <div className="information">
                <p>Price: ${item.price}</p>
                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
            </div>
            <div className="buttons">
                <Button 
                size="small"
                disableElevation
                variant="contained"
                style={{ background: 'rgba(170, 150, 183, 1)' }}
                onClick={() => removeFromCart(item.id)}
                >
                    -
                </Button>
                <p>{item.quantity}</p>
                <Button 
                size="small"
                disableElevation
                variant="contained"
                style={{ background: 'rgba(170, 150, 183, 1)' }}
                onClick={() => addToCart(item)}
                >
                    +
                </Button>
            </div>
        </div>
        <img src={item.image} alt={item.title} />
    </Wrapper>
);

export default CartItem;