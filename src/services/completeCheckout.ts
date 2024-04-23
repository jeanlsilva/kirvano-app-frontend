import { Payment } from "@/types/payment";

export async function completeCheckout(data: Payment) {
    try {
        const { name, cardNumber, expirationMonth, expirationYear, cvc } = data;

        const response = await fetch(`
            ${process.env.NEXT_PUBLIC_API_URL}/checkout?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}
            `, {
            method: 'POST',
            body: JSON.stringify({
                name,
                cardNumber,
                expirationMonth,
                expirationYear: `${new Date().getFullYear().toString().slice(0, 2)}${expirationYear}`,
                cvc
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        return response.json();
    } catch (error: any) {
        console.log({ error })
    }
}