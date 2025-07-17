import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6">
        Have questions? Reach out to us!
      </p>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input type="text" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input type="email" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Message</label>
          <textarea className="w-full border border-gray-300 rounded p-2" rows="4"></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
