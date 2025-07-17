import React, { useState, useEffect } from 'react';
import axios from "../../utils/userAxios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMessage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  //  Fetch name & email from profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/profile/me');
        const { name, email } = res.data;
        setForm((prev) => ({
          ...prev,
          name,
          email
        }));
      } catch (err) {
        console.error('❌ Failed to fetch profile:', err.response?.data || err.message);
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('/contact/message', form);
      toast.success(res.data.message || "Message sent successfully!");
      setForm((prev) => ({
        ...prev,
        message: ''
      }));
    } catch (err) {
      console.error('❌ Error sending message:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Error sending message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Send a Message</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className={`w-full bg-red-900 text-black py-2 rounded hover:bg-red-700 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {/* Toast container at bottom-right */}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SendMessage;
