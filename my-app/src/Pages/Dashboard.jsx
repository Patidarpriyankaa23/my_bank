import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';
import {
  FaWhatsapp,
  FaEnvelope,
  FaUser,
  FaStar,
  FaTrash,
  FaSignOutAlt,
  FaPhone,
  FaCommentDots,
  FaHome,
  FaBullhorn,
} from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout, deleteProfile } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isUserPanel = location.pathname.includes('/user');

  // State for Add to Home Screen prompt
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [msg, setMsg] = useState(''); // inline message for laptop test

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleAddToHomeScreen = () => {
    if (window.innerWidth < 768) {
      // Mobile/Tablet mode
      if (!deferredPrompt) {
        setMsg('⚠️ Add to Home Screen is not supported on this device/browser.');
        setTimeout(() => setMsg(''), 3000);
        return;
      }
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('✅ App added to Home Screen');
          setMsg('✅ App added to Home Screen!');
        } else {
          console.log('❌ User dismissed the prompt');
          setMsg('❌ You dismissed the prompt.');
        }
        setTimeout(() => setMsg(''), 3000);
        setDeferredPrompt(null);
      });
    } else {
      // Laptop/Desktop mode
      console.log('🔹 Add to Home Screen clicked (Laptop Test Mode)');
      setMsg('⚠️ Laptop Test: PWA prompt would appear on mobile.');
      setTimeout(() => setMsg(''), 3000);
    }
  };

  const userLinks = [
    { title: 'My Profile', path: '/user/profile', icon: <FaUser /> },
    { title: 'My Customers', path: '/user/customers' },
    { title: 'Bill History', path: '/user/bill-history' },
    { title: 'Share with Other Professionals', path: '/user/share' },
    { title: 'Rate & Reviews on Google', path: '/user/rate', icon: <FaStar className="text-yellow-400" /> },
    { title: 'Feedback to Us', path: '/user/feedback' },
    { title: 'Raise a Dispute to Bureau', path: '/user/dispute' },
    { title: 'Request a Callback', path: '/user/request-callback', icon: <FaPhone className="text-blue-500" /> },
    { title: 'Send Message', path: '/user/send-message', icon: <FaCommentDots className="text-green-600" /> },
    { title: 'Add to Home Screen', action: handleAddToHomeScreen, icon: <FaHome className="text-purple-500" /> },
    { title: 'Promote Your Brand', subtitle: 'on our website', path: '/user/promote-brand', icon: <FaBullhorn className="text-pink-500" /> },
  ];

  const adminLinks = [
    { title: 'User Management', path: '/admin/users' },
    { title: 'System Settings', path: '/admin/settings' },
  ];

  const helpPaths = [
    { icon: <FaWhatsapp />, action: () => window.open('https://wa.me/123456789', '_blank') },

    { icon: <FaEnvelope />, action: () => (window.location = 'mailto:help@mybank.com') },
  ];

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top row: Welcome + Help Centre */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Guest'}</h1>
          <p className="text-gray-500">
            {isUserPanel
              ? user?.uniqueId
                ? `ID: ${user.uniqueId}`
                : 'User Dashboard'
              : 'Admin Dashboard'}
          </p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-semibold mb-2">Help Centre</h2>
          <div className="flex gap-3">
            {helpPaths.map((p, i) => (
              <button
                key={i}
                onClick={p.action}
                className="bg-blue-600 text-black p-3 rounded-full hover:bg-blue-700"
              >
                {p.icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Inline message for laptop test */}
      {msg && <p className="text-blue-600 mt-2">{msg}</p>}

      {/* Navigation Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(isUserPanel ? userLinks : adminLinks).map((link, idx) => (
          <button
            key={idx}
            onClick={() => link.path ? navigate(link.path) : link.action && link.action()}
            className="flex flex-col justify-between items-start bg-white p-5 shadow rounded-lg hover:bg-gray-50 transition"
          >
            <div className="flex justify-between w-full items-center">
              <span className="text-base font-medium">{link.title}</span>
              {link.icon}
            </div>
            {link.subtitle && <span className="text-sm text-gray-500 mt-1">{link.subtitle}</span>}
          </button>
        ))}
      </div>

      {/* Logout & Delete */}
      {user && (
        <div className="flex gap-4 justify-center mt-6">
          <button
            onClick={() => logout()}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <FaSignOutAlt /> Logout
          </button>
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
                deleteProfile();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-black px-4 py-2 rounded flex items-center gap-2"
          >
            <FaTrash /> Delete Profile
          </button>
        </div>
      )}
    </div>
  );
}
