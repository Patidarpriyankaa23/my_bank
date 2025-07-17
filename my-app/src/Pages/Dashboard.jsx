
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';

import {
  FaPhoneAlt,
  FaEnvelope,
  FaUser,
  FaStar,
  FaTrash,
  FaSignOutAlt,
  FaPhone,
  FaCommentDots,
} from 'react-icons/fa';

export default function Dashboard() {
  const { user, logout, deleteProfile } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isUserPanel = location.pathname.includes('/user');

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
  ];

  const adminLinks = [
    { title: 'User Management', path: '/admin/users' },
    { title: 'System Settings', path: '/admin/settings' },
  ];

  const helpPaths = [
    { icon: <FaPhoneAlt />, action: () => (window.location = 'tel:+123456789') },
    { icon: <FaEnvelope />, action: () => (window.location = 'mailto:help@mybank.com') },
  ];

  return (
    <div className="pt-20 max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Top row: Welcome + Help Centre */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.name || 'Guest'}</h1>
          <p className="text-gray-500">
            (
            {isUserPanel
              ? user?.uniqueId
                ? `ID: ${user.uniqueId}`
                : 'User Dashboard'
              : 'Admin Dashboard'}
            )
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

      {/* Navigation Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {(isUserPanel ? userLinks : adminLinks).map((link, idx) => (
          <button
            key={idx}
            onClick={() => navigate(link.path)}
            className="flex justify-between items-center bg-white p-5 shadow rounded-lg hover:bg-gray-50 transition"
          >
            <span className="text-base font-medium">{link.title}</span>
            {link.icon}
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
              if (
                window.confirm(
                  'Are you sure you want to delete your profile? This action cannot be undone.'
                )
              ) {
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

