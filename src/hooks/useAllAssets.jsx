import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useGetUser from './useGetUser';

const useAllAssets = () => {
    const axiosSecure = useAxiosSecure();
    const [isUser] = useGetUser()

    const { data: allAssets = [], isPending, refetch } = useQuery({
        queryKey: ['all_assets'],
        enabled: !!isUser && !!isUser.company_name,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/assets?company=${isUser.company_name}`)
            return data;
        }
    })
    return [allAssets, isPending, refetch]
};

export default useAllAssets;