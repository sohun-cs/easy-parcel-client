import { Link, Outlet } from "react-router-dom";

import Navbar from "../shared/Navbar";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useDeliveryPerson from "../hooks/useDeliveryPerson";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const [isDeliverer] = useDeliveryPerson();

    return (
        <div>
            <Navbar></Navbar>

            <div className="flex md:h-[calc(100vh-82px)]">

                <div className="w-24 md:w-64 text-[10px] md:text-xl text-pink-50 bg-pink-500 flex">

                    <ul className="flex flex-col ms-2 md:ms-6 mt-6 space-y-2 md:space-y-3">

                        {
                            isAdmin &&

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

                            ||

                            isDeliverer &&
                            <>
                                <li>
                                    <Link to='/dashboard/my-delivery-lists'>My Delivery List</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my-reviews'>My Reviews</Link>
                                </li>
                            </>

                            ||

                            user &&
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
                                <li>
                                    <Link to='/dashboard/payment-history'>Payment History</Link>
                                </li>
                            </>

                        }







                        {/* {
                            isAdmin
                                ?
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

                                :
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

                        } */}

                        {/* {
                            isDeliverer &&
                            <>
                                <li>
                                    <Link to='/dashboard/my-delivery-lists'>My Delivery List</Link>
                                </li>
                                <li>
                                    <Link to='/dashboard/my-reviews'>My Reviews</Link>
                                </li>
                            </>
                        } */}

                        {/* {
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
                        } */}
                        {/* {
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
                        } */}
                    </ul>

                </div>

                <div className="flex-1 overflow-y-scroll">
                    <Outlet></Outlet>
                </div>

            </div>
        </div>

    );
};

export default Dashboard;