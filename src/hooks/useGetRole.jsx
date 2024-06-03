import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useGetRole = () => {
    const { user, userLoader } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isRole = '', isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, "isRole"],
        enabled: !userLoader && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
            return data.role;
        }
    })
    return [isRole, isRoleLoading]
};

export default useGetRole;