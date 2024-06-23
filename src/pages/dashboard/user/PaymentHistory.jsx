import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data;
        }
    });

    console.log("payments", payments);

    return (
        <div className="h-[calc(100vh-82px)]  px-4 py-12">
            <div className="px-4">
                <table className="table table-zebra table-zebra-zebra shadow-xl my-4 ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Parcel</th>
                            <th>Price</th>
                            <th className="text-center">Transaction ID</th>
                            <th className="text-center">Status</th>
                            <th>Reciever Name</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">Delivery Man</th>
                            <th>Delivered Address</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((payment, index) => <tr key={payment._id}>
                                <th>{index + 1}</th>
                                <td>{payment.name}</td>
                                <td>{payment.parcel}</td>
                                <td>$ {payment.price}</td>

                                <td className="text-center">{payment.transactionId}</td>
                                <td className="text-center">{payment.status}</td>
                                <td>{payment.reciever_name}</td>
                                <td className="text-center">{payment.date}</td>
                                <td className="text-center">{payment.deliveryman_name ? payment.deliveryman_name : '-'}</td>
                                <td>{payment.delivered_address}</td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;