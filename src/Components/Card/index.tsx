import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useState } from "react";
import { IProduct } from "../../interfaces/product";
import { useRecoilState } from "recoil";
import { cartItemsState } from "../../state/globalState";
import { ICartItem } from "../../interfaces/cart";
import { Link } from "react-router-dom";

interface Props {
    product: IProduct;
}

function Card( { product }: Props ) {
    const {
        // id,
        // description,
        image,
        price,
        title,
        category,
    } = product;

    const [liked, setLiked] = useState(false);
    const [cart, setCart] = useRecoilState<ICartItem[]>(cartItemsState);
    // const items = useRecoilValue(totalPriceByMapProductState);
    
    console.log("🚀 ~ Card ~ cart:", cart)
    const productInCart = cart.find(x => x.product.id === product.id);

    
    const handleLike = () => {
        setLiked(!liked);
    };

    const handlePlusQuantity = () => {
        const existItem = cart.find(item => item.product.id === product.id);

        if (!existItem) {
            setCart([
                ...cart,
                {
                    product: product,
                    quantity: 1,
                    totalPrice: product.price
                }
            ]);
        } else{
            // setCart();
            if(productInCart?.quantity){
                setCart(
                    cart.map(item =>
                      item.product.id === product.id
                        ? { 
                            ...item, 
                            quantity: productInCart.quantity! + 1, 
                            // totalPrice: totalPrice
                        }
                        : item
                    )
                );

            }

        }
    }

    const handleLessQuantity = () => {

        if(productInCart?.quantity){
            if (productInCart.quantity! >= 1) {
                setCart(
                    cart.map(item =>
                      item.product.id === product.id
                        ? { ...item, quantity: item.quantity - 1, totalPrice: productInCart.quantity * productInCart.product.price}
                        : item
                    )
                  );
            } 
            
            if(productInCart.quantity! <= 1){
    
                // alert('esta seguro que desea eliminar')
                setCart(
                    cart.filter(item => item.product.id !== product.id)
                )
            }
        }

    }


    return ( 
        <div className="relative flex flex-col gap-1 max-h-96 items-center">
            <div className="w-full h-52 shadow-card rounded-2xl flex flex-row justify-center items-center p-2">
                <figure className="relative w-full h-full bg-transparent ">
                    <div className={`absolute flex 
                        flex-col h-full right-0 
                        justify-start items-center p-2 
                        bg-slate-500/40 rounded-2xl`}>
                        <Icon 
                            className="cursor-pointer drop-shadow-lg" 
                            icon={`${!liked ? 'ph:heart-light' : 'ph:heart-fill'}`}
                            width="2rem" 
                            height="2rem"  
                            style={{color: 'white'}} 
                            onClick={handleLike}
                        />
                    </div>
                    <Link to={`products/${product.id}`}>
                        <img 
                            className="h-full w-full rounded-2xl object-contain object-center cursor-pointer"
                            src={image}
                            alt="" 
                            // onClick={() => navigate('products/' + product.id)}
                        />
                    </Link>

                    <span className="absolute bottom-2 left-2 bg-slate-700/70 text-white text-sm px-2 rounded-2xl cursor-pointer">
                        {category}
                    </span>
                </figure>
            </div>
            <div className="flex flex-col gap-2 w-full px-11 ">
                <span className="text-lg font-semibold text-ellipsis whitespace-nowrap overflow-hidden ">{title}</span>
                <span className="text-lg font-bold">${price}</span>
            </div>
            <div className="relative">
            {(productInCart) ? (

                <div className="flex flex-row justify-center items-center gap-3">
                        <button 
                            className="flex flex-row bg-slate-500 rounded-2xl p-1 shadow-card"
                            onClick={handleLessQuantity}
                        >
                            <Icon 
                                icon="ic:outline-minus" 
                                width="1.3rem" 
                                height="1.3rem"  
                                style={{color: 'whitesmoke'}} 
                            />
                        </button>

                            {/* <span className="text-lg font-semibold">{quantity}</span> */}
                            <input className="w-5 text-center" type="text" value={productInCart.quantity}/>

                        <button 
                            className="flex flex-row bg-slate-500 rounded-2xl p-1 shadow-card" 
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

            ) : (
               
                <button 
                    className="w-[150px] h-12 bg-slate-500 text-white font-semibold rounded-2xl shadow-card"
                    onClick={handlePlusQuantity}
                >
                    Add to Cart
                </button>
            )
            
            }   
            </div>
        </div>
    );
}

export default Card;