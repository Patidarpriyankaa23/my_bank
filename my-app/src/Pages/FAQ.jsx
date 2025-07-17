import React from 'react';

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Q: How do I check my CIBIL score?</h3>
          <p>A: You can check it easily via our CIBIL report service...</p>
        </div>
        <div>
          <h3 className="font-semibold">Q: How can I link my mobile number with Aadhaar?</h3>
          <p>A: Follow the tutorial videos or visit the official UIDAI website.</p>
        </div>
        {/* Add more FAQs */}
      </div>
    </div>
  );
};

export default FAQ;
