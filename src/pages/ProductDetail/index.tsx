import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { cartItemsState, productsListState } from "../../state/globalState";
import { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { Rating, Star } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { ICartItem } from "../../interfaces/cart";

function ProducDetail() {
    const { id } = useParams();
    // const [products, setProducts] = useRecoilState<IProduct[]>(productsState);
    const products = useRecoilValue<IProduct[]>(productsListState);
    console.log("🚀 ~ ProducDetail ~ products:", products)
    const [product, setProduct] = useState<IProduct>()
    const [cart, setCart] = useRecoilState<ICartItem[]>(cartItemsState);
    let productInCart: ICartItem | undefined;
    if(product){
        productInCart = cart.find(x => x.product.id === product.id);

    }

    useEffect(() => {
        if(id){
            const parsedId = parseInt(id); 
            const foundProduct = products.find(p => p.id === parsedId);
            setProduct(foundProduct);
        }
    }, [id])

    const handlePlusQuantity = () => {
        if(product){
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

        
    }

    const handleLessQuantity = () => {

        if(product){
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


    }


    return ( 
        <div className="grid grid-cols-2 p-40 w-full box-border gap-x-10">
            <div className="flex flex-col justify-center items-end">
                <figure className="w-80">
                    <img 
                        className="mix-blend-multiply"
                        src={product?.image || 'https://images.pexels.com/photos/268349/pexels-photo-268349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} 
                        alt="" 
                    />
                </figure>
            </div>
            <div className="flex flex-col gap-3 w-1/2">
                <span className="text-2xl">{product?.title || 'undefined'}</span>
                <div className="flex flex-row justify-start items-center gap-2">
                    <Rating 
                        readOnly 
                        value={product?.rating.rate || 0} 
                        halfFillMode="box" 
                        style={{maxWidth: 150}}
                        radius="large"
                        itemStyles={{
                            itemShapes: Star,
                            activeFillColor: '#ffb700',
                            inactiveFillColor: '#fbf1a9'
                        }}
                    />
                    
                    <span className="text-gray-800 text-lg font-semibold">{product?.rating.count}</span>
                </div>
                <p className="text-normal text-gray-600">{product?.description || 'undefined'}</p>
                <div className="flex flex-row justify-start items-center">
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
        </div>
     );
}

export default ProducDetail;