import { useRecoilState, useRecoilValue } from "recoil";
import { cartHandleState, cartItemsState, ordersState, totalPricesState, totalQuantityState, } from "../../state/globalState";
import { ICartItem } from "../../interfaces/cart";
import { IOrder } from "../../interfaces/order";

function CartTotal() {
    const [cartHandle, setCartHandle] = useRecoilState<boolean>(cartHandleState);
    const total = useRecoilValue(totalPricesState);
    const countItems = useRecoilValue(totalQuantityState);
    const [cart, setCart] = useRecoilState<ICartItem[]>(cartItemsState);
    const [orders , setOrders] = useRecoilState<IOrder[]>(ordersState);

    
    const hendleCheckout = () => {
        const date = new Date();
        const unixId =  Math.floor(date.getTime() / 1000);
        
        setOrders([
            ...orders,
            {
                id: unixId,
                products: [...cart],
                total: total,
                countItems: countItems,
                date: date,
                status: "pending"
            }
        ]);

        setCart([]);
        setCartHandle(false);
        // reset total prices
        // reset total quantity
        // reset cart items
        // reset cart handle

        // Redirect to checkout page
        // Show success message
        // Hide cart total
    }

    return ( 
        <div className={`fixed ${cartHandle ? 'w-1/4 right-0' : 'w-0 -right-1/4'}
                h-28 bg-slate-300 bottom-0 right-0 
                transition-all duration-500
                shadow-card 
                flex flex-col
                p-2
        `}>
                <div className="flex flex-row gap-1 justify-between items-center h-1/2">
                    <div className="flex flex-row gap-1">
                        <span className="font-semibold text-slate-950 text-lg">Total:</span>
                        <span 
                            aria-label="Cantidad total a pagar" 
                            className="font-bold text-slate-950 text-xl"
                        >${total.toFixed(2)}</span>
                    </div>

                    <div className="flex flex-row gap-1">
                        <span className="font-semibold text-slate-950 text-lg">Items:</span>
                        <span 
                            aria-label="Cantidad total a pagar" 
                            className="font-bold text-slate-950 text-xl"
                        >{countItems}</span>
                    </div>
                </div>

                <button 
                    className="w-full h-1/2 bg-slate-900 text-pretty text-slate-100 rounded-lg cursor-pointer"
                    onClick={hendleCheckout}
                    disabled={cart.length === 0 ? true : false}
                > 
                    Checkout
                </button>
        </div>
     );
}

export default CartTotal;