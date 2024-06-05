import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useGetUser from './useGetUser';

const useGetAllPendingRequested = () => {
    const axiosSecure = useAxiosSecure();
    const [isUser, isUserLoading] = useGetUser();

    const { data: all_requested = [], isPending,refetch } = useQuery({
        queryKey: ['all_requested', isUser],
        enabled: !isUserLoading && !!isUser?.company_name,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request/requested?company=${isUser?.company_name}`)
            return data;
        }
    })
    return [all_requested, isPending,refetch]
};

export default useGetAllPendingRequested;