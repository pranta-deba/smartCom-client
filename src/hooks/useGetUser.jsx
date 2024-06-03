import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';

const useGetUser = () => {
    const { user, userLoader } = useAuth();

    const { data: isUser = {}, isPending: isUserLoading } = useQuery({
        queryKey: [user?.email, "isUser"],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_Base_URL}/users/user/${user?.email}`);
            return data;
        }
    })
    return [isUser, isUserLoading]
};

export default useGetUser;