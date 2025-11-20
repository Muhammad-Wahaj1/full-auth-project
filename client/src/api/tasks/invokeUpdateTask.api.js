import { toast } from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";
import useUserToken from "../../context/userTokenStore";


export const updateTasks = async (taskid, data) => {
    try {
        const { userToken } = useUserToken.getState();

        const response = await apiRequest({
            url: `/tasks/${taskid}`,
            method: 'PUT',
            data,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
         toast.success(response.message || "Task updated Successfully");
            return response.data;
        

    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
    }
};
