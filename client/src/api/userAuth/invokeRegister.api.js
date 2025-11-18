import { toast } from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";


export const RegisterApi = async (data,navigate) => {
    try {
        const response = await apiRequest({
            url: '/users/register',
            method: 'POST',
            data
        });



        if (response?.status) {
            toast.success(response.message || "Registration successful!");
            navigate('/login')
            return response.data;
        }

    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
    }
};
