import React, {useState } from "react";
/* eslint no-unused-vars: "off" */

import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-[90vh] grid grid-cols-1 xl:grid-cols-8"
      style={{ backgroundColor: "#F1EFE7" }}
    >
      {/* Information */}
      <div className="md:col-span-5 flex items-center justify-center p-8 xl:p-16">
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl xl:text-7xl text-black font-bold xl:leading-[7.5rem]">
          
            <span
              className="text-black py-2 px-6 border-8 border-black relative inline-block"
              style={{ color: "#F1EFE7" }}
            >
              <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/5_n5vayy.png" alt="Logo" className="h-17" />
              <RiCheckboxBlankCircleFill className="text-black text-base absolute -left-5 -top-5 p-2 bg-grey rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-black text-base absolute -right-5 -top-5 p-2 bg-grey rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-black text-base absolute -right-5 -bottom-5 p-2 bg-grey rounded-full box-content" />
              <RiCheckboxBlankCircleFill className="text-black text-base absolute -left-5 -bottom-5 p-2 bg-grey rounded-full box-content" />
            </span>
          </h1>
          <p
            className="text-black text-2xl leading-[1.8rem] font-spartan"
            style={{ color: "#000000" }}
          >
            La plataforma donde la pasión une a las personas y las convierte en amistades auténticas. <br />
            Descubre conexiones genuinas basadas en intereses comunes donde sea estés.
          </p>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <button className="w-full xl:w-auto bg-black text-white font-quick py-2 px-8 rounded-xl text-xl"
            onClick={() => (window.location.href = "/sign-in")}
            >
              Únete a Nomad Locals
              
            </button>
          </div>
        </div>
      </div>
      {/* Image */}
      <div className="md:col-span-3 flex items-center justify-center relative">
        {/* Content image */}
        <div>
          <img
            src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690153676/Nomadlocals/Logos/1_z79ppu.png"
            className="w-[250px] h-[250px] md:w-[450px] md:h-[450px] object-cover xl:-mt-28"
          />
          <div className="relative bg-grey shadow-xl rounded-lg p-4 flex flex-col justify-center gap-2 max-w-[250px] mx-auto -mt-12">
            <div className="flex items-center">
              <img
                src="https://img.freepik.com/foto-gratis/audiencia-emocionada-viendo-fuegos-artificiales-confeti-divirtiendose-festival-musica-noche-copiar-espacio_637285-559.jpg"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300"
              />
              <img
                src="https://img.freepik.com/foto-gratis/salon-bodas-decorado-velas-mesas-redondas-centros-mesa_8353-10057.jpg"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300 -ml-4"
              />
              <img
                src="https://img.freepik.com/foto-gratis/vive-momentos-como_329181-8366.jpg"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300 -ml-4"
              />
              <img
                src="https://img.freepik.com/foto-gratis/herramientas-deportivas_53876-138077.jpg"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300 -ml-4"
              />
              <img
                src="https://img.freepik.com/foto-gratis/amigos-tiro-medio-fuegos-artificiales-noche_23-2148693844.jpg"
                className="w-10 h-10 object-cover rounded-full ring-2 ring-gray-300 -ml-4"
              />
            </div>
            <h2 className="text-xl font-spartan tracking-[1px] text-black">
              100 + Eventos
            </h2>
            <div className="absolute -right-12 -bottom-12 -z-10">
              <div className="relative">
                <div className="absolute left-0 top-0 bg-white w-14 h-14"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
