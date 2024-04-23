import { Address } from "@/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function ShippingSummary(props: any) {
    const router = useRouter();
    const schema = z.object({
        firstLine: z.string().min(6, "Campo deve ter no mínimo 6 caracteres"),
        streetName: z.string().min(6, "Campo deve ter no mínimo 6 caracteres"),
        postcode: z.string().min(4, "Campo deve ter no mínimo 4 caracteres")
    });
    const { register, handleSubmit, watch, formState: { errors }, } = useForm<Address>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Address> = (data) => {
        console.log({ data })
    }

    return (
        <div className="bg-gray-100 rounded-md h-100 flex-1 px-10 pt-9 pb-20">
            <div className="flex justify-center items-center gap-6">
                <span className="text-cyan-600">Shipping</span>
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <Image src="/images/check.svg" alt="check" width={24} height={24} />
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <span>Payment</span>
            </div>
            <div className="px-10 mt-14">
                <h3 className="font-semibold text-xl">Shipping Details</h3>
                <div className="flex items-center gap-6">
                    <label htmlFor="address" className="flex-1 text-black">Use saved address</label>
                    <select name="address" className="flex-1">
                        <option>123, Electric avenue</option>
                    </select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col pb-6 relative">
                        <label htmlFor="firstLine">First line of address</label>
                        <input type="text" {...register("firstLine")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.firstLine?.message}</span>
                    </div>
                    <div className="flex flex-col pb-6 relative">
                        <label htmlFor="streetName">Street name</label>
                        <input type="text" {...register("streetName")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.streetName?.message}</span>
                    </div>
                    <div className="flex gap-6 pb-6 relative">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="postcode">Postcode</label>
                            <input type="text" {...register("postcode")} />
                            <span className="text-sm text-red-600 absolute bottom-0">{errors.postcode?.message}</span>
                        </div>
                        <div className="flex flex-col flex-1">
                            <label htmlFor="shippingType">
                                Select shipping
                            </label>
                            <select name="shippingType">
                                <option>Free delivery</option>
                            </select>
                        </div>
                    </div>
                    <div className="border-t border-y-gray-300 flex justify-end gap-4 mt-8 pt-9">
                    <button className="bg-transparent w-1/4">Cancel order</button>
                    <button 
                        className="bg-cyan-600 text-white rounded-lg w-1/3 py-4"
                        type="submit"
                    >
                        Payment
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}