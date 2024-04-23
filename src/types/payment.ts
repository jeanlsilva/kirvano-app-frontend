export interface Payment {
    name: string;
    number: string;
    expirationMonth: number;
    expirationYear: number;
    cvc: string;
}