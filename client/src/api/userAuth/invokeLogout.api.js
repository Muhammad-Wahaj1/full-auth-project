import toast from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";
import useUserToken from "../../context/userTokenStore";
import useUserStore from "../../context/userStore";

export const LogoutApi = async (navigate) => {
    try {
        const { userToken, removeUserToken } = useUserToken.getState();
        const { removeUser } = useUserStore.getState();


        await apiRequest({
            url: '/users/logout',
            method: 'POST',
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });

        removeUserToken();
        removeUser()
        toast.success("Logout successful");
        navigate('/login')
        
    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
    }
};
