export interface Payment {
    name: string;
    cardNumber: string;
    expirationMonth: number;
    expirationYear: number;
    cvc: string;
}