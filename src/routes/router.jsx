import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
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
import EditParcel from "../pages/dashboard/user/EditParcel";
import AdminRoute from "./AdminRoute";
import Payment from "../pages/dashboard/user/Payment";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import DelivererRoute from "./DelivererRoute";
import Error from "../Error/Error";
import Location from "../pages/dashboard/deliveryPerson/Location";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
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
            {
                path: 'edit-parcel/:id',
                element: <EditParcel></EditParcel>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/parcel/${params.id}`)
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/parcel/${params.id}`)
            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>
            },
            // {
            //     path: 'payment/:id',
            //     element: <Payment></Payment>,
            //     loader: ({ params }) => fetch(`${import.meta.env.VITE_BASE_URL}/parcel/${params.id}`)
            // },


            // Admin
            {
                path: 'all-deliveryperson',
                element: <AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute>
            },
            {
                path: 'all-parcels',
                element: <AdminRoute><AllParcels></AllParcels></AdminRoute>,
                loader: () => fetch(`${import.meta.env.VITE_BASE_URL}/users`)
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
            },
            {
                path: 'statistics',
                element: <AdminRoute><Statistics></Statistics></AdminRoute>
            },



            // Deliveri Person
            {
                path: 'my-delivery-lists',
                element: <DelivererRoute><MyDeliveryList></MyDeliveryList></DelivererRoute>
            },
            {
                path: 'my-reviews',
                element: <DelivererRoute><MyReviews></MyReviews></DelivererRoute>
            },
            {
                path: 'location/:id',
                element: <DelivererRoute><Location></Location></DelivererRoute>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_BASE_URL}/approved/${params.id}`)
            },
        ]
    }
]);

export default router;