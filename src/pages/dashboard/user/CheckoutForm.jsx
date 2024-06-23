import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useParcel from "../../../hooks/useParcel";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import moment from "moment";

const CheckoutForm = () => {

    const id = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [parcels, refetch] = useParcel();
    // const totalPrice = parcels.reduce((total, item) => total + item.price, 0);
    // console.log(totalPrice);
    const singleParcel = parcels.filter(parcel => parcel._id === id.id);
    const cost = singleParcel[0].price;
    console.log("singleParcel", singleParcel)
    // console.log("singleParcel: ", id)
    console.log("cost", cost)
    const requestedDate = singleParcel.map(parcel => parcel.date)
    console.log(...requestedDate)
    // console.log(user.email)


    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: cost })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, cost]);



    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
            setError(error.message);
        }
        else {
            console.log('payment method', paymentMethod)
            setError('');
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('Confirm Error')
        }
        else {
            console.log('Payment Intent', paymentIntent)
            if (paymentIntent.status === "succeeded") {
                console.log('Transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                const payment = {
                    name: singleParcel[0].name,
                    email: singleParcel[0].email,
                    phone: singleParcel[0].phone_number,
                    reciever_name: singleParcel[0].reciever_name,
                    reciever_phone: singleParcel[0].reciever_phone,
                    parcel: singleParcel[0].parcel,
                    price: cost,
                    transactionId: paymentIntent.id,
                    parcel_id: id.id,
                    date: moment().format("YY MMM Do"),
                    requested_date: requestedDate[0].date,
                    delivered_address: singleParcel[0].address,
                    latitude: singleParcel[0].latitude,
                    longitude: singleParcel[0].longitude,
                    status: 'Paid'
                };

                const res = await axiosSecure.post('/payments', payment);
                console.log('res: ', res.data);
                console.log('res.data?.paymentResult?.insertedId', res.data.result?.insertedId)

                if (res.data?.result?.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Thanks for the Payment. Have a good day!",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    navigate('/dashboard/payment-history')
                    refetch();
                }


                // try {
                //     const res = await axiosSecure.post('/payments', payment);
                //     console.log('res:', res.data);

                //     if (res.data?.paymentResult?.insertedId) {
                //         Swal.fire({
                //             position: 'top-end',
                //             icon: 'success',
                //             title: 'Payment done',
                //             showConfirmButton: false,
                //             timer: 1500
                //         });

                //         navigate('/dashboard/payment-history');
                //     } else {
                //         throw new Error('Payment result does not contain an insertedId');
                //     }
                // } catch (error) {
                //     console.error('Payment error:', error);
                //     Swal.fire({
                //         position: 'top-end',
                //         icon: 'error',
                //         title: 'Payment failed',
                //         text: error.message,
                //         showConfirmButton: true,
                //     });
                // }

                // Swal.fire({
                //     position: "top-end",
                //     icon: "success",
                //     title: "Payment done",
                //     showConfirmButton: false,
                //     timer: 1500
                // });
                // navigate('/dashboard/payment-history')



            }
        }

    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg bg-gray-50 h-full">

            <div className="w-full mb-4">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    className="p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:border-gray-700"
                />
            </div>

            <button
                className="btn btn-sm bg-pink-400 my-4 text-white hover:bg-pink-600 duration-500"
                type="submit"
                disabled={!stripe || !clientSecret}>
                Pay
            </button>

            <p className="text-red-400">{error}</p>
            {transactionId && <p className="text-green-500">Your Transaction</p>}
        </form>
    );
};

export default CheckoutForm;