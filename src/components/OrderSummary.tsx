import Image from "next/image";
import orderDetails from '@/mockData/orderDetails.json'
import { useState } from "react";

export function OrderSummary() {
    const [amount, setAmount] = useState(1);

    const handleIncrement = () => {
        setAmount((prev) => prev + 1);
    }

    const handleDecrement = () => {
        if (amount > 1) setAmount((prev) => prev - 1);
    }

    return (
        <div className="bg-gray-100 rounded-md w-3/7 ps-14 pe-9 pt-10 pb-14">
            <h3 className="font-semibold text-xl">Order Summary</h3>
            <Image 
                src={orderDetails.product_avatar}
                alt="product image" 
                width={421} 
                height={162} 
                className="h-[162px] object-cover mt-5" 
            />
            <div className="flex justify-between mt-4">
                <div className="text-xl">
                    <h2>{orderDetails.product_name}</h2>
                    <h2 className="font-bold mt-2">£{orderDetails.total}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <button className="bg-gray-300 rounded-md px-3 py-1" onClick={handleDecrement}>-</button>
                    <span>{amount}</span>
                    <button className="bg-gray-300 rounded-md px-3 py-1" onClick={handleIncrement}>+</button>
                </div>
            </div>
            <div className="mt-8">
                <label htmlFor="giftCard" className="text-gray-600 text-sm">Gift Card / Discount code</label>
                <div className="flex gap-4 items-center mt-4">
                    <input type="text" className="flex-1"></input>
                    <button className="bg-transparent border-2 border-cyan-600 text-cyan-600 rounded-lg px-6 h-[59px]">
                        Apply
                    </button>
                </div>
            </div>
            <div className="text-lg mt-12">
                <div className="flex justify-between">
                    <span className="text-gray-700">Sub total</span>
                    <span className="text-gray-800">£{(orderDetails.subtotal * amount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between mt-8">
                    <span className="text-gray-700">Tax</span>
                    <span className="text-gray-800">£{orderDetails.tax}</span>
                </div>
                <div className="flex justify-between mt-8">
                    <span className="text-gray-700">Shipping</span>
                    <span className="text-green-500">
                        {orderDetails.shipping_fee > 0 ? `£${orderDetails.shipping_fee}` : "Free"}
                    </span>
                </div>
                <div className="flex justify-between mt-8">
                    <span className="text-gray-900 font-bold">Total</span>
                    <span className="text-gray-800">£{(orderDetails.total * amount).toFixed(2)}</span>
                </div>
            </div>
        </div>
    )
}