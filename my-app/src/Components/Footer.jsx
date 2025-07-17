import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">

        {/* Row 1: Logo + Contact Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">MyBank</h2>
            <p className="text-gray-400">Empowering your financial future.</p>
          </div>
          <div className="space-y-2 text-gray-300">
            <p><strong>Mobile:</strong> +91 1234567899</p>
            <p><strong>Address:</strong> 123 Financial Avenue, Mumbai, India</p>
            <p><strong>Email:</strong> support@mybank.com</p>
          </div>
        </div>

        {/* Row 2: Useful Links */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-300">Useful Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:underline text-gray-300">About Us</Link></li>
              <li><Link to="/whychooseus" className="hover:underline text-gray-300">Why Choose Us</Link></li>
              <li><Link to="/faq" className="hover:underline text-gray-300">FAQ’s</Link></li>
               <li><Link to="/blogs" className="hover:underline text-gray-300">Blogs</Link></li>
            </ul>
          </div>
        </div>

        {/* Row 3: Social Icons & Legal Links */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaYoutube /></a>
          </div>
          <div className="text-sm text-gray-400 flex flex-col md:flex-row items-center gap-2">
            <span>© {new Date().getFullYear()} MyBank. All rights reserved.</span>
            <span className="hidden md:inline">|</span>
            <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            <span className="hidden md:inline">|</span>
            <Link to="/terms" className="hover:underline">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
