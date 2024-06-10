import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllParcel = () => {

    const axiosSecure = useAxiosSecure();

    const { refetch, data: allParcel = [] } = useQuery({
        queryKey: ['parcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels');
            return res.data;
        }
    })

    return [allParcel, refetch];
};

export default useAllParcel;