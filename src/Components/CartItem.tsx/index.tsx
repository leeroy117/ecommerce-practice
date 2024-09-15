import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { ICartItem } from "../../interfaces/cart";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartHandleState, cartItemsState, totalPriceByMapProductState } from "../../state/globalState";

interface Props {
    CartItem: ICartItem;
}


function CartItem({ CartItem }: Props) {
    const {
        product,
        quantity,
        // totalPrice
    } = CartItem;

    const [cart, setCart] = useRecoilState<ICartItem[]>(cartItemsState);
    const productInCart = cart.find(x => x.product.id === product.id);
    const [cartHandle] = useRecoilState<boolean>(cartHandleState);
    // const totalPrice = useRecoilValue(totalPriceByProductState);
    const items = useRecoilValue(totalPriceByMapProductState);
    const matchedItem = items.find(x => x.product.id === product.id)

    const total = matchedItem?.totalPrice;
    // const totalPrice = items[product.id];

    console.log('prduct___in___cart', productInCart)

    const handlePlusQuantity = () => {
        setCart(
            cart.map(item =>
                item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
        );
    }

    const handleLessQuantity = () => {

        if(productInCart?.quantity){
            if (productInCart.quantity! >= 1) {
                setCart(
                    cart.map(item =>
                      item.product.id === product.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                    )
                  );
            } 
            
            if(productInCart.quantity! <= 1){
    
                alert('esta seguro que desea eliminar')
                setCart(
                    cart.filter(item => item.product.id !== product.id)
                )
            }
        }

    }

    const deleteItem = () => {
        alert('esta seguro que desea eliminar')
        setCart(
            cart.filter(item => item.product.id!== product.id)
        )
    }

    return ( 
        <div className={`
            ${cartHandle ? 'relative' : 'hidden'} 
            flex flex-row gap-2 w-full h-32 
            bg-slate-50 rounded-md p-2 pr-8 shadow-md transition-all duration-500`}>
                <button 
                    className="cursor-pointer"
                    onClick={deleteItem}
                > 

                    <Icon className={`
                        absolute top-2 right-2`} 
                        icon="ic:round-delete" 
                        width="1.5rem" 
                        height="1.5rem"  
                        style={{color: 'red'}} 
                    />
                </button>
            <figure className="relative h-full w-2/6 rounded-md bg-transparent">
                <img 
                    className="w-full h-full object-contain object-center mix-blend-multiply" 
                    src={product.image}
                    alt="Product"
                />
            </figure>
            <div className="relative flex flex-col justify-around w-4/6">
                <div className="flex flex-row">
                    <span className="font-semibold text-sm text-ellipsis whitespace-nowrap overflow-hidden">{product.title}</span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                    <span className="text-slate-500 font-semibold">Quantity:</span>
                    <span className="text-lg font-semibold">{quantity}</span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                    <span className="text-slate-500 font-semibold">Price:</span>
                    <span className="text-black font-semibold">{product.price}</span>
                </div>
                <div className="flex flex-row gap-1 justify-start items-center">
                    <span className="text-slate-500 font-semibold">Total:</span>
                    <span className="text-black font-semibold">${total}</span>
                </div>
            </div>
            <div className={`${cartHandle ? 'absolute' : 'hidden'} flex flex-row justify-center items-center bottom-2 right-2`}>
                <button 
                    className="flex flex-row justify-center items-center bg-slate-500 rounded-2xl p-1 shadow-card w-6 h-6 "
                    onClick={handleLessQuantity}
                >
                    <Icon 
                        icon="ic:outline-minus" 
                        width="1rem" 
                        height="1rem"  
                        style={{color: 'whitesmoke'}} 
                    />
                </button>
                    <input className="w-5 text-center" type="text" value={quantity}/>
                <button 
                    className="flex flex-row justify-center items-center bg-slate-500 rounded-2xl p-1 shadow-card w-6 h-6 " 
                    onClick={handlePlusQuantity}
                >
                    <Icon 
                        icon="ic:baseline-plus" 
                        width="1.3rem" 
                        height="1.3rem"  
                        style={{color: 'whitesmoke'}} 
                    />
                </button>
            </div>
        </div>
     );
}

export default CartItem; 