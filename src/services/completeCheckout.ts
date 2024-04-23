import { Checkout } from "@/types/checkout";

export async function completeCheckout(data: Checkout) {
    try {
        const { card } = data;
        const { expirationYear } = card;
        const formattedExpirationYear = `${new Date().getFullYear().toString().slice(0, 2)}${expirationYear}`;

        const response = await fetch(`
            ${process.env.NEXT_PUBLIC_API_URL}/checkout?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}
            `, {
            method: 'POST',
            body: JSON.stringify({
                ...data,
                card: {
                    ...card,
                    expirationYear: formattedExpirationYear,
                }
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