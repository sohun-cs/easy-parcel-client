import { MdEdit } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import useParcel from "../../../hooks/useParcel";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const MyParcel = () => {

    const [parcels, refetch] = useParcel();
    const axiosSecure = useAxiosSecure();

    const total = parcels.reduce((total, parcel) => total + parcel.price, 0)
    console.log("parcels", parcels);

    // const handleEdit = (id) => [

    // ]

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        refetch();
                        console.log(res)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

    return (
        <div className=" px-4 py-12">
            <div className="px-4">
                {/* <Link to="/dashboard/payment">
                    <button className="btn btn-primary">Pay</button>
                </Link> */}
                <table className="table table-zebra table-zebra-zebra shadow-xl">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-center">
                                <label>
                                    Serial
                                </label>
                            </th>
                            <th>Percel Type</th>
                            <th className="text-center">Requested</th>
                            <th className="text-center">Approximatedly</th>
                            <th className="text-center">Booking</th>
                            <th className="text-center">Cost</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Update</th>
                            <th className="text-center">Cancel</th>
                            <th className="text-center">Review</th>
                            <th className="text-center">Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            parcels.map((parcel, idx) =>
                                <tr
                                    key={parcel._id}
                                >
                                    <th className="text-center">
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>
                                    <td>
                                        <div>{parcel.parcel}</div>
                                    </td>
                                    <td>
                                        <div className="font-bold text-center">{parcel.date}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm opacity-50 text-center">12/08/2024</div>
                                    </td>
                                    <td>
                                        <div className="text-center">19/08/2024</div>
                                    </td>

                                    <td>
                                        <div className="text-center">$ {parcel.price}</div>
                                    </td>
                                    <td>
                                        <div className="text-center">Pending</div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center">
                                            <Link to={`/dashboard/edit-parcel/${parcel._id}`} ><MdEdit className="text-gray-500 text-lg" /></Link>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex justify-center items-center"><MdCancel className="cursor-pointer text-amber-500 text-lg" onClick={() => handleDelete(parcel._id)} /></div>
                                    </td>
                                    <td className="text-center">
                                        <button className="px-4 py-1 text-xs bg-gray-600 text-gray-50 hover:bg-gray-900 hover:text-white duration-500 rounded-full ">Review</button>
                                    </td>
                                    <td className="text-center">
                                        <Link to={`/dashboard/payment/${parcel._id}`}>
                                            <button className="px-4 py-1 text-xs font-semibold bg-blue-300 hover:bg-blue-500 hover:text-white duration-500 rounded-md">Pay</button>
                                        </Link>
                                    </td>
                                </tr>)
                        }


                    </tbody>
                    <tfoot className="">
                        <tr className="">

                            <th className="text-lg text-center" colSpan="12">Total Bill: ${total}</th>

                        </tr>
                    </tfoot>
                </table>

            </div>
        </div >
    );
};

export default MyParcel;