import { atom } from "recoil";
import { CartItemType } from "../../types"

export const cartState = atom({
    key: "cartState",
    default: {
        items: [] as CartItemType[],
        open: false,
    }
})



// const [cartOpen, setCartOpen] = useState(false);
// const [cartItems, setCartItems] =  useState(() => {
//   const cart = localStorage.getItem("cart");
// if (cart) return JSON.parse(cart) as CartItemType[];
// return [] as CartItemType[]
// });