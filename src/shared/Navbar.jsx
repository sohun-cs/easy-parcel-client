import { Badge } from "antd";
import { Link, NavLink } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import 'animate.css';
import useAuth from "../hooks/useAuth";
import { IoLogOutOutline } from "react-icons/io5";




const Navbar = () => {

    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);

    const handleLogout = () => {
        logout()
    }

    const ProfileDropDown = () => {

        const [state, setState] = useState(false)
        const profileRef = useRef()



        useEffect(() => {
            const handleDropDown = (e) => {
                if (!profileRef.current.contains(e.target)) setState(false)
            }
            document.addEventListener('click', handleDropDown)
        }, [])

        return (
            <div className={`relative bg-white py-2`}>
                <div className="flex justify-between items-center space-x-4 px-2">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <button ref={profileRef} className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 ring-2 lg:focus:ring-indigo-600"
                            onClick={() => setState(!state)}
                        >
                            <img
                                src={user?.photoURL}
                                className="w-full h-full rounded-full"
                            />
                        </button>
                        <div className="lg:hidden">
                            <span className="block text-xs">
                                {user?.displayName}
                            </span>
                            <span className="block text-xs text-gray-500">
                                {user?.email}
                            </span>

                        </div>
                    </div>
                    <Link to='/' className="text-red-400 text-2xl lg:hidden" onClick={handleLogout}>
                        <IoLogOutOutline />
                    </Link>
                </div>
                <ul className={`bg-white top-12 right-0 mt-5 space-y-5 lg:absolute lg:border lg:rounded-md lg:text-sm lg:w-52 lg:shadow-md lg:space-y-0 hidden lg:mt-0 ${state ? 'lg:inline-block' : 'lg:hidden'}`}>
                    <li  >
                        <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                            {user?.displayName}
                        </a>
                    </li>
                    <li  >
                        <a className="block text-gray-600 lg:hover:bg-gray-50 lg:p-2.5" >
                            {user?.email}
                        </a>
                    </li>
                    <li className="w-full bg-rose-400 p-2.5 text-white" >
                        <Link to='/' onClick={handleLogout}>Logout</Link>
                    </li>
                </ul>
            </div>
        )
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
        <li>
            <NavLink to='/dashboard' className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Dashboard</NavLink>
        </li>
        <li className="hidden lg:inline-block">
            <NavLink to='/notification' className={`flex ${({ isActive }) => isActive ? 'text-pink-400' : ''}`}>
                <Badge count={0} showZero size="small" color="#223dff">
                    <IoIosNotificationsOutline className="text-2xl" />
                </Badge>
            </NavLink>
        </li>
        {
            user ?
                <li>
                    <ProfileDropDown class="mt-5 pt-5 border-t lg:hidden" />
                </li>
                :
                <li>
                    <NavLink to='/login'
                        className={({ isActive }) => isActive ? 'text-pink-400' : ''}>Login</NavLink>
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
                        </ul>
                    </div>

                    <div className="lg:hidden flex items-center gap-6">

                        <NavLink to='/notification' className={`flex ${({ isActive }) => isActive ? 'text-pink-400' : ''}`}>
                            <Badge count={0} showZero size="small" color="#223dff">
                                <IoIosNotificationsOutline className="text-2xl" />
                            </Badge>
                        </NavLink>

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
            </div>
        </div>

    );
};

export default Navbar;