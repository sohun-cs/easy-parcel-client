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
            {
                path: 'my-delivery-list',
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