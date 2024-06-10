import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com/'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    response => response,
    error => {
      if (!error.response) {
        console.error("Network Error: The server is not responding.");
        alert("Network error: Please check your internet connection.");
      } else {
        switch (error.response.status) {
          case 401:
            alert("Session expired. Please login again.");
            break;
          case 403:
            alert("You do not have permission to perform this action.");
            break;
          case 404:
            alert("The requested resource was not found.");
            break;
          case 500:
            alert("Internal Server Error. Please try again later.");
            break;
          default:
            alert("An error occurred. Please try again.");
        }
      }
      return Promise.reject(error);
    }
);

export default api;