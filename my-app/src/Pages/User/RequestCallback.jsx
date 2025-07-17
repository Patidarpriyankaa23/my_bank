import React, { useState, useEffect } from 'react';
import axios from "../../utils/userAxios";
import { toast } from "react-toastify";
import { useUser } from '../../contexts/UserContext';

const RequestCallback = () => {
  const { user } = useUser(); //  Get user from context
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  // Autofill on mount
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.mobile || ''
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!form.message.trim()) {
      toast.error("Message is required");
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/contact/callback', form);
      toast.success(res.data.message || 'Callback request sent');
      setForm((prev) => ({
        ...prev,
        message: ''
      }));
    } catch (err) {
      console.error(' Callback error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Request a Callback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          name="email"
          value={form.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          name="phone"
          value={form.phone}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-black py-2 rounded hover:bg-blue-700 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Submitting...' : 'Request Callback'}
        </button>
      </form>
    </div>
  );
};

export default RequestCallback;
