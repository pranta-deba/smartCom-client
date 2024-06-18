import axios from "axios";
const axiosPublic = axios.create({
    baseURL: "https://smart-com-server.vercel.app"
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;