import React from 'react';

const PrivacyPolicy = () => (
  <div className="max-w-4xl mx-auto px-6 py-12 text-gray-700">
    <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

    <p className="mb-4">
      At <strong>MyBank</strong>, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
    <ul className="list-disc list-inside mb-4">
      <li>Personal information: Name, email, phone number, address, etc.</li>
      <li>Account-related data: Transaction history, preferences, login details.</li>
      <li>Technical data: IP address, browser type, device information, cookies.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
    <ul className="list-disc list-inside mb-4">
      <li>To provide and improve our services.</li>
      <li>To communicate important updates and offers.</li>
      <li>To comply with legal obligations and prevent fraud.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Security</h2>
    <p className="mb-4">
      We implement advanced security measures such as encryption, firewalls, and secure servers to protect your data. However, no method of transmission over the internet is 100% secure.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Information</h2>
    <p className="mb-4">
      We do not sell or rent your personal data. We may share your information with trusted third parties for essential services (e.g., payment processors) under strict confidentiality agreements.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
    <ul className="list-disc list-inside mb-4">
      <li>Access your data.</li>
      <li>Request correction or deletion.</li>
      <li>Withdraw consent at any time.</li>
    </ul>

    <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies</h2>
    <p className="mb-4">
      We use cookies to enhance your browsing experience and analyze site traffic. You can manage cookie settings in your browser.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
    <p className="mb-4">
      We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised effective date.
    </p>

    <h2 className="text-xl font-semibold mt-6 mb-2">8. Contact Us</h2>
    <p>
      If you have any questions or concerns regarding this policy, please contact us at <a href="mailto:support@mybank.com" className="text-blue-600 underline">support@mybank.com</a>.
    </p>
  </div>
);

export default PrivacyPolicy;
