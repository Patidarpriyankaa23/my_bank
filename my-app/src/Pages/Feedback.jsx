// import React, { useState, useEffect, useRef } from 'react';
// import { useUser } from '../contexts/UserContext';
// import axios from '../utils/userAxios';
// import { toast, ToastContainer } from 'react-toastify';
// import { io } from 'socket.io-client';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Feedback() {
//   const { user } = useUser();
//   const [formMessage, setFormMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [loadingMessages, setLoadingMessages] = useState(false);
//   const [submitting, setSubmitting] = useState(false);
//   const [showMessages, setShowMessages] = useState(false);
//   const [socket, setSocket] = useState(null);
//   const messagesEndRef = useRef(null);

//   // Scroll to bottom when messages update
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // Socket.io setup for real-time updates
//   useEffect(() => {
//     if (user?.uniqueId) {
//       const s = io(import.meta.env.VITE_BACKEND_URL, {
//         query: { uniqueId: user.uniqueId },
//       });

//       s.emit('joinRoom', user.uniqueId);

//       s.on('newMessage', (msg) => {
//         setMessages((prev) => [...prev, msg]);
//       });

//       setSocket(s);
//       return () => s.disconnect();
//     }
//   }, [user?.uniqueId]);

//   // Fetch conversation when toggled
//   useEffect(() => {
//     if (showMessages && user?.uniqueId) {
//       fetchConversation(user.uniqueId);
//     }
//   }, [showMessages, user]);

//   const fetchConversation = async (uniqueId) => {
//     setLoadingMessages(true);
//     try {
//       const res = await axios.get(`/feedback/${uniqueId}`);
//       setMessages(res.data.data || []);
//     } catch (err) {
//       console.error('Error fetching conversation:', err);
//       toast.error(err.response?.data?.message || 'Failed to load messages');
//     } finally {
//       setLoadingMessages(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formMessage.trim()) {
//       toast.error('Message is required');
//       return;
//     }
//     setSubmitting(true);

//     try {
//       const newMsg = {
//         uniqueId: user.uniqueId,
//         name: user.name,
//         email: user.email,
//         message: formMessage,
//         sender: 'user',
//         createdAt: new Date().toISOString(),
//       };

//       // Send to backend
//       await axios.post('/feedback', newMsg);
//       toast.success('Feedback sent successfully!');

//       // Update UI instantly
//       setMessages((prev) => [...prev, newMsg]);
//       setFormMessage('');

//       // Emit to socket
//       socket?.emit('sendMessage', newMsg);

//     } catch (error) {
//       console.error('❌ Feedback error:', error);
//       toast.error(error?.response?.data?.message || 'Something went wrong.');
//     } finally {
//       setSubmitting(false);
//     }
//   };
// return (
//   <div className="pt-20 max-w-3xl mx-auto p-4 space-y-6">
//     <ToastContainer position="top-right" autoClose={3000} theme="colored" />
//     <h1 className="text-2xl font-bold text-center">Send Us Your Feedback</h1>

//     {/* Feedback Form */}
//     <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded p-6">
//       <input type="text" value={user?.uniqueId || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
//       <input type="text" value={user?.name || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
//       <input type="email" value={user?.email || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
//       <textarea
//         rows="5"
//         value={formMessage}
//         onChange={(e) => setFormMessage(e.target.value)}
//         required
//         className="w-full mt-1 p-2 border border-gray-300 rounded"
//         placeholder="Type your message here..."
//       />
//       <button
//         type="submit"
//         disabled={submitting}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
//       >
//         {submitting ? 'Submitting...' : 'Send'}
//       </button>
//     </form>

//     {/* Toggle Messages */}
//     <button
//       onClick={() => setShowMessages((prev) => !prev)}
//       className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
//     >
//       {showMessages ? 'Hide Conversation' : 'Show Conversation'}
//     </button>

