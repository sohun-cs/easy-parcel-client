import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryMan = () => {

    const axiosSecure = useAxiosSecure();

    const { data: deliverymen = [] } = useQuery({
        queryKey: ['deliverymen'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/deliverer');
            res.data;
        }
    })

    return [deliverymen];
};

export default useDeliveryMan;