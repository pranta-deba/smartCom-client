import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';


const useGetEmployeeRequest = () => {
    const { user, userLoader } = useAuth();

    const { data: employee_requests = [], isPending, refetch } = useQuery({
        queryKey: ['employees_request', user?.email],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_Base_URL}/users/employees-request/${user?.email}`)
            return data;
        }
    })
    return [employee_requests, isPending, refetch]
};

export default useGetEmployeeRequest;