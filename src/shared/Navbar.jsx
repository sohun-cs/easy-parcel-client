import { Badge } from "antd";
import { Link, NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import 'animate.css';
import useAuth from "../hooks/useAuth";
import useParcel from "../hooks/useParcel";
import useAdmin from "../hooks/useAdmin";
import useDeliveryPerson from "../hooks/useDeliveryPerson";
import { IoIosLogOut } from "react-icons/io";
import useAllParcel from "../hooks/useAllParcel";
import useDeliveryLists from "../hooks/useDeliveryLists";



const Navbar = () => {

    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);
    const [parcels] = useParcel();
    const [allParcel] = useAllParcel();
    const [deliveryLists] = useDeliveryLists();

    const [isAdmin] = useAdmin()
    const [isDeliverer] = useDeliveryPerson();

    // console.log('allParcel', allParcel);
    const parcelNotification = allParcel.filter(parcel => parcel.status === 'Paid')

    // console.log('parcelotification', parcelNotification);

    // console.log('deliveryLists', deliveryLists);
    const deliveryListNotification = deliveryLists.filter(parcel => parcel.status === 'On the Way')
    // console.log('deliveryListNotification', deliveryListNotification);

    const handleLogout = () => {
        logout()
    }

    useEffect(() => {

        const handleNavbarBehavior = () => {
            if (window.scrollY > 200) {
                setActive(true)
            } else {
                setActive(false)
            }
        }

        window.addEventListener('scroll', handleNavbarBehavior);

        return () => {
            return window.removeEventListener('scroll', handleNavbarBehavior)

        }

    }, []);

    const link = <>
        <li>
            <NavLink to='/' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Home</NavLink>
        </li>
        {/* <li>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Dashboard</NavLink>
        </li> */}
        {
            isAdmin && !isDeliverer
            &&
            <li>
                <NavLink to='/dashboard/all-parcels' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Dashboard</NavLink>
            </li>

            ||

            isDeliverer && !isAdmin
            &&
            <li>
                <NavLink to='/dashboard/my-delivery-lists' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Dashboard</NavLink>
            </li>

            ||
            
            !isDeliverer && !isAdmin
            &&
            <li>
                <NavLink to='/dashboard/my-parcel' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Dashboard</NavLink>
            </li>




        }
        {
            isAdmin
            &&
            <li className="hidden lg:inline-block">

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Badge count={parcelNotification.length} showZero size="default" color="#223dff">
                            <IoIosNotificationsOutline className="text-2xl" />
                        </Badge>
                    </div>
                </button>
            </li>

            ||

            isDeliverer
            &&
            <li className="hidden lg:inline-block">

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Badge count={deliveryListNotification.length} showZero size="default" color="#223dff">
                            <IoIosNotificationsOutline className="text-2xl" />
                        </Badge>
                    </div>
                </button>
            </li>

            ||

            !isAdmin && !isDeliverer
            &&
            <li className="hidden lg:inline-block">

                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <Badge count={parcels.length} showZero size="default" color="#223dff">
                            <IoIosNotificationsOutline className="text-2xl" />
                        </Badge>
                    </div>
                </button>
            </li>


        }

    </>

    return (
        <div className={` w-full ${active ? 'fixed duration-1000 z-50 animate__animated animate__fadeInDown ' : 'duration-1000 sticky z-50 a'} `}>
            <div className=" shadow-md z-50  bg-white">

                <div className={`flex items-center justify-between z-50 ${active ? 'px-2 py-4 lg:px-4 lg:py-2' : 'px-2 lg:px-4 py-4'}`}>
                    <Link to='/'>
                        <h1 className="font-dongle text-4xl font-bold flex">Easy <span className=" text-pink-300">Parcel</span></h1>
                    </Link>

                    <div className={`hidden lg:inline-block `}>
                        <ul className="flex items-center gap-6">
                            {link}
                            {
                                user ? <li>
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                            <div className="w-10 rounded-full">
                                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52 space-y-2">

                                            <li>{user?.displayName}</li>
                                            <li>{user?.email}</li>
                                            <li className="bg-pink-400 text-white font-semibold rounded-md hover:bg-pink-600 duration-500"><Link to='/' onClick={handleLogout} >Logout</Link></li>
                                        </ul>
                                    </div>
                                </li>
                                    :

                                    <li>
                                        <NavLink to='/login'
                                            className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Login</NavLink>
                                    </li>
                            }
                        </ul>
                    </div>

                    <div className="lg:hidden flex items-center gap-6">

                        {
                            isAdmin
                            &&

                            <Badge count={parcelNotification.length} showZero size="small" color="#223dff">
                                <IoIosNotificationsOutline className="text-2xl" />
                            </Badge>

                            ||

                            isDeliverer
                            &&

                            <Badge count={deliveryListNotification.length} showZero size="small" color="#223dff">
                                <IoIosNotificationsOutline className="text-2xl" />
                            </Badge>

                            ||

                            !isAdmin && !isDeliverer
                            &&

                            <Badge count={parcels.length} showZero size="small" color="#223dff">
                                <IoIosNotificationsOutline className="text-2xl" />
                            </Badge>

                        }


                        <div className="cursor-pointer p-2  rounded-md border-2 border-pink-200" onClick={() => setOpen(!open)}>
                            {
                                open ? <TfiClose /> : <CiMenuFries />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={`absolute w-full py-4 px-2 bg-pink-50 flex flex-col -z-10 right-0 lg:hidden ${open ? "top-16 duration-500" : "-top-96 duration-500"
                }`}>

                <ul className=" bg-pink-50 flex flex-col -z-10 gap-2">
                    {link}
                </ul>

                <div className="flex justify-between items-center mt-4 bg-white p-2">
                    <div className="flex items-center gap-2">

                        <div className="">
                            <img className="w-12 h-12 rounded-full border-2 border-pink-500" src={user?.photoURL} />
                        </div>

                        <ul className="text-xs">

                            <li>{user?.displayName}</li>
                            <li>{user?.email}</li>

                        </ul>
                    </div>
                    <div>
                        <Link to='/' onClick={handleLogout} ><IoIosLogOut className="text-xl" />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;