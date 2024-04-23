import { Address } from "@/types/address";

export async function createAddress(data: Address) {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/address?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
        )

        const json = await response.json();
        return json.data;
    } catch (error: any) {
        console.log({ error })
    }
}