
import useDeliveryLists from "../../../hooks/useDeliveryLists";
import ListTable from "./ListTable";


const MyDeliveryList = () => {

    const [deliveryLists] = useDeliveryLists();


    console.log("deliveryLists", deliveryLists);

    // const handleStatusChange = (_id) => {

    //     console.log("_id", _id);

    //     Swal.fire({
    //         title: "Parcel delivered to the Reciever?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes"
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axiosSecure.patch(`/approved/${_id}`)
    //                 .then(res => {
    //                     console.log('res', res);
    //                     if (res.data.modifiedCount > 0) {
    //                         refetch()
    //                         Swal.fire({
    //                             title: "Deleverd!",
    //                             text: "Parcel status updated",
    //                             icon: "success"
    //                         });

    //                     }
    //                 }
    //                 );
    //         }
    //     });

    // };

    // const handleDeliverCancel = (_id) => {
    //     console.log(_id);

    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: "Yes, cancel it!"
    //     }).then((result) => {
    //         if (result.isConfirmed) {

    //             axiosSecure.delete(`/approved/${_id}`)
    //                 .then(res => {
    //                     refetch();
    //                     if (res.data.deletedCount > 0) {
    //                         Swal.fire({
    //                             title: "Cancelled!",
    //                             text: "This Parcel has been cancelled.",
    //                             icon: "success"
    //                         });
    //                     }
    //                 })
    //         }
    //     });


    // }


    return (
        <div className="h-[calc(100vh-82px)] ">
            <div className="overflow-x-auto h-full px-12">

                <table className="table table-zebra my-12 shadow-lg text-xs md:text-base">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Booked by</th>
                            <th>Reciever Name</th>
                            <th className="text-center">Phone</th>
                            <th className="text-center">Requested Date</th>
                            <th className="text-center">Aproximate Date</th>
                            <th className="text-center">Reciever&apos;s Phone</th>
                            <th>Reciever&apos;s Adress</th>
                            <th className="text-center">Location</th>
                            <th className="text-center">Action</th>
                            <th className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            deliveryLists.map((deliveryList, idx) => <ListTable
                                key={deliveryList._id}
                                deliveryList={deliveryList}
                                idx={idx}>

                            </ListTable>)
                        }

                        {/* {
                            deliveryLists.map((deliveryList, idx) =>  <tr
                            key={deliveryList._id}>
                            <th>{idx + 1}</th>
                            <td>{deliveryList.booked_user_name}</td>
                            <td>{deliveryList.reciever_name}</td>
                            <td className="text-center">{deliveryList.booked_user_phone || '9945448926'}</td>
                            <td className="text-center">{deliveryList.requested_date}</td>
                            <td className="text-center">{deliveryList.approximate_date}</td>
                            <td className="text-center">{deliveryList.reciever_phone}</td>
                            <td>{deliveryList.reciever_address}</td>
                            <td className="text-center"><Link to={`/dashboard/location/${deliveryList._id}`}>View Location</Link></td>
                            <td className="text-center"><button onClick={() => handleDeliverCancel(deliveryList._id)}>X</button></td>
                            <td className="text-center">
                                <button
                                    onClick={() => handleStatusChange(deliveryList._id)}
                                    className={deliveryList.status === 'Delivered' ? 'text-green-500 font-semibold text-sm' : 'text-blue-500 font-semibold text-sm'}
                                    disabled={deliveryList.status === 'Delivered' ? true : false}
                                    >
                                    {deliveryList.status}
                                </button>
                            </td>
                        </tr>)
                        } */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;