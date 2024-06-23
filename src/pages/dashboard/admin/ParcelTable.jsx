import useAllParcel from "../../../hooks/useAllParcel";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useUser from "../../../hooks/useUser";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const ParcelTable = ({ aParcel, idx, onHandleDelete }) => {

    const {
        date,
        name,
        latitude,
        longitude,
        parcel,
        phone,
        price,
        delivered_address,
        reciever_name,
        reciever_phone,
        status,

        _id } = aParcel;

    const [, refetch] = useAllParcel();
    const [users] = useUser();
    const axiosSecure = useAxiosSecure();

    const deliverers = users.filter(user => user.role === "deliveryPerson");

    const handleManage = (e, _id) => {
        e.preventDefault();
        const form = e.target;
        const approximate_date = form.date.value;
        const deliveryman_name = form.name.value;
        const id = form.name.options[form.name.selectedIndex].getAttribute('data-id');

        if (approximate_date.length === 0 || deliveryman_name.length === 0) {
            document.getElementById(`my_modal_${_id}`).close();
            return;
        }

        const parcelData = {
            men_id: id,
            deliveryman_name: deliveryman_name,
            approximate_date: approximate_date,
            booked_user_name: name,
            booked_user_phone: phone,
            parcel: parcel,
            reciever_name: reciever_name,
            reciever_phone: reciever_phone,
            reciever_address: delivered_address,
            latitude: latitude,
            longitude: longitude,
            requested_date: date,
            status: 'On the Way'
        };

        console.log("parcelData", parcelData);



        axiosSecure.post('/approved', parcelData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Parcel Approved. Now it's on the way",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    form.reset();
                }
            });




        axiosSecure.patch(`/payments/${_id}`, { deliveryman_name: parcelData.deliveryman_name,
            status: parcelData.status
         })
            .then(res => {
                console.log("res.data", res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();

                }
            });


        document.getElementById(`my_modal_${_id}`).close();

    };

    return (
        <tr
        >
            <th className="text-center"><label>{idx + 1}</label></th>
            <td><div className="font-bold">{name}</div></td>
            <td><div className="text-sm opacity-50 text-center">{parcel}</div></td>
            <td><div className="text-center">{date}</div></td>
            <td><div name='parcelname' className="text-center">12/06/2024</div></td>
            <td><div className="text-center">$ {price}</div></td>
            <td><div className="text-center">{delivered_address}</div></td>
            <td>
                <div className={
                    status === 'On the Way' && `text-center text-xs font-semibold bg-indigo-500 text-white rounded-full`
                    ||
                    status === 'Paid' && `text-center text-xs font-semibold bg-pink-500 text-white rounded-full`
                    ||
                    status === 'Paid' && `text-center text-xs font-semibold bg-green-500 text-white rounded-full`}>
                    {status}
                </div>
            </td>
            <td>
                <div className="text-center">
                    <button
                        className='bg-indigo-100 px-3 py-1 hover:bg-indigo-300 duration-500 rounded-md font-semibold cursor-pointer'
                        onClick={() => document.getElementById(`my_modal_${_id}`).showModal()}
                        // disabled={manageStatus[_id] ? true : false}
                        disabled={status === 'On the Way' ? true : false}
                    >
                        Manage
                    </button>
                    <dialog id={`my_modal_${_id}`} className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                            <form onSubmit={(e) => handleManage(e, _id)}>
                                <div>
                                    <select
                                        className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-pink-600 shadow-xs rounded-lg"
                                        name="name"
                                        required
                                    // onChange={handleOnFormChange}
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
                                        required
                                    // onChange={handleOnFormChange}
                                    />
                                </div>
                                {/* Buttons*/}
                                <div className="flex items-center justify-center gap-4">
                                    <button type="submit" value='Assign'
                                        className="bg-green-100 px-3 py-1 mt-4 hover:bg-green-300 duration-500 rounded-md font-semibold cursor-pointer"

                                    // onClick={() => handleUpdateStatus(_id)
                                    // }

                                    > Assign
                                    </button>

                                </div>
                            </form>
                            <button
                                className="bg-red-100 px-3 py-1 mt-4 hover:bg-red-300 duration-500 rounded-md font-semibold cursor-pointer"
                                onClick={() => {
                                    onHandleDelete(_id);
                                    document.getElementById(`my_modal_${_id}`).close()
                                }}
                            > Cancel
                            </button>
                        </div>
                    </dialog>
                </div>
            </td>
        </tr>
    );
};

export default ParcelTable;

ParcelTable.propTypes = {
    aParcel: PropTypes.object,
    idx: PropTypes.number,
    axiosSecure: PropTypes.any,
    onHandleDelete: PropTypes.func
}
