import { OrderSummary } from "@/components/OrderSummary";
import { PaymentSummary } from "@/components/PaymentSummary";

export default function Payment() {
    return (
        <div className="flex flex-col md:flex-row px-14 gap-4 pt-20">
            <PaymentSummary />
            <OrderSummary />
        </div>
    )
}