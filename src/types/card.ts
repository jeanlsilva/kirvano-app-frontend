export interface Card {
    id?: number;
    name: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    cvc: string;
}