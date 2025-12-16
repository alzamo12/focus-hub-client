import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000",
    // baseURL: "https://focus-hub-server.vercel.app/"
})
const useAxiosSecure = () => {
    const { user, logout, isLoading } = useAuth();
    const navigate = useNavigate();
    // console.log("this is outside interceptor", user.accessToken)

    if (isLoading || !user) return;

    // console.log('secure axios', user.email)
    // add a request interceptors
    axiosSecure.interceptors.request.use(
        function (config) {
            const accessToken = user?.accessToken;
            config.headers.authorization = `Bearer ${accessToken}`
            return config;
        },
        function (error) {
            return Promise.reject(error)
        }
    )

    // add a response interceptor
    axiosSecure.interceptors.response.use(
        function (response) {
            return response
        },
        async (error) => {
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
                // console.log(status)
                await logout()
                navigate("/auth/signin")
            }
            return Promise.reject(error)
        }
    )

    return axiosSecure
};

export default useAxiosSecure;