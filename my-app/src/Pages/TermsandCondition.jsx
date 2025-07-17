import React from 'react';

const TermsAndConditions = () => (
  <div className="max-w-4xl mx-auto px-6 py-12">
    <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

    <p className="text-gray-700 mb-4">
      Welcome to MyBank. By accessing or using our services, website, or application, you agree to be bound by the following terms and conditions. Please read them carefully.
    </p>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Use of Our Services</h2>
      <p className="text-gray-700">
        You must be at least 18 years old or of legal age in your jurisdiction to use our services. You agree to provide accurate and complete information during registration or any service request.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">2. User Responsibilities</h2>
      <p className="text-gray-700">
        You are responsible for maintaining the confidentiality of your account information. Unauthorized use of your credentials must be reported to us immediately. You agree not to use our services for any unlawful or fraudulent purposes.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">3. Intellectual Property</h2>
      <p className="text-gray-700">
        All content on this website, including logos, text, images, and software, is the property of MyBank or its licensors and is protected by applicable intellectual property laws. Unauthorized use is prohibited.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Limitation of Liability</h2>
      <p className="text-gray-700">
        MyBank shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. We do not guarantee the accuracy or availability of any third-party links provided on our site.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">5. Third-Party Services</h2>
      <p className="text-gray-700">
        Our platform may include links to third-party sites or services. We are not responsible for the content, policies, or practices of these third parties.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Changes to Terms</h2>
      <p className="text-gray-700">
        We may update these terms from time to time without prior notice. Continued use of the service after changes means you agree to the revised terms. Please check this page periodically.
      </p>
    </section>

    <section className="mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Governing Law</h2>
      <p className="text-gray-700">
        These Terms & Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
      </p>
    </section>

    <section>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Contact Us</h2>
      <p className="text-gray-700">
        If you have any questions about these Terms & Conditions, please contact us at <a href="mailto:support@mybank.com" className="text-blue-600 hover:underline">support@mybank.com</a>.
      </p>
    </section>
  </div>
);

export default TermsAndConditions;
