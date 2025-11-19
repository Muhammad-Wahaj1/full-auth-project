import { toast } from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";


export const ForgotApi = async (data, navigate) => {
    try {
        const response = await apiRequest({
            url: '/users/forgot-password',
            method: 'POST',
            data
        });



        if (response?.status) {
            toast.success(response.message || "Email sent successfully!");
            return response.data;
        }
        else {
            toast.error(response.message || "Email is not valid!");
            return response.data;
        }
    }
    catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
    }
};