//     {/* Messages */}
//     {showMessages && (
//       <div className="mt-4 border rounded bg-gray-100 max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
//         {loadingMessages ? (
//           <p>Loading messages...</p>
//         ) : messages.length === 0 ? (
//           <p>No messages found.</p>
//         ) : (
//           <>
//             {messages
//               .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//               .map((m) => (
//                 <div key={m._id || m.createdAt} className="flex flex-col max-w-xs break-words">
//                   {m.sender === 'user' && (
//                     <div className="p-3 rounded-lg bg-blue-500 text-white self-end ml-auto">
//                       {m.message}
//                       <div className="text-xs text-gray-200 mt-1 text-right opacity-70">
//                         {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                   )}
//                   {m.sender === 'admin' && (
//                     <div className="p-3 rounded-lg bg-gray-300 text-black self-start mt-1">
//                       {m.message}
//                       <div className="text-xs text-gray-700 mt-1 text-right opacity-70">
//                         {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//           </>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//     )}
//   </div>
// );
// }
import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../contexts/UserContext';
import axios from '../utils/userAxios';
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';

export default function Feedback() {
  const { user } = useUser();
  const [formMessage, setFormMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const messagesEndRef = useRef(null);
  const [socket, setSocket] = useState(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Socket.io setup
  useEffect(() => {
    if (!user?.uniqueId) return;

    const s = io(import.meta.env.VITE_BACKEND_URL);

    s.emit('joinRoom', user.uniqueId);

    s.on('newMessage', (msg) => setMessages(prev => [...prev, msg]));

    setSocket(s);
    return () => s.disconnect();
  }, [user?.uniqueId]);

  // Fetch conversation
  useEffect(() => {
    if (showMessages && user?.uniqueId) {
      fetchConversation(user.uniqueId);
    }
  }, [showMessages, user]);

  const fetchConversation = async (uniqueId) => {
    setLoadingMessages(true);
    try {
      const res = await axios.get(`/feedback/${uniqueId}`);
      setMessages(res.data.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to load messages');
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formMessage.trim()) return toast.error('Message is required');
    setSubmitting(true);

    try {
      const newMsg = {
        uniqueId: user.uniqueId,
        name: user.name,
        email: user.email,
        message: formMessage,
        sender: 'user',
        createdAt: new Date()
      };
      const res = await axios.post('/feedback', newMsg);
      const savedMsg = res.data.data || newMsg;
      setMessages(prev => [...prev, savedMsg]);
      setFormMessage('');
      socket?.emit('sendMessage', savedMsg);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto p-4 space-y-6">
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <h1 className="text-2xl font-bold text-center">Send Us Your Feedback</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow rounded p-6">
        <input type="text" value={user?.uniqueId || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
        <input type="text" value={user?.name || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
        <input type="email" value={user?.email || ''} disabled className="w-full mt-1 p-2 border border-gray-300 rounded bg-gray-100" />
        <textarea
          rows="5"
          value={formMessage}
          onChange={(e) => setFormMessage(e.target.value)}
          required
          className="w-full mt-1 p-2 border border-gray-300 rounded"
          placeholder="Type your message here..."
        />
        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
          {submitting ? 'Submitting...' : 'Send'}
        </button>
      </form>

      <button onClick={() => setShowMessages(prev => !prev)} className="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900">
        {showMessages ? 'Hide Conversation' : 'Show Conversation'}
      </button>

      {showMessages && (
        <div className="mt-4 border rounded bg-gray-100 max-h-96 overflow-y-auto p-4 flex flex-col gap-2">
          {loadingMessages ? <p>Loading messages...</p> :
            messages.length === 0 ? <p>No messages found.</p> :
              messages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map(m => (
                <div key={m._id || m.createdAt} className="flex flex-col max-w-xs break-words">
                  <div className={`p-3 rounded-lg ${m.sender === 'user' ? 'bg-blue-500 text-white self-end ml-auto' : 'bg-gray-300 text-black self-start mt-1'}`}>
                    {m.message}
                    <div className={`text-xs mt-1 text-right opacity-70 ${m.sender === 'user' ? 'text-gray-200' : 'text-gray-700'}`}>
                      {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
          }
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
