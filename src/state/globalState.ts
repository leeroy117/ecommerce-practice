import { atom, selector } from "recoil";
import { IProduct } from "../interfaces/product";
import { ICartItem } from "../interfaces/cart";
import axios from "axios";
import { BASE_URL } from "../environment";
import { IOrder } from "../interfaces/order";

// const initialCategories: string[] = [];

// export const categoriesState = atom({
//     key: 'categoriesState', // unique ID (with respect to other atoms/selectors)
//     default: initialCategories, // default value (aka initial value)
// });

export const categoriesState = selector({
    key: 'categoriesState',
    get: () => {
        // const categories = get(categoriesState);
        return axios.get(`${BASE_URL}products/categories`)
           .then((response) => response.data)
           .then((categories) => categories.map((c: string[]) => c))
           .catch((e) => console.error(e));
    },
})


const initialProducts: IProduct[] = [];
    
export const productsState = atom({
    key: 'productsState', // unique ID (with respect to other atoms/selectors)
    default: initialProducts, // default value (aka initial value)
});

export const productsListState = selector({
    key: 'productsListState',
    get: () => {
        return axios.get(`${BASE_URL}products`)
            .then((response) => response.data)
            .catch((e) => console.error(e));
    },
})

const initalCarHandleState: boolean = false;

export const cartHandleState = atom({
    key: 'cartHandleState',
    default: initalCarHandleState,
});

const initialCartItems: ICartItem[] = [];

export const cartItemsState = atom({
    key: 'cartItemsState',
    default: initialCartItems,
});

export const totalPriceByMapProductState = selector({
    key: 'totalPriceByMapProductState',
    get: ({ get }) => {
        const cart = get(cartItemsState);
        return cart.map((item) => {
            return ({
                ...item,
                totalPrice: item.product.price * item.quantity,
            })
        });
    },
});

export const totalPricesState = selector({
    key: 'totalPricesState',
    get: ({ get }) => {
        const items  = get(totalPriceByMapProductState);
        return items.reduce((total, item) => total + item.totalPrice, 0);
    },
});

export const totalQuantityState = selector({
    key: 'totalQuantityState',
    get: ({ get }) => {
      const cart = get(cartItemsState);
    //   return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
        return cart.reduce((total, item) => total + item.quantity, 0);
    },
});

export const countItemsCartState = selector({
    key: 'countItemsCartState',
    get: ({ get }) => {
        return get(cartItemsState).length;
    }
})

/************************************************************************ */

const initialOrders: IOrder[] = [];

export const ordersState = atom({
    key: 'ordersState',
    default: initialOrders,
})

/************************************************************************* */