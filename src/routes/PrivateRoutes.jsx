import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Flex, Spin } from 'antd';


const PrivateRoutes = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) return <Flex className='min-h-screen' align="center" justify='center' gap="middle"><Spin size="large" /></Flex>;

    if (user) return children;

    return <Navigate state={location?.pathname} to='/login' />
};

export default PrivateRoutes;

PrivateRoutes.propTypes = {
    children: PropTypes.node
}