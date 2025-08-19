// import React, { useState, useEffect, useRef } from 'react';
// import axios from "../../utils/userAxios";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const SendMessage = () => {
//   const [form, setForm] = useState({ name: '', email: '', uniqueId: '', message: '' });
//   const [loading, setLoading] = useState(false);
//   const [messages, setMessages] = useState([]); // user-specific threads
//   const [activeThread, setActiveThread] = useState(null);
//   const [conversation, setConversation] = useState([]); 
//   const [reply, setReply] = useState('');
//   const chatEndRef = useRef(null);

//   // Fetch profile & only user-specific messages
//   useEffect(() => {
//     const fetchProfileAndMessages = async () => {
//       try {
//         const res = await axios.get('/profile/me');
//         const { name, email, uniqueId } = res.data;
//         setForm({ ...form, name, email, uniqueId });

//         // Only messages belonging to this user
//         const msgRes = await axios.get(`/important?type=send-message&uniqueId=${uniqueId}`);
//         setMessages(msgRes.data?.data || []);
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to load profile/messages");
//       }
//     };
//     fetchProfileAndMessages();
//   }, []);

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.message.trim()) return toast.warn("Message cannot be empty");
//     setLoading(true);
//     try {
//       const res = await axios.post('/contact/message', form);
//       toast.success(res.data.message || "Message sent!");
//       const newMsg = {
//         _id: Date.now(),
//         message: form.message,
//         createdAt: new Date().toISOString(),
//         uniqueId: form.uniqueId,
//       };
//       setMessages([newMsg, ...messages]);
//       setForm({ ...form, message: '' });
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to send message");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openThread = async (msg) => {
//     setActiveThread(msg);
//     try {
//       const res = await axios.get(`/important/${msg.uniqueId}?type=send-message`);
//       setConversation(res.data?.data || []);
//       setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
//     } catch {
//       toast.error("Failed to load conversation");
//     }
//   };

//   const sendReply = async () => {
//     if (!reply.trim() || !activeThread) return;
//     try {
//       const res = await axios.post(`/important/${activeThread.uniqueId}/reply?type=send-message`, { message: reply });
//       setConversation([...conversation, res.data?.data]);
//       setReply('');
//       setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
//     } catch {
//       toast.error("Failed to send reply");
//     }
//   };

//   const formatStamp = (d) => {
//     const date = new Date(d);
//     return `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-6">
//       <h2 className="text-3xl font-bold text-center text-gray-800">Send a Message</h2>

//       {/* Send Message Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="name" value={form.name} disabled className="w-full p-2 border rounded bg-gray-100" />
//         <input name="email" value={form.email} disabled className="w-full p-2 border rounded bg-gray-100" />
//         <input name="uniqueId" value={form.uniqueId} disabled className="w-full p-2 border rounded bg-gray-100" />
//         <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400" required />
//         <button type="submit" disabled={loading} className={`w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
//           {loading ? 'Sending...' : 'Send'}
//         </button>
//       </form>

//       {/* Message Threads */}
//       <div className="space-y-3">
//         {messages.map((msg, index) => (
//           <div key={msg._id} onClick={() => openThread(msg)}
//             className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer relative transition-all duration-200">
//             <div className="font-semibold">{msg.message}</div>
//             <div className="text-xs text-gray-500">{formatStamp(msg.createdAt)}</div>
//           </div>
//         ))}
//       </div>

//       {/* Active Thread Conversation */}
//       {activeThread && (
//         <div className="border rounded-lg p-4 bg-white mt-4 flex flex-col gap-3 max-h-96 overflow-y-auto shadow-inner">
//           <h3 className="font-bold mb-2 text-gray-700">Conversation</h3>
//           {conversation.map((m) => (
//             <div key={m._id} className={`p-2 rounded-lg max-w-[80%] ${m.sender === 'admin' ? 'bg-blue-100 text-blue-900 self-end' : 'bg-gray-100 text-gray-800 self-start'}`}>
//               <div>{m.message}</div>
//               <div className="text-[10px] text-gray-400 text-right mt-1">{formatStamp(m.createdAt)}</div>
//             </div>
//           ))}
//           <div ref={chatEndRef}></div>

//           {/* Reply Box */}
//           <div className="flex gap-2 mt-3">
//             <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Type your reply…" className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
//             <button onClick={sendReply} className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700">Reply</button>
//           </div>
//         </div>
//       )}

//       <ToastContainer position="bottom-right" autoClose={3000} />
//     </div>
//   );
// };

// export default SendMessage;


