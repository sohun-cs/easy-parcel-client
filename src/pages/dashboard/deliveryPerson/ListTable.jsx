import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDeliveryLists from "../../../hooks/useDeliveryLists";
import Swal from "sweetalert2";
import useAllParcel from "../../../hooks/useAllParcel";

const ListTable = ({ deliveryList, idx }) => {

    const { _id, booked_user_name, deliveryman_name, reciever_name, booked_user_phone, requested_date, approximate_date, reciever_phone, reciever_address, status } = deliveryList;

    const [, refetch] = useDeliveryLists();
    const axiosSecure = useAxiosSecure();
    const [allParcel] = useAllParcel()

    console.log('deliveryList', deliveryList);
    console.log('allParcel', allParcel);

    const parcelStatus = {
        deliveryman_name: deliveryman_name, 
        status: 'Delivered'
    }

    console.log('parcelStatus', parcelStatus);

    const handleStatusChange = (_id) => {

        console.log("_id", _id);

        Swal.fire({
            title: "Parcel delivered to the Reciever?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/approved/${_id}`)
                    .then(res => {
                        console.log('res', res);
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleverd!",
                                text: "Parcel status updated",
                                icon: "success"
                            });

                        }
                    }
                    );

                    axiosSecure.patch(`/payments/${_id}`, { deliveryman_name: parcelStatus.deliveryman_name,
                        status: parcelStatus.status
                     })
                        .then(res => {
                            console.log("res.data", res.data);
                            if (res.data.modifiedCount > 0) {
                                refetch();
            
                            }
                        });


            }
        });


    };

    const handleDeliverCancel = (_id) => {
        console.log(_id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/approved/${_id}`)
                    .then(res => {
                        refetch();
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Cancelled!",
                                text: "This Parcel has been cancelled.",
                                icon: "success"
                            });
                        }
                    })
            }
        });


    }


    return (
        <tr
            key={_id}>
            <th>{idx + 1}</th>
            <td>{booked_user_name}</td>
            <td>{reciever_name}</td>
            <td className="text-center">{booked_user_phone || '9945448926'}</td>
            <td className="text-center">{requested_date}</td>
            <td className="text-center">{approximate_date}</td>
            <td className="text-center">{reciever_phone}</td>
            <td>{reciever_address}</td>
            <td className="text-center"><Link to={`/dashboard/location/${_id}`}>View Location</Link></td>
            <td className="text-center"><button onClick={() => handleDeliverCancel(_id)}>X</button></td>
            <td className="text-center">
                <button
                    onClick={() => handleStatusChange(_id)}
                    className={status === 'Delivered' ? 'text-green-500 font-semibold text-sm' : 'text-blue-500 font-semibold text-sm'}
                    disabled={status === 'Delivered' ? true : false}
                >
                    {status}
                </button>
            </td>
        </tr>
    );
};

export default ListTable;

ListTable.propTypes = {
    deliveryList: PropTypes.object,
    idx: PropTypes.number
}