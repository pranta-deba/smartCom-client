import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';

const useAllAssets = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allAssets = [], isPending, refetch } = useQuery({
        queryKey: ['all_assets'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assets`)
            return data;
        }
    })
    return [allAssets, isPending, refetch]
};

export default useAllAssets;