import { useRecoilState } from "recoil";
import { ordersState } from "../state/globalState";
import Order from "../Components/Order";

export const MyOrders = () => {
    const [orders] = useRecoilState(ordersState);

    console.log("🚀 ~ MyOrders ~ orders:", orders)

    return ( 
        <div className="flex flex-col justify-center items-center w-svw p-8 gap-1">
            <h1 className="text-2xl font-thin text-slate-950">My Orders</h1>
            {
                orders.length === 0 ? (<p>No hay ordenes aún</p>) :
                (
                    <div className="flex flex-col w-1/2 gap-4 ">
                        {
                            orders.map((order) => (
                                <Order key={order.id} order={order} />
                            ))
                        }
                    </div>
                )
            }
        </div>
     );
}