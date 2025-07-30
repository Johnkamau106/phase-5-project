import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Hope Haven description and social media */}
        <div>
          <h3 className="text-xl font-extrabold mb-5">Hope Haven</h3>
          <p className="mb-5 text-gray-400">
            Connecting compassionate donors with children in need since 2010.
          </p>
          <div className="flex space-x-5 text-gray-400">
            <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-600">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 10-11.5 9.9v-7h-2v-3h2v-2c0-2 1-3 3-3h2v3h-2c-.5 0-1 .5-1 1v1h3l-1 3h-2v7A10 10 0 0022 12z"/></svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-400">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.14 9.14 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.13A12.8 12.8 0 013 4.15a4.52 4.52 0 001.4 6.04 4.48 4.48 0 01-2.05-.57v.06a4.52 4.52 0 003.63 4.43 4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.22 3.14A9 9 0 013 19.54a12.7 12.7 0 006.92 2"/></svg>
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-500">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 3a1 1 0 110 2 1 1 0 010-2zm-5 2a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z"/></svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-extrabold mb-5">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/orphanages" className="hover:text-white">Orphanages</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Ways to Help */}
        <div>
          <h3 className="text-xl font-extrabold mb-5">Ways to Help</h3>
          <ul className="space-y-3">
            <li><Link to="/donate" className="hover:text-white">Donate</Link></li>
            <li><Link to="/sponsor" className="hover:text-white">Sponsor a Child</Link></li>
            <li><Link to="/volunteer" className="hover:text-white">Volunteer</Link></li>
            <li><Link to="/fundraise" className="hover:text-white">Fundraise</Link></li>
            <li><Link to="/corporate" className="hover:text-white">Corporate Partnerships</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-extrabold mb-5">Newsletter</h3>
          <form className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 rounded-l bg-gray-800 text-gray-200 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-5 rounded-r"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
