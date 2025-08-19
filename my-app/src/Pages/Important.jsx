import React, { useEffect, useMemo, useState, useRef } from "react";
import adminAxios from "../utils/axiosadmin";
import { toast } from "react-toastify";

export default function Important() {
  const TABS = [
    { key: "feedback", label: "Feedback", emoji: "💬" },
    { key: "send-message", label: "Send Message", emoji: "✉️" },
    { key: "callback", label: "Callback", emoji: "📞" },
  ];

  const [tab, setTab] = useState("feedback");
  const [threads, setThreads] = useState([]);
  const [loadingThreads, setLoadingThreads] = useState(false);
  const [selected, setSelected] = useState(null);
  const [conversation, setConversation] = useState([]);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const dateStr = (d) =>
    new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const timeStr = (d) =>
    new Date(d).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: true });
  const stamp = (d) => `${dateStr(d)} · ${timeStr(d)}`;

  const headerTitle = useMemo(() => {
    const current = TABS.find((t) => t.key === tab);
    return current ? `${current.emoji} ${current.label}` : "Inbox";
  }, [tab]);

  // Load threads
  const loadThreads = async () => {
    setLoadingThreads(true);
    try {
      const res = await adminAxios.get(`/important?type=${tab}`);
      setThreads(res.data?.data || []);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load threads");
    } finally {
      setLoadingThreads(false);
    }
  };

  // Open conversation
  const openConversation = async (t) => {
    if (!t?.uniqueId) return;
    setSelected(t);
    try {
      const res = await adminAxios.get(`/important/${t.uniqueId}?type=${tab}`);
      setConversation(res.data?.data || []);
      if (inputRef.current) inputRef.current.focus();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to load conversation");
    }
  };

  // Send reply
  const sendReply = async () => {
    if (!reply.trim()) return toast.warn("Reply cannot be empty");
    if (!selected?.uniqueId) return;
    setSending(true);

    try {
      const res = await adminAxios.post(`/important/${selected.uniqueId}/reply?type=${tab}`, {
        message: reply.trim(),
      });

      const msg = res.data?.data;
      setConversation((prev) => [
        ...prev,
        {
          _id: msg._id,
          sender: msg.sender || "admin",
          message: msg.message,
          createdAt: msg.createdAt || new Date().toISOString(),
        },
      ]);
      setTimeout(() => {
        if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 50);
      setReply("");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send reply");
    } finally {
      setSending(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [conversation]);

  // Polling for real-time updates
  useEffect(() => {
    if (!selected) return;
    const interval = setInterval(async () => {
      try {
        const res = await adminAxios.get(`/important/${selected.uniqueId}?type=${tab}`);
        setConversation((prev) => {
          const newMsgs = res.data?.data || [];
          const existingIds = prev.map((m) => m._id);
          const merged = [...prev, ...newMsgs.filter((m) => !existingIds.includes(m._id))];
          return merged.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        });
      } catch { }
    }, 5000);
    return () => clearInterval(interval);
  }, [selected, tab]);

  useEffect(() => {
    loadThreads();
    setSelected(null);
    setConversation([]);
  }, [tab]);

  useEffect(() => {
    const interval = setInterval(loadThreads, 10000);
    return () => clearInterval(interval);
  }, [tab]);

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Admin Inbox</h1>
          <p className="text-sm text-gray-500">Manage user conversations by type and reply in real time.</p>
        </div>
        <span className="hidden sm:inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
          {headerTitle}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`group w-full rounded-2xl border transition-all ${tab === t.key ? "border-blue-600 bg-blue-50 shadow-sm" : "border-gray-200 bg-white hover:shadow"
              }`}
          >
            <div className="flex items-center gap-4 p-4">
              <div className={`grid h-11 w-11 place-items-center rounded-xl text-lg ${tab === t.key ? "bg-blue-100" : "bg-gray-100"}`}>
                <span>{t.emoji}</span>
              </div>
              <div className="flex-1 text-left">
                <div className={`text-sm font-semibold ${tab === t.key ? "text-blue-700" : "text-gray-800"}`}>{t.label}</div>
                <div className="text-xs text-gray-500">Click to view threads</div>
              </div>
              <div className={`hidden sm:block rounded-full px-2 py-1 text-[11px] ${tab === t.key ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                {tab === t.key ? "Active" : "View"}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Threads + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Threads */}
        <div className="lg:col-span-1 flex flex-col overflow-hidden rounded-2xl border bg-white">
          <div className="flex items-center justify-between border-b p-3">
            <div className="font-semibold">{headerTitle} Threads</div>
            <button onClick={loadThreads} className="text-xs rounded-md border px-2 py-1 hover:bg-gray-50">Refresh</button>
          </div>
          <div className="max-h-[70vh] overflow-y-auto">
            {loadingThreads ? (
              <EmptyState title="Loading…" subtitle="Fetching latest threads" />
            ) : threads.length === 0 ? (
              <EmptyState title="No threads" subtitle="New conversations will appear here" />
            ) : (
              <ul className="divide-y">
                {threads.map((t) => (
                  <li key={`${t.uniqueId}-${t.createdAt}`}>
                    <ThreadItem
                      active={selected?.uniqueId === t.uniqueId}
                      name={t.name || "Unknown"}
                      uniqueId={t.uniqueId}
                      message={t.latestMessage}
                      date={dateStr(t.createdAt)}
                      time={timeStr(t.createdAt)}
                      onClick={() => openConversation(t)}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Chat panel */}
        <div className="lg:col-span-2 flex min-h-[60vh] flex-col overflow-hidden rounded-2xl border bg-white">
          <div className="flex items-center justify-between gap-3 border-b p-4">
            {selected ? (
              <div className="min-w-0">
                <div className="truncate font-semibold leading-tight">{selected.name || "Unknown"}</div>
                <div className="truncate text-xs text-gray-500">{selected.uniqueId}</div>
              </div>
            ) : (
              <div className="text-sm text-gray-500">Select a thread from the left to start chatting</div>
            )}
          </div>

          <div id="chat-scroll-wrap" className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 flex flex-col gap-3">
            {!selected ? (
              <EmptyState title="No conversation selected" subtitle="Pick a thread from the left panel" />
            ) : conversation.length === 0 ? (
              <EmptyState title="No messages yet" subtitle="Send the first reply to start the conversation" compact />
            ) : (
              conversation.map((m) => <ChatBubble key={m._id} sender={m.sender} message={m.message} stamp={stamp(m.createdAt)} />)
            )}
            <div ref={chatEndRef}></div>
          </div>

          {/* Composer */}
          <div className="border-t bg-white p-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply…"
                id="reply-input"
                className="flex-1 rounded-xl border px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button onClick={sendReply} disabled={sending || !selected} className="rounded-xl bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/*** UI Components ***/
const EmptyState = ({ title, subtitle, compact }) => (
  <div className={`grid place-items-center p-6 text-center ${compact ? "py-12" : ""}`}>
    <div className="text-gray-400 font-medium">{title}</div>
    <div className="text-xs text-gray-400">{subtitle}</div>
  </div>
);

const ThreadItem = ({ active, name, message, date, onClick }) => (
  <button onClick={onClick} className={`group flex w-full cursor-pointer flex-col gap-1 p-3 text-left ${active ? "bg-blue-50" : "hover:bg-gray-50"}`}>
    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold truncate">{name}</span>
      <span className="text-[11px] text-gray-500">{date}</span>
    </div>
    <div className="text-xs text-gray-500 truncate">{message}</div>
  </button>
);

const ChatBubble = ({ sender, message, stamp }) => (
  <div className={`flex ${sender === "admin" ? "justify-end" : "justify-start"} items-end gap-2`}>
    {sender !== "admin" && <div className="h-6 w-6 rounded-full bg-gray-300"></div>}
    <div className={`max-w-[70%] rounded-xl p-3 text-sm ${sender === "admin" ? "bg-blue-100 text-blue-900" : "bg-gray-100 text-gray-800"}`}>
      <div>{message}</div>
      <div className="mt-1 text-right text-[10px] text-gray-400">{stamp}</div>
    </div>
    {sender === "admin" && <div className="h-6 w-6 rounded-full bg-blue-500"></div>}
  </div>
);
