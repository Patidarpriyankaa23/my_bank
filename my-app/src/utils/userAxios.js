import axios from 'axios';

const userAxios = axios.create({
  baseURL: 'http://localhost:4000/api',
});

userAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); //  Only user token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default userAxios;
