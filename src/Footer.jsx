import React from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-horizontal footer-center bg-base-300 shadow-sm text-base-content p-10">
      <div className="container mx-auto px-4">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            {/* ... your social icons code ... */}
          </div>
        </nav>
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by CollabeOne Ltd
          </p>
        </aside>
      </div>
    </footer>
  );
};

export default Footer;