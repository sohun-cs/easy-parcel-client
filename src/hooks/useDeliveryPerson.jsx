import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useDeliveryPerson = () => {

    const {user, loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isDeliverer, isPending: isDelivererLoading } = useQuery({
        queryKey: [user?.email, 'isDeliverer'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/deliverer/${user.email}`);
            console.log(res.data);
            return res.data?.deliverer;
        }
    })

    return [isDeliverer, isDelivererLoading];
};

export default useDeliveryPerson;