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
        <div className="min-h-screen">

            <h1>Total user: {users.length}</h1>

            {
                currentUser?.role === 'admin'
                &&
                <>
                    <Link to='/dashboard/all-deliveryperson'>
                        All Delivery Person
                    </Link>
                    <Link to='/dashboard/all-parcels'>
                        All Parcels
                    </Link>
                    <Link to='/dashboard/all-users'>
                        All Users
                    </Link>
                    <Link to='/dashboard/statistics'>
                        Statistics
                    </Link>
                </>
            }

            {
                currentUser?.role === 'user'
                &&
                <>
                    <Link to='/dashboard/book-parcel'>Book a Parcel</Link>
                    <Link to='/dashboard/my-parcel'>My Parcel</Link>
                    <Link to='/dashboard/my-profile'>My Profile</Link>
                </>
            }
            {
                currentUser?.role === 'deliveryPerson'
                &&
                <>
                    <Link to='/dashboard/my-delivery-lists'>My Delivery List</Link>
                    <Link to='/dashboard/my-reviews'>My Reviews</Link>
                </>
            }

            <div>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;