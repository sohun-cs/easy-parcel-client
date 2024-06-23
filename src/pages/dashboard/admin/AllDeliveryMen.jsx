import useUser from "../../../hooks/useUser";


const AllDeliveryMen = () => {

    const [users] = useUser()

    const deliveryPersons = users.filter(user => user.role === 'deliveryPerson');

    console.log("deliveryPersons: ", deliveryPersons)

    console.log(users)

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
                            <th className="text-center">Name</th>
                            <th className="text-center">Phone Number</th>
                            <th className="text-center">Parcel Delivered</th>
                            <th className="text-center">Average Review</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            deliveryPersons.map((deiveryPerson, idx) =>
                                <tr
                                    key={deiveryPerson._id}
                                >
                                    <th className="text-center">
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>

                                    <td>
                                        <div className="font-bold text-center">{deiveryPerson.displayName}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm opacity-50 text-center">992827112</div>
                                    </td>
                                    <td>
                                        <div className="text-center">232</div>
                                    </td>
                                    <td>
                                        <div className="text-center"> 4.2 </div>
                                    </td>

                                </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default AllDeliveryMen;