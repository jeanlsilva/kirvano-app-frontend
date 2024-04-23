import { Payment } from "@/types/payment";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";

export function PaymentSummary(props: any) {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Payment>();
    const onSubmit: SubmitHandler<Payment> = (data) => console.log(data);

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
                    <div className="flex flex-col mt-4">
                        <label htmlFor="name">Name on card</label>
                        <input type="text" {...register("name")} />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="number">Card number</label>
                        <input type="text" {...register("number")} />
                    </div>
                    <div className="flex justify-between mt-4 gap-4">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="expirationMonth">Expiration</label>
                            <div className="flex items-center gap-4">
                                <input type="number" max={12} className="w-full text-center" {...register("expirationMonth")} />
                                <span className="text-2xl">/</span>
                                <input type="number" max={99} className="w-full text-center" {...register("expirationYear")} />
                            </div>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="cvc">CVC</label>
                            <input type="number" maxLength={3} {...register("cvc")} />
                        </div>
                    </div>
                    <div className="border-t border-y-gray-300 flex justify-end gap-4 mt-8 pt-9">
                    <button className="bg-transparent w-1/4">Cancel order</button>
                    <button type="submit" className="bg-cyan-600 text-white rounded-lg w-1/3 py-4">Complete order</button>
                </div>
                </form>
            </div>
        </div>
    )
}