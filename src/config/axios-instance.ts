import axios, { AxiosInstance } from 'axios';

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  apiInstance.interceptors.request.use(
    (config) => {
      console.log('Request Sent:', config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error.response?.data || error.message);
      return Promise.reject(error);
    }
  );

  return apiInstance;
};
