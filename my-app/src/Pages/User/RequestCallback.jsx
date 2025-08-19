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
//   const [loadingMessages, setLoadingMessages] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [editPhone, setEditPhone] = useState(false);  // For toggling phone edit mode

//   useEffect(() => {
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

//   // When user clicks Save after editing phone
//   const handlePhoneSave = () => {
//     if (!form.phone.trim()) {
//       toast.error("Phone number cannot be empty");
//       return;
//     }
//     setEditPhone(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.message.trim()) {
//       toast.error("Message is required");
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.post('/callback/request', form);
//       toast.success(res.data.message || 'Callback request sent');
//       setForm(prev => ({...prev, message: ''}));
//       fetchMessages(form.uniqueId);
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
//         <div className="relative">
//           <input
//             name="phone"
//             value={form.phone}
//             onChange={handleChange}
//             readOnly={!editPhone}
//             className={`w-full p-2 border rounded ${editPhone ? 'bg-white' : 'bg-gray-100'}`}
//             placeholder="Phone"
//           />
//           {editPhone ? (
//             <button
//               type="button"
//               onClick={handlePhoneSave}
//               className="absolute right-2 top-2 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//             >
//               Save
//             </button>
//           ) : (
//             <button
//               type="button"
//               onClick={() => setEditPhone(true)}
//               className="absolute right-2 top-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Edit
//             </button>
//           )}
//         </div>

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
import React, { useState, useEffect } from "react";
import axios from "../../utils/userAxios"; // axios with baseURL + auth token
import { toast } from "react-toastify";
import { useUser } from "../../contexts/UserContext";

const RequestCallback = () => {
  const { user } = useUser();

  const [form, setForm] = useState({
    uniqueId: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [messages, setMessages] = useState([]); // all messages (user + admin)
  const [showMessagesList, setShowMessagesList] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null); // conversation to show chat

  const [editPhone, setEditPhone] = useState(false);

  // On user change, set form and fetch messages
  useEffect(() => {
    if (user) {
      setForm({
        uniqueId: user.uniqueId || "",
        name: user.name || "",
        email: user.email || "",
        phone: user.mobile || "",
        message: "",
      });
      fetchMessages(user.uniqueId || "");
    }
  }, [user]);

  // Fetch all messages for user by uniqueId
  const fetchMessages = async (uniqueId) => {
    if (!uniqueId) return;
    setLoadingMessages(true);
    try {
      const res = await axios.get(`/callback/request/${uniqueId}`);
      // Assuming backend returns array of messages in res.data.data
      // Each message should have: _id, message, sender ('user' or 'admin'), createdAt, etc.
      setMessages(res.data.data || []);
    } catch (err) {
      console.error("Error fetching messages:", err);
      toast.error(err.response?.data?.message || "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Save phone after editing
  const handlePhoneSave = () => {
    if (!form.phone.trim()) {
      toast.error("Phone number cannot be empty");
      return;
    }
    setEditPhone(false);
  };

  // Submit new callback request message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) {
      toast.error("Message is required");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/callback/request", form);
      toast.success(res.data.message || "Callback request sent");
      setForm((prev) => ({ ...prev, message: "" }));
      fetchMessages(form.uniqueId);
    } catch (err) {
      console.error("Callback error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  // Toggle show/hide messages list
  const toggleMessagesList = () => {
    setShowMessagesList((prev) => !prev);
    setSelectedConversation(null);
  };

  // Open chat for selected message (show conversation thread)
  const openConversation = (msg) => {
    // In your backend, if you have conversation threads, fetch full conversation here
    // For demo: Just show all messages from same uniqueId sorted by date
    // Filter all messages that belong to this conversation - here just use all messages
    setSelectedConversation(messages);
  };

  // Format date (e.g. "Aug 14")
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  };

  // Format time (e.g. "3:45 PM")
  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Callback</h2>

      {/* Form for new message */}
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
            className={`w-full p-2 border rounded ${editPhone ? "bg-white" : "bg-gray-100"}`}
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
          className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Submitting..." : "Request Callback"}
        </button>
      </form>

      {/* Show messages button */}
      <button
        onClick={toggleMessagesList}
        className="mb-4 w-full bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
      >
        {showMessagesList ? "Hide Messages" : "Show Messages"}
      </button>

      {/* Show list of message dates and previews */}
      {showMessagesList && !selectedConversation && (
        <>
          {loadingMessages ? (
            <p className="text-center text-gray-500">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-center text-gray-500">No messages found.</p>
          ) : (
            <ul className="border rounded max-h-96 overflow-y-auto divide-y">
              {[...messages]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // newest first
                .map((msg) => (
                  <li
                    key={msg._id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => openConversation(msg)}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{formatDate(msg.createdAt)}</span>
                      <span className="text-gray-500">{formatTime(msg.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700 truncate">{msg.message}</p>
                  </li>
                ))}
            </ul>
          )}
        </>
      )}

      {/* Show chat conversation */}
      {selectedConversation && (
        <div className="mt-4">
          <button
            onClick={() => setSelectedConversation(null)}
            className="mb-4 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            ← Back to messages
          </button>

          <div className="chat-container max-h-[400px] overflow-y-auto border rounded p-4 bg-gray-50 flex flex-col gap-3">
            {/* Render each message bubble */}
            {[...selectedConversation]
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // oldest first
              .map((msg) => (
                <MessageBubble
                  key={msg._id}
                  message={msg}
                  isUser={msg.email === user.email} // user vs admin
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Message bubble component
const MessageBubble = ({ message, isUser }) => {
  return (
    <div
      className={`flex flex-col max-w-[70%] ${
        isUser ? "items-end self-end" : "items-start self-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg ${
          isUser ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-900"
        }`}
      >
        <p className="whitespace-pre-wrap">{message.message}</p>
      </div>
      <span className="text-xs text-gray-500 mt-1 select-none">
        {new Date(message.createdAt).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })}{" "}
        {new Date(message.createdAt).toLocaleTimeString(undefined, {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </span>
    </div>
  );
};

export default RequestCallback;
