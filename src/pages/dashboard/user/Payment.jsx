import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const Payment = () => {

    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
    console.log("stripePromise: ", import.meta.env.VITE_PAYMENT_KEY);

    return (
        <div >
            <div className="h-[calc(100vh-82px)]">
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;