import axios from 'axios';

// Create an instance of axios
const api_server2 = axios.create({
  baseURL: 'http://localhost:8011/api', // Set your base URL
});

// Add an interceptor to the axios instance
api_server2.interceptors.request.use(
  (config) => {
    const token = localStorage.token; // Retrieve the token from localStorage or wherever you have stored it

    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add the token to the request headers
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api_server2;
