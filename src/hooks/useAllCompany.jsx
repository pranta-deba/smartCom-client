import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const useAllCompany = () => {

    const { data: AllCompany = [], isPending } = useQuery({
        queryKey: ["allCompany"],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_Base_URL}/users/company`);
            console.log(data);
            return data;
        }
    })
    return [AllCompany, isPending]
};

export default useAllCompany;