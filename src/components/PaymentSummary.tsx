import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { completeCheckout } from "@/services/completeCheckout";
import { Card } from "@/types/card";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSavedCards } from "@/services/getSavedCards";
import orderDetails from '@/mockData/orderDetails.json'

export function PaymentSummary(props: any) {
    const params = useSearchParams();
    const [savedCards, setSavedCards] = useState<Card[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<number | undefined>(undefined);
    const savedCardRef = useRef<HTMLSelectElement | null>(null);
    const schema = z.object({
        name: z.string().min(6, "Min 6 characters"),
        number: z.string().min(1, "Min 6 characters")
            .length(16, "It must have 16 digits"),
        expiry_month: z.number({ invalid_type_error: "Required field" }) // empty field will trigger here
            .max(12, "Max value is 12").min(1, "Min value is 1"),
        expiry_year: z.number({ invalid_type_error: "Required field" }) // empty field will trigger here
            .max(99, "It must have 2 digits").min(0, "It must be positive")
            .min(Number(new Date().getFullYear().toString().slice(-2)), "It must be higher or equal current year"),
        cvc: z.string().min(1, "Required field").length(3, "It must have 3 digits")
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
                    if (data.statusCode === 200) {
                        setValue("name", "");
                        setValue("number", "");
                        setValue("expiry_month", "");
                        setValue("expiry_year", "");
                        setValue("cvc", "");
                        if (savedCardRef.current) {
                            savedCardRef.current.value = "";
                        }
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
            <div className="px-4 md:px-10 mt-14">
                <h3 className="font-semibold text-xl">Payment Details</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-6">
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
                    <div className="flex flex-col md:flex-row justify-between gap-4 pb-4">
                        <div className="flex flex-col w-full md:w-1/2">
                            <label htmlFor="expiry_month">Expiration</label>
                            <div className="flex items-center gap-4">
                                <div className="w-full pb-6 md:pb-10 relative flex flex-col">
                                    <input 
                                        type="number"
                                        className="w-full text-center" 
                                        {...register("expiry_month", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute top-20">{errors.expiry_month?.message}</span>
                                </div>
                                <span className="text-2xl">/</span>
                                <div className="w-full pb-6 md:pb-10 relative flex flex-col">
                                    <input 
                                        type="number"
                                        className="w-full text-center" 
                                        {...register("expiry_year", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute top-20">{errors.expiry_year?.message}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col flex-1 relative pb-6">
                            <label htmlFor="cvc">CVC</label>
                            <input type="number" maxLength={3} {...register("cvc")} />
                            <span className="text-sm text-red-600 absolute top-24">{errors.cvc?.message}</span>
                        </div>
                    </div>
                    <div className="border-t border-y-gray-300 flex justify-end gap-4 pt-9">
                    <button 
                        type="button"
                        className="bg-transparent w-full md:w-1/4 hover:text-cyan-600 ease-in-out duration-300"
                    >
                        Cancel order
                    </button>
                    <button 
                        type="submit" 
                        className="bg-cyan-600 hover:bg-cyan-700 ease-in-out duration-300 text-white rounded-lg w-full md:w-1/3 py-4"
                    >
                        Complete order
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}