import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import axios from 'axios';

const useGetRole = () => {
    const { user, userLoader } = useAuth();

    const { data: isRole = '', isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, "isRole"],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_Base_URL}/users/role/${user?.email}`);
            return data.role;
        }
    })
    return [isRole, isRoleLoading]
};

export default useGetRole;