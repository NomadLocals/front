import React from "react";
/* eslint no-unused-vars: "off" */

import {
  RiInstagramLine,
  RiFacebookLine,
  RiTwitterLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-blue p-8 xl:p-20">
      <div 
      id="footer"
      className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-grey-500 pb-8">
        {/* Logo */}
        <div className="w-1/6">
        <a className="text-1xl font-bold relative p-1 bg-blue">
        <img src="4.png" alt="Logo" className="h-14" />
        </a>
        </div>
        {/* Social media */}
        <nav className="flex items-center gap-4">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="block text-black p-4 bg-grey rounded-full">
            {" "}
            <RiInstagramLine />{" "}
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="block text-black p-4 bg-grey rounded-full">
            {" "}
            <RiFacebookLine />{" "}
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="block text-black p-4 bg-grey rounded-full">
            {" "}
            <RiTwitterLine />{" "}
          </a>
        </nav>
      </div>
      <div className="mt-8">
        <nav className="mt-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="#"
            className="text-gray-300 mt-4 hover:text-black transition-colors"
          >
            About Us
          </a>
          <a
            href="#"
            className="text-gray-300 mt-4 hover:text-black transition-color"
          >
            Terms of use
          </a>
          <a
            href="#"
            className="text-gray-300 mt-4 hover:text-black transition-color"
          >
            Privacy policy
          </a>
          <button
            type="button"
            className="font-semibold py-2 px-6 bg-grey text-black rounded-xl">
            Contáctanos
          </button>
        </nav>
      </div>
      <div className="mt-20">
        <p className="text-gray-300 text-center">
          © nomadlocals 2023 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
