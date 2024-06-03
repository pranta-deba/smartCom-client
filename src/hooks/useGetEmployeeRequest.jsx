import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useGetEmployeeRequest = () => {
    const { user, userLoader } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: employee_requests = [], isPending, refetch } = useQuery({
        queryKey: ['employees_request', user?.email],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/employees-request/${user?.email}`)
            return data;
        }
    })
    return [employee_requests, isPending, refetch]
};

export default useGetEmployeeRequest;