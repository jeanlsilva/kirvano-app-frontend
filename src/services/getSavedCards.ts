export async function getSavedCards() {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/card?access_token=${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`
        );

        const json = await response.json();
        return json.data;
    } catch (error: any) {
        console.log({ error })
    }
}