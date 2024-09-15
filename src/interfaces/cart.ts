import { IProduct } from "./product";

export interface ICartItem {
    product: IProduct;
    quantity: number;
    totalPrice: number;
}

export interface ICart {
    items: ICartItem[];
    totalQuantity: number;
}