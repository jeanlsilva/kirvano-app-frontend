import { Card } from "./card";

export interface Checkout {
    product_name: string;
    product_avatar: string;
    subtotal: number;
    tax: number;
    shipping_fee: number;
    total: number;
    address_id: number;
    card?: Card;
    card_id?: number;
}