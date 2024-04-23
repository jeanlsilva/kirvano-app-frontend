import Image from "next/image";
import { useRouter } from "next/navigation";

export function ShippingSummary(props: any) {
    const router = useRouter();

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
                <form>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="address1">First line of address</label>
                        <input type="text" name="address1" />
                    </div>
                    <div className="flex flex-col mt-4">
                        <label htmlFor="address2">Street name</label>
                        <input type="text" name="address2" />
                    </div>
                    <div className="flex gap-6 mt-4">
                        <div className="flex flex-col flex-1">
                            <label htmlFor="postcode">Postcode</label>
                            <input type="text" name="postcode" />
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
                </form>
                <div className="border-t border-y-gray-300 flex justify-end gap-4 mt-8 pt-9">
                    <button className="bg-transparent w-1/4">Cancel order</button>
                    <button 
                        className="bg-cyan-600 text-white rounded-lg w-1/3 py-4"
                        onClick={() => router.push('/payment')}
                    >
                        Payment
                    </button>
                </div>
            </div>
        </div>
    )
}