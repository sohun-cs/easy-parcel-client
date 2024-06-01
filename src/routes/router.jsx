import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import Notification from "../pages/notification/Notification";
import Login from "../pages/authentication/Login";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                index: true,
                element: <Home></Home>
            },
            {
                path: '/dashboard',
                element: <Dashboard></Dashboard>
            },
            {
                path: '/notification',
                element: <Notification></Notification>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
]);

export default router;