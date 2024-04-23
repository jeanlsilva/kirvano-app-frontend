import { Payment } from "@/types/payment";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { completeCheckout } from "@/services/completeCheckout";

export function PaymentSummary(props: any) {
    const schema = z.object({
        name: z.string().min(6, "Nome deve ter no mínimo 6 caracteres"),
        cardNumber: z.string().min(1, "Número do cartão obrigatório")
            .length(16, "Número do cartão deve ter 16 caracteres numéricos"),
        expirationMonth: z.number().max(12, "Mês deve ser de 1 a 12").min(1, "Mês deve ser de 1 a 12"),
        expirationYear: z.number().max(99, "Ano deve ter 2 caracteres numéricos").min(0, "Ano não pode ser negativo")
            .min(Number(new Date().getFullYear().toString().slice(-2)), "Ano deve ser maior que ano atual"),
        cvc: z.string().min(1, "CVC é obrigatório").length(3, "CVC deve ter 3 caracteres numéricos")
    });
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Payment>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Payment> = (data) => {
        completeCheckout(data)
            .then((data) => console.log({ data }))
            .catch((error) => console.log({ error }));
    }

    return (
        <div className="bg-gray-100 rounded-md h-100 flex-1 px-10 pt-9 pb-20">
            <div className="flex justify-center items-center gap-6">
                <span className="text-cyan-600">Shipping</span>
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <Image src="/images/check.svg" alt="check" width={24} height={24} />
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <span className="text-cyan-600">Payment</span>
            </div>
            <div className="px-10 mt-14">
                <h3 className="font-semibold text-xl">Payment Details</h3>
                <div className="flex items-center gap-6">
                    <label htmlFor="savedCard" className="flex-1 text-black">Use saved card</label>
                    <select name="savedCard" className="flex-1">
                        <option>Mastercard ending 234</option>
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
                        <input type="text" {...register("cardNumber")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.cardNumber?.message}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="expirationMonth">Expiration</label>
                            <div className="flex items-center gap-4">
                                <div className="w-full pb-10 relative flex flex-col">
                                    <input 
                                        type="number" 
                                        className="w-full text-center" 
                                        required
                                        {...register("expirationMonth", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute bottom-0">{errors.expirationMonth?.message}</span>
                                </div>
                                <span className="text-2xl">/</span>
                                <div className="w-full pb-10 relative flex flex-col">
                                    <input 
                                        type="number" 
                                        className="w-full text-center" 
                                        required
                                        {...register("expirationYear", { valueAsNumber: true })} 
                                    />
                                    <span className="text-sm text-red-600 absolute bottom-0">{errors.expirationYear?.message}</span>
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