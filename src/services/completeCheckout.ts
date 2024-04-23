import { Checkout } from "@/types/checkout";

export async function completeCheckout(data: Checkout) {
    let body
    if (data.card) {
        const { card } = data;
        const { expiry_year } = card;
        const formattedExpirationYear = `${new Date().getFullYear().toString().slice(0, 2)}${expiry_year}`;

        body = {
            ...data,
            card: {
                ...card,
                expiry_year: Number(formattedExpirationYear),
            }
        }
    } else {
        body = data
    }

    const response = await fetch(`
        ${process.env.NEXT_PUBLIC_API_URL}/checkout?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}
        `, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const json = await response.json();
    console.log({ json })
    return json;
}