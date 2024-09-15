import {ICartItem } from "./cart";

export interface IOrder {
    id: number;
    products: ICartItem[];
    date: Date;
    total: number;
    countItems: number;
    status: 'pending' | 'processing' | 'shipped' |'delivered' | 'cancelled';
}
