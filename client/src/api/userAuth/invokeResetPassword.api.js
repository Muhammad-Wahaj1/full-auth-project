import { toast } from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";


export const ResetApi = async (data,token,navigate) => {
    try {
        const response = await apiRequest({
            url: `/users/reset-password/${token}`,
            method: 'POST',
            data
        });



        if (response?.status) {
            toast.success(response.message || "Password Reset successful!");
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
