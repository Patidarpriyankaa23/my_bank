import React from 'react';

export default function AboutUs() {
  return (
    <main className="pt-20 px-6 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 mb-6">About Us</h1>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Welcome to MyBank — your trusted partner in financial solutions. Since our inception, we have been committed to empowering individuals and businesses alike through innovative, secure, and accessible banking services.
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Our mission is to simplify banking with technology-driven solutions that put you in control of your financial future. With a dedicated team of professionals and customer-first philosophy, we strive to offer unparalleled service quality.
        </p>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            To be the most trusted, innovative, and customer-centric bank that enables financial well-being for all.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Integrity:</strong> We operate with honesty and transparency.</li>
            <li><strong>Innovation:</strong> Continuously improving with cutting-edge technology.</li>
            <li><strong>Customer Focus:</strong> Your satisfaction is our priority.</li>
            <li><strong>Security:</strong> Safeguarding your information with utmost care.</li>
            <li><strong>Inclusivity:</strong> Banking solutions for everyone.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
