import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useGetUser from './useGetUser';
const useGetMyTeam = () => {
    const axiosSecure = useAxiosSecure();
    const [isUser, isUserLoading] = useGetUser();

    const { data: myTeams = [], isPending } = useQuery({
        queryKey: ['my_teams', isUser],
        enabled: !isUserLoading && !!isUser?.company_name,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/request/team?company=${isUser?.company_name}`)
            return data;
        }
    })
    return [myTeams, isPending]
};

export default useGetMyTeam;