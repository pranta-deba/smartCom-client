import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useGetAllRequested = () => {

    const { user, userLoader } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: requested_assets = [], isPending, refetch } = useQuery({
        queryKey: ['all_requested', user?.email],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request?email=${user?.email}`)
            return data;
        }
    })
    return [requested_assets, isPending, refetch]
};

export default useGetAllRequested;