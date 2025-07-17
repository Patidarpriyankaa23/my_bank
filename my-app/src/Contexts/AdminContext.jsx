import React, { createContext, useContext, useEffect, useState } from 'react';
import adminAxios from '../utils/axiosadmin.js';

export const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  // ✅ Fetch admin profile
  const fetchAdminProfile = async () => {
    try {
      const res = await adminAxios.get('/admin/me');
      setAdmin(res.data);
      localStorage.setItem('admin', JSON.stringify(res.data));
    } catch (err) {
      console.error('❌ Error fetching admin profile:', err);
      setAdmin(null);
    }
  };

  // ✅ Load admin from localStorage
  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin');
    const token = localStorage.getItem('adminToken');
    if (savedAdmin && token) {
      setAdmin(JSON.parse(savedAdmin));
      fetchAdminProfile();
    }
  }, []);

  // ✅ Admin login
  const login = (adminData) => {
    localStorage.setItem('adminToken', adminData.token);
    fetchAdminProfile();
  };

  // ✅ Admin logout
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout, fetchAdminProfile }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
