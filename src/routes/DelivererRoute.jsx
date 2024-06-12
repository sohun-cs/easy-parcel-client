import useAuth from '../hooks/useAuth';
import useDeliveryPerson from '../hooks/useDeliveryPerson';
import { Navigate, useLocation } from 'react-router-dom';
import { Flex, Spin } from 'antd';
import PropTypes from 'prop-types'


const DelivererRoute = ({children}) => {

    const { user, loading } = useAuth();
    const [isDeliverer, isDelivererLoading] = useDeliveryPerson();
    const location = useLocation();

    if (loading || isDelivererLoading) return <Flex className='min-h-screen' align="center" justify='center' gap="middle"><Spin size="large" /></Flex>;

    if (user && isDeliverer) {
        return children
    }

    return <Navigate to="/" state={{ from: location }} replace />
    
};

export default DelivererRoute;

DelivererRoute.propTypes = {
    children: PropTypes.node
}