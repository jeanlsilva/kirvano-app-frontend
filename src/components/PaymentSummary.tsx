import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { completeCheckout } from "@/services/completeCheckout";
import { Card } from "@/types/card";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Address } from "@/types/address";
import { useSearchParams } from "next/navigation";
import { getSavedCards } from "@/services/getSavedCards";

const orderDetails = {
    product_name: "Sony wireless headphones",
    product_avatar: "https://s3-alpha-sig.figma.com/img/735a/30f9/d22879500cd0828fd908b755c347e0ca?Expires=1714953600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CB7AVJv8r5ATDrfyIbZ4wq8AMaleh~-HL~RpHvHRDK8EtKkDIpirTRNj2~eXpYeob7--yXwvWmiZqg3u4Y04dkxqGxAnxdrO3YviynEqrMcoLJ5PTensJK333Udcrm61AMT3KaMhIBMGf1bBl~9p90W8Wf~8RmGf3qJIZFqqhVBTsjcO~PN-Niip~NNfflzCuNNf9Uzm0f9C13ZSEo0A2fwK0DL9q3wP7GV5a6hsiE8mjkT1mr~X~KkAB1PnNmKEB4q1tfuPPDwA2ALPb16egqvadFXHVqAKKLwOX6aPJ8D5NjBUeH4~EKrYMixU3qHbeAaoYphReyZyMn~qL6tewA__",
    subtotal: 316.55,
    tax: 3.45,
    shipping_fee: 0,
    total: 320.45
}

export function PaymentSummary(props: any) {
    const params = useSearchParams();
    const [savedCards, setSavedCards] = useState<Card[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | undefined>(undefined);
    const savedCardRef = useRef<HTMLSelectElement | null>(null);
    const schema = z.object({
        name: z.string().min(6, "Nome deve ter no mínimo 6 caracteres"),
        number: z.string().min(1, "Número do cartão obrigatório")
            .length(16, "Número do cartão deve ter 16 caracteres numéricos"),
        expiry_month: z.number().max(12, "Mês deve ser de 1 a 12").min(1, "Mês deve ser de 1 a 12"),
        expiry_year: z.number().max(99, "Ano deve ter 2 caracteres numéricos").min(0, "Ano não pode ser negativo")
            .min(Number(new Date().getFullYear().toString().slice(-2)), "Ano deve ser maior que ano atual"),
        cvc: z.string().min(1, "CVC é obrigatório").length(3, "CVC deve ter 3 caracteres numéricos")
    });
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Card>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Card> = (data) => {
        if (params.get("address_id")) {
            completeCheckout({
                ...orderDetails,
                card: selectedCardId ? undefined : data,
                card_id: selectedCardId,
                address_id: Number(params.get("address_id"))
            })
                .then((data) => {
                    alert(data.message);
                    setValue("name", "");
                    setValue("number", "");
                    setValue("expiry_month", "");
                    setValue("expiry_year", "");
                    setValue("cvc", "");
                    if (savedCardRef.current) {
                        savedCardRef.current.value = "";
                    }
                })
        }
    }
    
    const handleChangeSavedCard = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCardId(+e.target.value)
        const selectedCard = savedCards.find((card) => card.id === +e.target.value);
        if (selectedCard) {
            setValue("name", selectedCard.name);
            setValue("number", selectedCard.number);
            setValue("expiry_month", selectedCard.expiry_month);
            setValue("expiry_year", String(selectedCard.expiry_year).slice(-2));
            setValue("cvc", selectedCard.cvc);
        }
    }

    useEffect(() => {
        async function getCards() {
            const data = await getSavedCards();

            setSavedCards(data);
        }

        if (savedCards.length === 0) getCards();
    })

    return (
        <div className="bg-gray-100 rounded-md h-100 flex-1 px-10 pt-9 pb-20">
            <div className="flex justify-center items-center gap-6">
                <a className="text-cyan-600 no-underline" href="/shipping">Shipping</a>
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <Image src="/images/check.svg" alt="check" width={24} height={24} />
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <span className="text-cyan-600">Payment</span>
            </div>
            <div className="px-10 mt-14">
                <h3 className="font-semibold text-xl">Payment Details</h3>
                <div className="flex items-center gap-6">
                    <label htmlFor="savedCard" className="flex-1 text-black">Use saved card</label>
                    <select name="savedCard" className="flex-1" onChange={handleChangeSavedCard} ref={savedCardRef}>
                        <option value="">Select</option>
                        {savedCards.map((card) => (
                            <option key={card.id} value={card.id}>
                                {`Card ending with ${card.number.slice(-4)}`}
                            </option>
                        ))}
                    </select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col mt-4 pb-6 relative">
                        <label htmlFor="name">Name on card</label>
                        <input type="text" {...register("name")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.name?.message}</span>
                    </div>
                    <div className="flex flex-col pb-6 relative">
                        <label htmlFor="number">Card number</label>
                        <input type="text" {...register("number")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.number?.message}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="expiry_month">Expiration</label>
                            <div className="flex items-center gap-4">
                                <div className="w-full pb-10 relative flex flex-col">
                                    <input 
                                        className="w-full text-center" 
                                        required
                                        {...register("expiry_month", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute bottom-0">{errors.expiry_month?.message}</span>
                                </div>
                                <span className="text-2xl">/</span>
                                <div className="w-full pb-10 relative flex flex-col">
                                    <input 
                                        className="w-full text-center" 
                                        required
                                        {...register("expiry_year", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute bottom-0">{errors.expiry_year?.message}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 relative">
                            <label htmlFor="cvc">CVC</label>
                            <input type="number" maxLength={3} {...register("cvc")} />
                            <span className="text-sm text-red-600 absolute bottom-0">{errors.cvc?.message}</span>
                        </div>
                    </div>
                    <div className="border-t border-y-gray-300 flex justify-end gap-4 pt-9">
                    <button className="bg-transparent w-1/4">Cancel order</button>
                    <button type="submit" className="bg-cyan-600 text-white rounded-lg w-1/3 py-4">Complete order</button>
                </div>
                </form>
            </div>
        </div>
    )
}