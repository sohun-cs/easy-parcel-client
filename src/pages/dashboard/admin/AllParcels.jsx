// import Swal from "sweetalert2";
import Swal from "sweetalert2";
import useAllParcel from "../../../hooks/useAllParcel";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useUser from "../../../hooks/useUser";
// import { useState } from "react";
import ParcelTable from "./ParcelTable";


const AllParcels = () => {
    const [allParcel, refetch] = useAllParcel();
    const axiosSecure = useAxiosSecure();
    console.log("allParcel", allParcel);

    const handleDelete = (id) => {
        console.log(`Deleting parcel with id: ${id}`);

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

                axiosSecure.delete(`/payments/${id}`)
                    .then(res => {
                        console.log("Delete response:", res);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch(error => {
                        console.error("Delete error:", error);
                    });
            }
        });


    };

    return (
        <div className="px-4 py-12">
            <div className="px-4">
                <table className="table shadow-xl rounded-none">
                    <thead>
                        <tr>
                            <th className="text-center">
                                <label>Serial</label>
                            </th>
                            <th className="">Name</th>
                            <th className="text-center">Product</th>
                            <th className="text-center">Booking Date</th>
                            <th className="text-center">Requested Date</th>
                            <th className="text-center">Cost</th>
                            <th className="text-center">Delivery Location</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allParcel.map((parcel, idx) => (
                            <ParcelTable
                                key={parcel._id}
                                aParcel={parcel}
                                idx={idx}
                                onHandleDelete={handleDelete}
                            ></ParcelTable>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllParcels;
