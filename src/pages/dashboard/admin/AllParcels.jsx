
import useAllParcel from "../../../hooks/useAllParcel";

const AllParcels = () => {


    const [allParcel] = useAllParcel();

    console.log("All Parcel: ", allParcel);

    return (
        <div className=" px-4 py-12">
            <div className="px-4">
                <table className="table shadow-xl rounded-none ">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-center">
                                <label>
                                    Serial
                                </label>
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
                        {/* row 1 */}
                        {
                            allParcel.map((parcel, idx) =>
                                <tr
                                    key={parcel._id}
                                >
                                    <th className="text-center">
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>

                                    <td>
                                        <div className="font-bold">{parcel.name}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm opacity-50 text-center">{parcel.phone_number}</div>
                                    </td>
                                    <td>
                                        <div className="text-center">{parcel.date}</div>
                                    </td>
                                    <td>
                                        <div className="text-center">2024/08/08</div>
                                    </td>
                                    <td>
                                        <div className="text-center"> {parcel.price} </div>
                                    </td>
                                    <td>
                                        <div className="text-center">Pending</div>
                                    </td>
                                    <td>
                                        <div className="text-center">
                                            <button>Manage</button>
                                        </div>
                                    </td>

                                </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default AllParcels;