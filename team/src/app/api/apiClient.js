import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api/',
  timeout: 10000, // Adjust the timeout as needed
});

apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      console.log('api_token',token)
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      config.headers["Content-Type"] = "application/json";

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postApi = async (endpoint, payload) => {
  try {
    console.log('payload',payload)
    const response = await apiClient.post(endpoint, payload, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    console.error('API Error:', errorMessage);
    throw errorMessage; // Throwing the extracted error message
  }
};