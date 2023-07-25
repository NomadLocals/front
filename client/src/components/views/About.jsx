import React from "react";
/* eslint no-unused-vars: "off" */
import NavBar from "./NavBar.jsx";

const About = () => {
  return (
    <>
      <NavBar />
      <section className="relative pt-16 bg-grey min-h-screen">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
              <div className="relative flex flex-col min-w-0 break-words bg-black w-full mb-6 shadow-lg rounded-lg bg-pink-500">
                <img
                  alt="..."
                  src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153675/Nomadlocals/Logos/4_dpd03p.png"
                  className="w-full align-middle rounded-t-lg"
                />
                <blockquote className="relative p-8 mb-4">
                  <h4 className="text-xl font-bold text-grey">
                    ¿Quiénes somos? <br></br>
                  </h4>
                  <p className="text-md font-light mt-2 text-grey">
                    La plataforma donde la pasión une a las personas y las
                    convierte en amistades auténticas. <br />
                    Descubre conexiones genuinas basadas en intereses comunes
                    donde sea estés.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative bg-grey pt-8 pb-6 mt-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-black font-semibold py-1">
                  <a
                    href="/home"
                    className="text-black hover:text-blue"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    © nomadlocals 2023 - All Rights Reserved
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </>
  );
};
export default About;
