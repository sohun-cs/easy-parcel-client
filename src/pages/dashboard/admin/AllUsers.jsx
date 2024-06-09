
import useParcel from "../../../hooks/useParcel";
import useUser from "../../../hooks/useUser";

const AllUsers = () => {

    // const axiosPublic = useAxiosPublic();

    // const { data: users = [] } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/users');
    //         return res.data
    //     }
    // })

    const [users] = useUser();
    const [parcels] = useParcel();

    const leUsers = users.filter(user => user.role === 'user');
    const parcel = parcels.map(parcel => console.log(parcel))

    console.log(leUsers)
    console.log("parcel: ", parcel)

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
                            <th className="text-center">Total Spent</th>
                            <th className="text-center">Make Delivery</th>
                            <th className="text-center">Make Admin</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            leUsers.map((user, idx) =>
                                <tr
                                    key={user._id}
                                >
                                    <th className="text-center">
                                        <label>
                                            {idx + 1}
                                        </label>
                                    </th>

                                    <td>
                                        <div className="font-bold">{user.displayName}</div>
                                    </td>
                                    <td>
                                        <div className="text-sm opacity-50 text-center">{''}</div>
                                    </td>
                                    <td>
                                        <div className="text-center">15</div>
                                    </td>
                                    <td>
                                        <div className="text-center"> deliverman </div>
                                    </td>
                                    <td>
                                        <div className="text-center"> admin </div>
                                    </td>

                                </tr>)
                        }


                    </tbody>

                </table>
            </div>
        </div >
    );
};

export default AllUsers;