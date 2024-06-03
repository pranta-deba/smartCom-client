import { useQuery } from '@tanstack/react-query'
import useAxiosPublic from './useAxiosPublic';

const useAllCompany = () => {
    const axiosPublic = useAxiosPublic()

    const { data: AllCompany = [], isPending } = useQuery({
        queryKey: ["allCompany"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/users/company`);
            return data;
        }
    })
    return [AllCompany, isPending]
};

export default useAllCompany;