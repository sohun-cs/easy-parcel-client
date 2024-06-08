import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data
        }
    })

    const currentUser = users.find(findUser => findUser.email === user.email)
    console.log(currentUser)

    console.log('data: ', users);
    console.log('role: ', currentUser?.role);

    return (
        <div className="flex">


            <div className="w-20 lg:w-64 text-sm lg:text-base min-h-screen text-pink-50 bg-pink-500">

                <ul>
                    {
                        currentUser?.role === 'admin'
                        &&
                        <>
                            <li><Link to='/dashboard/all-deliveryperson'>
                                All Delivery Person
                            </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/all-parcels'>
                                    All Parcels
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/all-users'>
                                    All Users
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/statistics'>
                                    Statistics
                                </Link>
                            </li>
                        </>
                    }

                    {
                        currentUser?.role === 'user'
                        &&
                        <>
                            <li>
                                <Link to='/dashboard/book-parcel'>Book a Parcel</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/my-parcel'>My Parcel</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/my-profile'>My Profile</Link>
                            </li>
                        </>
                    }
                    {
                        currentUser?.role === 'deliveryPerson'
                        &&
                        <>
                            <li>
                                <Link to='/dashboard/my-delivery-lists'>My Delivery List</Link>
                            </li>
                            <li>
                                <Link to='/dashboard/my-reviews'>My Reviews</Link>
                            </li>
                        </>
                    }
                </ul>

            </div>

            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;