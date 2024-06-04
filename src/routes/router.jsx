import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Notification from "../pages/notification/Notification";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import PrivateRoutes from "./PrivateRoutes";


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
                path: '/dashboard',
                element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>
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
    }
]);

export default router;