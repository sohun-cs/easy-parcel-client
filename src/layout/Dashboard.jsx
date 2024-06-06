import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
    const { user } = useAuth();
    console.log(user?.role);

    return (
        <div className="min-h-screen">
        
            {
                user?.role === 'user'
                &&
                <>
                    <Link to='/book-a-parcel'>Book a Parcel</Link>
                    <Link to='/my-parcel'>My Parcel</Link>
                    <Link to='/my-profile'>My Profile</Link>
                </>
            }
            {
                user?.role === 'deliveryPerson'
                &&
                <>
                    <Link to='my-delivery-list'>My Delivery List</Link>
                    <Link to='my-reviews'>My Reviews</Link>
                </>
            }

            <div>
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;