import toast from "react-hot-toast";
import apiRequest from "../../utils/api_Handler";
import useUserToken from "../../context/userTokenStore";
import useUserStore from "../../context/userStore";

export const LoginApi = async (data,navigate) => {
    try {
        const response = await apiRequest({
            url: '/users/login',
            method: 'POST',
            data,
        });

        if (response?.status) {
            const { setUserToken } = useUserToken.getState();
            const { setUser } = useUserStore.getState();

            setUserToken(response.data.token.token);
            setUser(response.data.user);
            toast.success(response.message || "Login successful!");
            navigate('/')

            return response.data;
        }

    } catch (error) {
        if (error?.response?.data?.message) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message || "Something went wrong");
        }
        return null;
    }
};
