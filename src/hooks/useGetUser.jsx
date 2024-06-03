import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useGetUser = () => {
    const { user, userLoader } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isUser = {}, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, "isUser"],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/user/${user?.email}`);
            return data;
        }
    })
    return [isUser, isUserLoading]
};

export default useGetUser;