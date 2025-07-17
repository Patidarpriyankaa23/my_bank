// src/pages/OauthSuccess.jsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // ✅ correct ES module import
import { useUser } from '../contexts/UserContext.jsx';

import axios from '../utils/userAxios';

const OauthSuccess = () => {
  const navigate = useNavigate();
  const { login: saveUserToContext } = useUser();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {
        // Save token in localStorage
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // Decode user from token (optional, or call backend for /me)
        const decoded = jwtDecode(token);
        localStorage.setItem('user', JSON.stringify(decoded));
        saveUserToContext({ ...decoded, token });

        // Redirect to dashboard
        navigate('/user/dashboard');
      } catch (error) {
        console.error('Token decode error:', error);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate, saveUserToContext]);

  return (
    <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
      Logging in with Google...
    </div>
  );
};

export default OauthSuccess;
