import { Address } from "./address";
import { Card } from "./card";

export interface Checkout {
    product_name: string;
    product_avatar: string;
    subtotal: number;
    tax: number;
    shipping_fee: number;
    total: number;
    card: Card;
    address: Address;
}