import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useParcel = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { refetch, data: parcels = [] } = useQuery({
        queryKey: ['parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data
        }
    })

    return [parcels, refetch]
};

export default useParcel;