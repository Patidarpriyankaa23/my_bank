// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// export const UserContext = createContext();
// export const useUser = () => useContext(UserContext);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   //  Fetch user profile from backend
//   const fetchUserProfile = async () => {
//     try {
//       const res = await axios.get('/profile/me');
//       setUser(res.data);
//       localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (err) {
//       console.error(' Error fetching profile:', err);
//       setUser(null);
//     }
//   };

//   //  Load user from localStorage on mount
//   useEffect(() => {
//     const savedUser = localStorage.getItem('user');
//     const token = localStorage.getItem('token');
//     if (savedUser && token) {
//       setUser(JSON.parse(savedUser));
//       fetchUserProfile(); // 🆕 Fetch fresh profile
//     }
//   }, []);

//   //  Login
//   const login = (userData) => {
//     localStorage.setItem('token', userData.token);
//     fetchUserProfile(); // 🆕 Get full profile after login
//   };

//   //  Logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//   };

//   //  Delete profile
//   const deleteProfile = async () => {
//     try {
//       const res = await axios.delete('/profile/me');
//       console.log('🗑️ Profile deleted:', res.data);
//       logout();
//       alert('Your profile has been deleted.');
//     } catch (error) {
//       console.error('❌ Delete profile error:', error?.response?.data || error.message);
//       alert(error?.response?.data?.message || 'Something went wrong while deleting your profile.');
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout, deleteProfile, fetchUserProfile }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export default UserProvider;
import React, { createContext, useContext, useEffect, useState } from 'react';
import userAxios from '../utils/userAxios';

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const res = await userAxios.get('/profile/me'); // ✅
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      console.error('❌ Error fetching profile:', err);
      setUser(null);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
      fetchUserProfile(); // ✅
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    fetchUserProfile(); // ✅
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  const deleteProfile = async () => {
    try {
      const res = await userAxios.delete('/profile/me'); // ✅
      console.log('🗑️ Profile deleted:', res.data);
      logout();
      alert('Your profile has been deleted.');
    } catch (error) {
      console.error('❌ Delete profile error:', error?.response?.data || error.message);
      alert(error?.response?.data?.message || 'Something went wrong while deleting your profile.');
    }
  };

  return (
    <UserContext.Provider value={{ user, login, logout, deleteProfile, fetchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
