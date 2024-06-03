import axios from "axios";
// import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:8000"
})

const useAxiosSecure = () => {
    const { logOut } = useAuth();
    // const navigate = useNavigate();
    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, (err) => {
        return Promise.reject(err)
    })

    axiosSecure.interceptors.response.use((response) => {
        return response;
    }, async (err) => {
        if (err.response.status === 401 || err.response.status === 403) {
            await logOut();
            // navigate('/login');
        }
        return Promise.reject(err)
    })

    return axiosSecure;
};

export default useAxiosSecure;