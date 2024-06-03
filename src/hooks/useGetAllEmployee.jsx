import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useGetAllEmployee = () => {
    const { user, userLoader } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: employees = [], isPending, refetch } = useQuery({
        queryKey: ['all_employee', user?.email],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/all-employees/${user?.email}`)
            return data;
        }
    })
    return [employees, isPending, refetch]
};

export default useGetAllEmployee;