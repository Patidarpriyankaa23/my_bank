// import React, { useState, useEffect } from 'react';
// import axios from "../../utils/userAxios"; // axios with baseURL + auth token
// import { toast } from "react-toastify";
// import { useUser } from '../../contexts/UserContext';

// const RequestCallback = () => {
//   const { user } = useUser();
//   const [form, setForm] = useState({
//     uniqueId: '',
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [loadingMessages, setLoadingMessages] = useState(true);

//   useEffect(() => {
//       console.log('User from context:', user);
//     if (user) {
//       setForm({
//         uniqueId: user.uniqueId || '',
//         name: user.name || '',
//         email: user.email || '',
//         phone: user.mobile || '',
//         message: ''
//       });
//       fetchMessages(user.uniqueId || '');
//     }
//   }, [user]);

//   // Fetch callback messages (GET)
//   const fetchMessages = async (uniqueId) => {
//     if (!uniqueId) return;
//     setLoadingMessages(true);
//     try {
//       const res = await axios.get(`/callback/request/${uniqueId}`);
//       setMessages(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching messages:', err);
//       toast.error(err.response?.data?.message || "Failed to load messages");
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   const handleChange = (e) => {
//     setForm({...form, [e.target.name]: e.target.value});
//   };

//   // Submit callback request (POST)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      console.log('Submitting form:', form);
//     if (!form.message.trim()) {
//       toast.error("Message is required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post('/callback/request', form);

//       toast.success(res.data.message || 'Callback request sent');
//       setForm(prev => ({...prev, message: ''}));
//       fetchMessages(form.uniqueId);  // Refresh messages after submit
//     } catch (err) {
//       console.error('Callback error:', err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Failed to submit request');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
//       <h2 className="text-2xl font-bold mb-6 text-center">Request a Callback</h2>

//       <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//         <input
//           name="uniqueId"
//           value={form.uniqueId}
//           readOnly
//           className="w-full p-2 border rounded bg-gray-100"
//           placeholder="Unique ID"
//         />
//         <input
//           name="name"
//           value={form.name}
//           readOnly
//           className="w-full p-2 border rounded bg-gray-100"
//           placeholder="Name"
//         />
//         <input
//           name="email"
//           value={form.email}
//           readOnly
//           className="w-full p-2 border rounded bg-gray-100"
//           placeholder="Email"
//         />
//         <input
//           name="phone"
//           value={form.phone}
//           readOnly
//           className="w-full p-2 border rounded bg-gray-100"
//           placeholder="Phone"
//         />
//         <textarea
//           name="message"
//           placeholder="Your Message"
//           value={form.message}
//           onChange={handleChange}
//           required
//           className="w-full p-2 border rounded"
//           rows={4}
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//         >
//           {loading ? 'Submitting...' : 'Request Callback'}
//         </button>
//       </form>

//       <h3 className="text-xl font-semibold mb-4">Your Callback Messages</h3>
//       {loadingMessages ? (
//         <p>Loading messages...</p>
//       ) : messages.length === 0 ? (
//         <p>No messages found.</p>
//       ) : (
//         <ul className="space-y-4 max-h-72 overflow-y-auto border rounded p-4 bg-gray-50">
//           {messages.map(msg => (
//             <li key={msg._id} className="border-b pb-2 last:border-none">
//               <p className="whitespace-pre-wrap">{msg.message}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 Sent on: {new Date(msg.createdAt).toLocaleString()}
//               </p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default RequestCallback;
import React, { useState, useEffect } from 'react';
import axios from "../../utils/userAxios"; // axios with baseURL + auth token
import { toast } from "react-toastify";
import { useUser } from '../../contexts/UserContext';

const RequestCallback = () => {
  const { user } = useUser();
  const [form, setForm] = useState({
    uniqueId: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const [editPhone, setEditPhone] = useState(false);  // For toggling phone edit mode

  useEffect(() => {
    if (user) {
      setForm({
        uniqueId: user.uniqueId || '',
        name: user.name || '',
        email: user.email || '',
        phone: user.mobile || '',
        message: ''
      });
      fetchMessages(user.uniqueId || '');
    }
  }, [user]);

  const fetchMessages = async (uniqueId) => {
    if (!uniqueId) return;
    setLoadingMessages(true);
    try {
      const res = await axios.get(`/callback/request/${uniqueId}`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error('Error fetching messages:', err);
      toast.error(err.response?.data?.message || "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  // When user clicks Save after editing phone
  const handlePhoneSave = () => {
    if (!form.phone.trim()) {
      toast.error("Phone number cannot be empty");
      return;
    }
    setEditPhone(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      toast.error("Message is required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('/callback/request', form);
      toast.success(res.data.message || 'Callback request sent');
      setForm(prev => ({...prev, message: ''}));
      fetchMessages(form.uniqueId);
    } catch (err) {
      console.error('Callback error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Callback</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          name="uniqueId"
          value={form.uniqueId}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          placeholder="Unique ID"
        />
        <input
          name="name"
          value={form.name}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          placeholder="Name"
        />
        <input
          name="email"
          value={form.email}
          readOnly
          className="w-full p-2 border rounded bg-gray-100"
          placeholder="Email"
        />
        <div className="relative">
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            readOnly={!editPhone}
            className={`w-full p-2 border rounded ${editPhone ? 'bg-white' : 'bg-gray-100'}`}
            placeholder="Phone"
          />
          {editPhone ? (
            <button
              type="button"
              onClick={handlePhoneSave}
              className="absolute right-2 top-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setEditPhone(true)}
              className="absolute right-2 top-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>

        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Submitting...' : 'Request Callback'}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-4">Your Callback Messages</h3>
      {loadingMessages ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul className="space-y-4 max-h-72 overflow-y-auto border rounded p-4 bg-gray-50">
          {messages.map(msg => (
            <li key={msg._id} className="border-b pb-2 last:border-none">
              <p className="whitespace-pre-wrap">{msg.message}</p>
              <p className="text-sm text-gray-500 mt-1">
                Sent on: {new Date(msg.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RequestCallback;
