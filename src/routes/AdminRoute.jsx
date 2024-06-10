import { Flex, Spin } from "antd";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const AdminRoute = ({children}) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    if (loading || isAdminLoading) return <Flex className='min-h-screen' align="center" justify='center' gap="middle"><Spin size="large" /></Flex>;

    if (user && isAdmin) return children;

    return <Navigate state={location?.pathname} to='/login' />
};

export default AdminRoute;