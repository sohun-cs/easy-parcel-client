import { Flex, Spin } from "antd";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

import PropTypes from 'prop-types'

const AdminRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();



    if (loading || isAdminLoading) return <Flex className='min-h-screen' align="center" justify='center' gap="middle"><Spin size="large" /></Flex>;

    if (user && isAdmin) {
        return children
    }

    return <Navigate to="/" state={{ from: location }} replace />
};

export default AdminRoute;

AdminRoute.propTypes = {
    children: PropTypes.node
}