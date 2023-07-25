import React from "react";
/* eslint no-unused-vars: "off" */
import { RiInstagramLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-grey p-2 md:p-8 xl:p-12"> {/* Reducir el padding */}
      <div
        id="footer"
        className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-grey-500 pb-4" /* Reducir el padding */
      >
        <nav className="flex items-center gap-4">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiFacebookLine />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-3 bg-grey rounded-full" /* Reducir el padding */
          >
            <RiTwitterLine />
          </a>
        </nav>
      </div>
      <div className="mt-1">
        <nav className="-mt-1 flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="#"
            className="text-gray-300 mt-2 hover:text-black transition-color text-sm" /* Reducir el tamaño de fuente */
          >
            Terms of use
          </a>
          <a
            href="#"
            className="text-gray-300 mt-2 hover:text-black transition-color text-sm" /* Reducir el tamaño de fuente */
          >
            Privacy policy
          </a>
        </nav>
      </div>
      <div className="mt-8">
        <p className="text-gray-300 text-center text-sm"> {/* Reducir el tamaño de fuente */}
          © nomadlocals 2023 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
