import { useRecoilState } from "recoil";
import { cartHandleState, cartItemsState } from "../../state/globalState";
import CartItem from "../CartItem.tsx";
import { ICartItem } from "../../interfaces/cart.ts";
import CartTotal from "../CartTotal/CartTotal.tsx";

function Cart() {
    const [cartHandle] = useRecoilState<boolean>(cartHandleState);
    const [cart] = useRecoilState<ICartItem[]>(cartItemsState);
    

    return ( 
        <div className={`fixed 
            h-customCart ${cartHandle ? 'w-1/4 right-0' : 'w-0 -right-10'} 
            bg-slate-200 bottom-0 top-16 z-50 transition-all duration-500 shadow-card p-5 
            flex flex-col gap-2
            overflow-y-auto    
        `}>
            {
                cart.map((c) => {
                    return <CartItem key={c.product.id} CartItem={c}/>;
                })
            }
            <CartTotal />
        </div>
     );
}

export default Cart;