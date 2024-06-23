import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryLists = () => {

    const axiosSecure = useAxiosSecure();

    const { data: deliveryLists = [], refetch } = useQuery({
        queryKey: ['deliveryLists'],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved');
            return res.data
        }
    })

    return [deliveryLists, refetch];
};

export default useDeliveryLists;