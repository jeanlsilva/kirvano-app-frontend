import { createAddress } from "@/services/createAddress";
import { getAddresses } from "@/services/getAddresses";
import { Address } from "@/types/address";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function ShippingSummary() {
    const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | undefined>(undefined);
    const router = useRouter();
    const schema = z.object({
        first_line: z.string().min(6, "Campo deve ter no mínimo 6 caracteres"),
        street_name: z.string().min(6, "Campo deve ter no mínimo 6 caracteres"),
        postcode: z.string().min(4, "Campo deve ter no mínimo 4 caracteres")
    });
    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<Address>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Address> = (data) => {
        if (selectedAddressId) {
            router.push(`/payment?address_id=${selectedAddressId}`)
        } else {
            createAddress(data)
            .then((data) => router.push(`/payment?address_id=${data.id}`))
            .catch((error) => console.log({ error }))
        }
    }

    const handleChangeSavedAddress = async (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAddressId(e.target?.value ? +e.target.value : undefined);
        const selectedAddress = savedAddresses.find((address) => address.id === +e.target.value);
        if (selectedAddress) {
            setValue("first_line", selectedAddress.first_line);
            setValue("street_name", selectedAddress.street_name);
            setValue("postcode", selectedAddress.postcode);
        }
    }

    useEffect(() => {
        async function loadAddresses() {
            const response = await getAddresses();
            setSavedAddresses(response)
        }

        if (savedAddresses.length === 0) loadAddresses()
    }, []);

    return (
        <div className="bg-gray-100 rounded-md h-100 flex-1 px-10 pt-9 pb-20">
            <div className="flex justify-center items-center gap-6">
                <a className="text-cyan-600 no-underline" href="/shipping">Shipping</a>
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <Image src="/images/check.svg" alt="check" width={24} height={24} />
                <div className="bg-cyan-600 h-[1px] w-[25px]"></div>
                <span>Payment</span>
            </div>
            <div className="px-10 mt-14">
                <h3 className="font-semibold text-xl">Shipping Details</h3>
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
                    <label htmlFor="address" className="flex-1 text-black">Use saved address</label>
                    <select name="address" className="flex-1" onChange={handleChangeSavedAddress}>
                        <option>Select</option>
                        {savedAddresses.map((address) => (
                            <option key={address.id} value={address.id}>{address.first_line}</option>
                        ))}
                    </select>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col pb-6 relative mt-2 md:mt-0">
                        <label htmlFor="first_line">First line of address</label>
                        <input type="text" {...register("first_line")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.first_line?.message}</span>
                    </div>
                    <div className="flex flex-col pb-6 relative">
                        <label htmlFor="street_name">Street name</label>
                        <input type="text" {...register("street_name")} />
                        <span className="text-sm text-red-600 absolute bottom-0">{errors.street_name?.message}</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 pb-0 md:pb-6">
                        <div className="flex flex-col flex-1 relative pb-6">
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
                    <button className="bg-transparent w-full md:w-1/4">Cancel order</button>
                    <button 
                        className="bg-cyan-600 text-white rounded-lg w-full md:w-1/3 py-4"
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