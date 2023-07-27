import React from "react";
import { RiInstagramLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-grey p-4 md:p-8 xl:p-12">
      <div className="text-center mb-4 border-t">
        <img
          src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/5_n5vayy.png"
          alt="logo"
          className="h-12 mx-auto"
        />
      </div>
      <div
        id="footer"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        <nav className="flex items-center text-center gap-4 max-w-max mx-auto">
          <a
            href="https://www.instagram.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-2 md:p-3 bg-grey rounded-full"
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-2 md:p-3 bg-grey rounded-full"
          >
            <RiFacebookLine />
          </a>
          <a
            href="https://www.twitter.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-2 md:p-3 bg-grey rounded-full"
          >
            <RiTwitterLine />
          </a>
        </nav>
      </div>
      <div className="mt-1">
        <nav className="-mt-1 flex flex-col md:flex-row items-center justify-between gap-4">
          <a
            href="#"
            className="text-gray-300 mt-1 md:mt-2 hover:text-black transition-color text-xs md:text-sm"
          >
            Terms of use
          </a>
          <a
            href="#"
            className="text-gray-300 mt-1 md:mt-2 hover:text-black transition-color text-xs md:text-sm"
          >
            Privacy policy
          </a>
        </nav>
      </div>
      <div className="mt-4">
        <p className="text-gray-300 text-center text-xs md:text-sm">
          &copy; nomadlocals 2023 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
