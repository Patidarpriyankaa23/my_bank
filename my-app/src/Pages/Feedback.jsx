import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from '../utils/userAxios';

export default function Feedback() {
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const res = await axios.post('/feedback', {
        name: user.name,
        email: user.email,
        message,
      });

      setStatus('Feedback sent successfully!');
      setMessage('');
    } catch (error) {
      console.error('❌ Feedback error:', error);
      setStatus(error?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Send Us Your Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded p-6">
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={user?.name}
            disabled
            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={user?.email}
            disabled
            className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>

        {status && (
          <p className="text-sm mt-2 text-green-600 font-medium">{status}</p>
        )}
      </form>
    </div>
  );
}
