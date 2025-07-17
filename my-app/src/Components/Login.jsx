import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/userAxios';
import { useUser } from '../Contexts/UserContext';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login: saveUserToContext } = useUser();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('/auth/login', form);
      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      saveUserToContext({ ...user, token });
      navigate('/user/dashboard');
    } catch (err) {
      console.error('❌ Login error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google user decoded:", decoded);
      window.location.href = 'http://localhost:4000/api/auth/google';
    } catch (error) {
      console.error(" Google Login failed", error);
      setError("Google Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
        Login to Your Account
      </h2>

      {error && (
        <div className="mb-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Sign in
        </button>
      </form>

      <div className="mt-6 flex items-center justify-center space-x-3">
        <hr className="w-1/4 border-gray-300" />
        <span className="text-gray-500 font-medium">OR</span>
        <hr className="w-1/4 border-gray-300" />
      </div>

      <div className="mt-6 w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => setError("Google Login Failed")}
        />
      </div>

      {/*  Autofill logic added below */}
      <div className="mt-6 text-center text-gray-600 space-x-4">
        <Link
          to="/forgot-password"
          className="text-blue-600 hover:underline"
          onClick={() => {
            const trimmedEmail = form.email.trim();
            if (trimmedEmail && trimmedEmail.includes('@')) {
              localStorage.setItem('tempEmail', trimmedEmail);
            } else {
              localStorage.removeItem('tempEmail');
            }
          }}
        >
          Forgot Password?
        </Link>

        <span>|</span>
        <Link to="/request-password" className="text-blue-600 hover:underline">
          Reset Password
        </Link>
      </div>

      <div className="mt-4 text-center text-gray-700">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline font-semibold">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default Login;
