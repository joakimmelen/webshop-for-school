import { Button, Link } from "@mui/material";
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
//types
import { CartItemType } from "../types"
//styles
import { Wrapper } from "./Item.styles";

type Props = {
    item: CartItemType;
    handleAddToCart: (clickedItem: CartItemType) => void;
}

const Item: React.FC<Props> = ({ item, handleAddToCart }) => (
    <Wrapper>
            <img src={item.image} alt={item.title} />
            <div>
            <h3>{item.title}</h3>
            <Button size="small" variant="outlined" component={RouterLink} to={`/products/${item.id}`}>Read more</Button>
            <h3>${item.price}</h3>
            </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;