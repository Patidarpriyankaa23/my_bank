import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="pt-20 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">Why Choose Us</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          At MyBank, we prioritize your financial well-being with services designed around your needs. Here’s why you should choose us:
        </p>

        <ul className="list-disc list-inside text-gray-600 space-y-4">
          <li><strong>Trusted Expertise:</strong> Years of experience in delivering secure and reliable banking solutions.</li>
          <li><strong>Customer-Centric Approach:</strong> Tailored financial products to fit your lifestyle and goals.</li>
          <li><strong>Advanced Technology:</strong> Easy-to-use digital platforms for seamless banking anytime, anywhere.</li>
          <li><strong>Comprehensive Support:</strong> Dedicated team available to assist you at every step.</li>
          <li><strong>Transparency & Integrity:</strong> Clear terms and honest communication always.</li>
        </ul>
      </div>
    </section>
  );
}