import React, { useState, useEffect, useRef } from 'react';
import axios from "../../utils/userAxios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SendMessage = () => {
  const [form, setForm] = useState({ name: '', email: '', uniqueId: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [replyTexts, setReplyTexts] = useState({});
  const chatEndRefs = useRef({});

  // Fetch current user profile & messages
  useEffect(() => {
    const fetchProfileAndMessages = async () => {
      try {
        const res = await axios.get('/profile/me'); // get logged-in user
        const { name, email, uniqueId } = res.data;
        setForm({ name, email, uniqueId, message: '' });

        // Fetch only messages for this user
        const msgRes = await axios.get(`/important?type=send-message&uniqueId=${uniqueId}`);
        const userMessages = (msgRes.data?.data || []).map(m => ({
          ...m,
          conversation: m.conversation || [],
          showConversation: false
        }));
        setMessages(userMessages);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile/messages");
      }
    };
    fetchProfileAndMessages();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.message.trim()) return toast.warn("Message cannot be empty");
    setLoading(true);

    try {
      const res = await axios.post('/contact/message', {
        name: form.name,
        email: form.email,
        uniqueId: form.uniqueId,
        message: form.message
      });

      const newMsg = res.data?.data;
      setMessages(prev => [newMsg, ...prev]);
      setForm({ ...form, message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const toggleConversation = (msgId) => {
    setMessages(prev =>
      prev.map(m => m._id === msgId ? { ...m, showConversation: !m.showConversation } : m)
    );
  };

  const sendReply = async (msgId) => {
    const reply = replyTexts[msgId];
    if (!reply || !reply.trim()) return;

    try {
      const res = await axios.post(`/important/${msgId}/reply?type=send-message`, { message: reply });
      const newReply = res.data?.data || {
        _id: Date.now(),
        message: reply,
        sender: 'user',
        createdAt: new Date().toISOString()
      };

      setMessages(prev =>
        prev.map(m =>
          m._id === msgId
            ? { ...m, conversation: [...m.conversation, newReply] }
            : m
        )
      );

      setReplyTexts(prev => ({ ...prev, [msgId]: '' }));
      setTimeout(() => chatEndRefs.current[msgId]?.scrollIntoView({ behavior: 'smooth' }), 50);
    } catch {
      toast.error("Failed to send reply");
    }
  };

  const formatStamp = (d) => {
    const date = new Date(d);
    return `${date.toLocaleDateString()} · ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800">Send a Message</h2>

      {/* Send Message Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" value={form.name} disabled className="w-full p-2 border rounded bg-gray-100" />
        <input name="email" value={form.email} disabled className="w-full p-2 border rounded bg-gray-100" />
        <input name="uniqueId" value={form.uniqueId} disabled className="w-full p-2 border rounded bg-gray-100" />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-red-900 text-white py-2 rounded-lg hover:bg-red-700 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {/* Messages Boxes */}
      <div className="space-y-3 mt-4 max-h-[500px] overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={msg._id} className="relative border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-all duration-200">
            <div className="font-semibold">{msg.message}</div>
            <div className="text-xs text-gray-500">{formatStamp(msg.createdAt)}</div>

            <button
              onClick={() => toggleConversation(msg._id)}
              className="mt-2 text-sm text-green-600 hover:underline"
            >
              {msg.showConversation ? 'Hide Conversation' : 'Show Conversation'}
            </button>

            {/* Conversation */}
            {msg.showConversation && (
              <div className="flex flex-col gap-3 mt-3 max-h-96 overflow-y-auto">
                {msg.conversation.map(m => (
                  <div
                    key={m._id}
                    className={`p-2 rounded-lg max-w-[80%] ${m.sender === 'admin' ? 'bg-blue-100 text-blue-900 self-end' : 'bg-gray-100 text-gray-800 self-start'}`}
                  >
                    <div>{m.message}</div>
                    <div className="text-[10px] text-gray-400 text-right mt-1">{formatStamp(m.createdAt)}</div>
                  </div>
                ))}

                <div ref={el => chatEndRefs.current[msg._id] = el}></div>

                <div className="flex gap-2 mt-3">
                  <input
                    value={replyTexts[msg._id] || ''}
                    onChange={(e) => setReplyTexts(prev => ({ ...prev, [msg._id]: e.target.value }))}
                    placeholder="Type your reply…"
                    className="flex-1 p-2 border rounded-lg"
                  />
                  <button
                    onClick={() => sendReply(msg._id)}
                    className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-700"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SendMessage;




