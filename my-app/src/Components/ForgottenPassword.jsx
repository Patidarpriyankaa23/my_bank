import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../utils/userAxios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  // Autofill email from localStorage and disable editing
  useEffect(() => {
    const tempEmail = localStorage.getItem('tempEmail');
    if (tempEmail) {
      setEmail(tempEmail);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      return toast.error('Please enter a valid email');
    }

    setLoading(true);
    try {
      const response = await axios.post('/auth/forgot-password', { email });
      toast.success(response.data?.message || 'Reset link sent successfully');
      localStorage.removeItem('tempEmail'); // remove temp email after use
      setEmail('');
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(
        error.response?.data?.message || 'Failed to send reset link'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          disabled // 👈 disable editing
          className="w-full px-4 py-3 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 text-white font-semibold rounded transition ${
            loading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
