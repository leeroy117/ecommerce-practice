import { Link } from "react-router-dom";
import { IOrder } from "../../interfaces/order";

interface Props {
    order: IOrder;
}
function Order({ order }: Props) {
    const {
        status,
        date,
        total,
        id,
        products,
        countItems
    } = order;

    return ( 
        <div className="flex flex-col w-full gap-2 shadow-md p-5 rounded-xl">
                <div className="grid grid-cols-4 bg-slate-300 rounded-lg p-3 shadow-sm">
                        <div className="flex flex-col gap-0">
                            <span className="text-sm text-slate-700">Status</span>
                            <span className="text-lg font-semibold">{status}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-700">Order Date</span>
                            <span className="text-lg font-semibold">{date.toLocaleDateString()}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-slate-700">Total</span>
                            <span className="text-lg font-semibold">${total}</span>
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-sm text-slate-700">Order ID</span>
                            <span className="text-lg font-semibold">{id}</span>
                        </div>
                </div>
                <div className="flex flex-col w-full gap-2 px-2">

                    {
                        products.map(p => (
                            <div className="grid grid-cols-5 h-50 py-2 rounded-xl bg-slate-200 shadow-sm place-items-center">
                                <div className="relative h-16">
                                    <figure className="relative w-full h-full">
                                        <Link to={`/products/${p.product.id}`}>
                                            <img 
                                                className="w-full object-contain object-center cursor-pointer h-full mix-blend-multiply"
                                                src={p.product.image} 
                                                alt="" 
                                                />
                                        
                                        </Link>
                                    </figure>
                                </div>
                                <div className="">
                                    <span className="text-sm font-semibold place-self-start">{p.product.title}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold">{p.quantity}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold">${p.product.price}</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold">${p.totalPrice}</span>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
                <div className="flex flex-row justify-end items-center w-full px-3 gap-2">
                    <span className="text-lg font-extralight text-slate-600">Total items:</span>
                    <span className="text-lg font-semibold">{countItems}</span>
                </div>
            </div>
     );
}

export default Order;