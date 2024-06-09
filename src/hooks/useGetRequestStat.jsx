
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useGetUser from './useGetUser';


const useGetRequestStat = () => {
    const axiosSecure = useAxiosSecure()
    const [isUser, userLoader] = useGetUser()


    const { data: stats = {}, isPending, refetch } = useQuery({
        queryKey: ['stats'],
        enabled: !userLoader && !!isUser.company_name,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request-stat?company=${isUser.company_name}`)
            return data;
        }
    })
    return [stats, isPending, refetch]
};

export default useGetRequestStat;