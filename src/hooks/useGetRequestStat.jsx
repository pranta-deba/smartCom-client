
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';


const useGetRequestStat = () => {
    const axiosSecure = useAxiosSecure()
    const { data: stats = {}, isPending, refetch } = useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request-stat`)
            return data;
        }
    })
    return [stats, isPending, refetch]
};

export default useGetRequestStat;