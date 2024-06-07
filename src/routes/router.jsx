import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Notification from "../pages/notification/Notification";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoutes from "./PrivateRoutes";
import Dashboard from "../layout/Dashboard";
import BookParcel from "../pages/dashboard/user/BookParcel";
import MyParcel from "../pages/dashboard/user/MyParcel";
import MyProfile from "../pages/dashboard/user/MyProfile";
import MyDeliveryList from "../pages/dashboard/deliveryPerson/MyDeliveryList";
import MyReviews from "../pages/dashboard/deliveryPerson/MyReviews";
import AllDeliveryMen from "../pages/dashboard/admin/AllDeliveryMen";
import AllParcels from "../pages/dashboard/admin/AllParcels";
import AllUsers from "../pages/dashboard/admin/AllUsers";
import Statistics from "../pages/dashboard/admin/Statistics";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/notification',
                element: <PrivateRoutes><Notification></Notification></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            }
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [

            // Admin
            {
                path: 'all-deliveryperson',
                element: <AllDeliveryMen></AllDeliveryMen>
            },
            {
                path: 'all-parcels',
                element: <AllParcels></AllParcels>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },


            // User
            {
                path: 'book-parcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: 'my-parcel',
                element: <MyParcel></MyParcel>
            },
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },

            // Deliveri Person
            {
                path: 'my-delivery-lists',
                element: <MyDeliveryList></MyDeliveryList>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            }
        ]
    }
]);

export default router;