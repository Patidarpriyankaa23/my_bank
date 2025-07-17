import axios from 'axios';

const adminAxios = axios.create({
  baseURL: 'http://localhost:4000/api',
});

adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // 👈 Only admin token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default adminAxios;
