import React, { useState } from 'react';

const menuItems = [
  { label: "Our Services" },
  { label: "About Us" },
  { label: "Why Choose Us" },
  { label: "FAQs" },
  { label: "Blogs" },
  { label: "Contact Us" },
];

export default function UserPanel({ user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-indigo-900 text-white p-6 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <h2 className="text-2xl font-bold mb-8">Menu</h2>
        <ul>
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className="block py-2 px-4 w-full text-left hover:bg-indigo-700 rounded"
                onClick={() => setSelectedMenu(item.label)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        {/* Top bar */}
        <header className="flex items-center justify-between bg-white p-4 shadow">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 rounded hover:bg-gray-200"
            >
              {/* Hamburger icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <img src="/logo.png" alt="Logo" className="h-10" />
            <div className="hidden md:block">
              <p className="font-semibold text-indigo-900">Mobile: {user.mobile}</p>
              <p className="text-indigo-700">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <img src={user.avatar || '/avatar-placeholder.png'} alt="Profile" className="h-10 w-10 rounded-full object-cover" />
          </div>
        </header>

        {/* Dashboard */}
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Hello, {user.name}</h1>

          {/* Profile & other sections */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Mobile: {user.mobile}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">My Customers</h2>
            {/* Fetch & display customers from backend */}
            <p>Customer list goes here...</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Bill History</h2>
            {/* Fetch & display bills */}
            <p>Bill history goes here...</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Feedback to Us</h2>
            {/* Form to send feedback */}
            <p>Feedback form goes here...</p>
          </section>

          {/* Add more sections as per your need */}

        </main>
      </div>
    </div>
  );
}
