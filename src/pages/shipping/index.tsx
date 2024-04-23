import { OrderSummary } from "@/components/OrderSummary";
import { ShippingSummary } from "@/components/ShippingSummary";

export default function Shipping() {
    return (
        <div className="flex flex-col lg:flex-row px-14 gap-4 pt-20">
            <ShippingSummary />
            <OrderSummary />
        </div>
    )
}