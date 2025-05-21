import React from 'react';
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900/80 backdrop-blur-md border-t border-gray-700 text-white px-6 py-8 shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 text-center">

        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm sm:text-base font-medium">
          <a className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">About Us</a>
          <a className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Contact</a>
          <a className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Jobs</a>
          <a className="hover:text-orange-400 transition-colors duration-200 cursor-pointer">Press Kit</a>
        </nav>

        {/* Socials */}
        <div className="flex justify-center gap-5 text-lg text-orange-400">
          <a className="hover:text-pink-500 transition-colors duration-200" href="#"><FaTwitter /></a>
          <a className="hover:text-pink-500 transition-colors duration-200" href="#"><FaFacebookF /></a>
          <a className="hover:text-pink-500 transition-colors duration-200" href="#"><FaLinkedinIn /></a>
          <a className="hover:text-pink-500 transition-colors duration-200" href="#"><FaGithub /></a>
        </div>

        {/* Copyright */}
        <p className="text-xs sm:text-sm text-gray-400">
          © {new Date().getFullYear()} — All rights reserved by <span className="text-orange-400 font-semibold">CollabOne Ltd</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
