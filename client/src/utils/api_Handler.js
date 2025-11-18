import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * param => header is optional 
 * @param {string} url - The endpoint to hit.
 * @param {string} method - The HTTP method (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data] - The request payload (for POST, PUT, etc.).
 * @param {Object} [params] - The query parameters (for GET, DELETE, etc.).
 * @param {Object} [headers] - Additional headers for the request.
 * @returns {Promise<Object>} - The response data or an error object.
 */
const apiRequest = async ({ url, method, data = {}, params = {}, headers = {} }) => {
    try {
        const response = await axiosInstance({
            url,
            method,
            data,
            params,
            headers: { ...axiosInstance.defaults.headers, ...headers },
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error Response:', error.response);
            throw {
                status: error.response.status,
                message: error.response.data.message || 'An error occurred',
                data: error.response.data,
            };
        } else if (error.request) {
            console.error('Error Request:', error.request);
            throw { message: 'No response from server', request: error.request };
        } else {
            console.error('Error Message:', error.message);
            throw { message: error.message };
        }
    }
};

export default apiRequest;