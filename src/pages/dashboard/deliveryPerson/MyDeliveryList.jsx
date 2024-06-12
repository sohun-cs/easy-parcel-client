import Swal from "sweetalert2";
import useAllParcel from "../../../hooks/useAllParcel";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import { useState } from "react";


const MyDeliveryList = () => {
    const [allParcel, refetch] = useAllParcel();
    const [users] = useUser();
    const axiosSecure = useAxiosSecure();

    const deliverers = users.filter(user => user.role === "deliveryPerson");

    const [manageStatus, setManageStatus] = useState({});

    const handleManage = (e, parcelId) => {
        e.preventDefault();
        const form = e.target;
        const date = form.date.value;
        const name = form.name.value;
        const id = form.name.options[form.name.selectedIndex].getAttribute('data-id');

        const newManageStatus = { ...manageStatus };
        newManageStatus[parcelId] = { id, date, status: 'On the way' };
        setManageStatus(newManageStatus);

        const parcelData = {
            men_id: id,
            name: name,
            date: date,
            status: 'On the way'
        };

        axiosSecure.post('/approved', parcelData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your parcel updated successfully!",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    refetch();
                    form.reset();
                }
            });
    };

    const handleDelete = id => {
        axiosSecure.delete(`/parcels/${id}`)
            .then(res => {
                refetch();
                console.log(res);
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
                            <th className="text-center">Phone Number</th>
                            <th className="text-center">Booking Date</th>
                            <th className="text-center">Requested Date</th>
                            <th className="text-center">Cost</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allParcel.map((parcel, idx) => (
                            <tr key={parcel._id}>
                                <th className="text-center"><label>{idx + 1}</label></th>
                                <td><div className="font-bold">{parcel.name}</div></td>
                                <td><div className="text-sm opacity-50 text-center">{parcel.phone_number}</div></td>
                                <td><div className="text-center">{parcel.date}</div></td>
                                <td><div name='parcelname' className="text-center">12/06/2024</div></td>
                                <td><div className="text-center">{parcel.price}</div></td>
                                <td>
                                    <div className="text-center">
                                        {manageStatus[parcel._id] && manageStatus[parcel._id].status === 'On the way' ? 'On the way' : 'pending'}
                                    </div>
                                </td>
                                <td>
                                    <div className="text-center">
                                        <button
                                            className="bg-indigo-100 px-3 py-1 hover:bg-indigo-300 duration-500 rounded-md font-semibold cursor-pointer"
                                            onClick={() => document.getElementById(`my_modal_${parcel._id}`).showModal()}
                                            disabled={manageStatus[parcel._id] ? true : false}
                                        >
                                            Manage
                                        </button>
                                        <dialog id={`my_modal_${parcel._id}`} className="modal">
                                            <div className="modal-box">
                                                <form method="dialog">
                                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                </form>
                                                <form onSubmit={(e) => handleManage(e, parcel._id)}>
                                                    <div>
                                                        <select
                                                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                                                            name="name"
                                                        >
                                                            <option value="">Select a deliverer</option>
                                                            {deliverers.map(deliverer => (
                                                                <option
                                                                    key={deliverer._id}
                                                                    value={deliverer.displayName}
                                                                    data-id={deliverer._id}
                                                                >
                                                                    {deliverer.displayName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm font-semibold px-4">Requested Delivery Date</label> <br />
                                                        <input
                                                            type="date"
                                                            className="w-full bg-gray-100 px-4 py-2 border-b-2 border-pink-200 focus:outline-0 focus:bg-gray-50 focus:border-pink-400 duration-300 rounded-lg"
                                                            name="date"
                                                        />
                                                    </div>
                                                    <button
                                                        className="bg-pink-100 px-3 py-1 mt-4 hover:bg-pink-300 duration-500 rounded-md font-semibold cursor-pointer"
                                                        onClick={() => handleDelete(parcel._id)}
                                                    >
                                                        Assign
                                                    </button>
                                                </form>
                                            </div>
                                        </dialog>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;