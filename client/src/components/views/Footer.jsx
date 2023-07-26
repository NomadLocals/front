import React from "react";
import { RiInstagramLine, RiFacebookLine, RiTwitterLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Footer = () => {
  // Function to handle the "Contáctanos" button click
  const handleContactClick = () => {
    window.location.href = "mailto:nomad.locals01@gmail.com";
  };

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
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-2 md:p-3 bg-grey rounded-full"
          >
            <RiInstagramLine />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-black p-2 md:p-3 bg-grey rounded-full"
          >
            <RiFacebookLine />
          </a>
          <a
            href="https://www.twitter.com"
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
          <Link to="/about" className="text-gray-300 mt-1 md:mt-2 font-spartan hover:text-black transition-color text-xs md:text-sm">
            Sobre nosotros
          </Link>
          {/* Use the handleContactClick function for the onClick event */}
          <button
            type="button"
            className="bg-transparent hover:bg-transparent text-black font-spartan hover:text-blue py-1 px-1 border border-black hover:border-transparent rounded"
            onClick={handleContactClick}
          >
            Contáctanos
          </button>
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
