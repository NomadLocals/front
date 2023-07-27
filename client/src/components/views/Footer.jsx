import React from "react";
/* eslint no-unused-vars: "off" */
import { RiInstagramLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";

const Footer = () => {
  // Function to handle the "Contáctanos" button click
  const handleContactClick = () => {
    window.location.href = "mailto:nomad.locals01@gmail.com";
  };

  return (
    <footer className="bg-black text-grey p-2 md:p-4 xl:p-6 border-t-2 border-blue">
      <div className="text-center">
        <img
          src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153675/Nomadlocals/Logos/4_dpd03p.png"
          alt="logo"
          className="h-8 mx-auto mt-4"
        />
      </div>
      <div
        id="footer"
        className="flex flex-col md:flex-row items-center justify-center"
      >
        <nav className="flex items-center mb-1 text-center gap-4 max-w-max mx-auto">
          <a
            href="https://www.instagram.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-1 md:p-2 bg-grey rounded-full"
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-1 md:p-2 bg-grey rounded-full"
          >
            <RiFacebookLine />
          </a>
          <a
            href="https://www.twitter.com/nomadlocals"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-1 md:p-2 bg-grey rounded-full"
          >
            <RiTwitterLine />
          </a>
        </nav>
      </div>
      <div className="mt-1 text-center inline">
        <nav className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button
            type="button"
            className="bg-transparent hover:bg-transparent text-grey font-spartan hover:text-blue -py-1 px-2 hover:border-transparent rounded"
            onClick={handleContactClick}
          >
            Contáctanos
          </button>
        </nav>
      </div>
      <div className="mt-2">
        <p className="text-grey text-center text-xs md:text-sm">
          &copy; nomadlocals 2023 - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
