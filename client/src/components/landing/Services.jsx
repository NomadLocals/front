import React from "react";
/* eslint no-unused-vars: "off" */

import { GiThreeFriends } from "react-icons/gi";
import { GrMail, GrSend } from "react-icons/gr";
import { FaSearchLocation } from "react-icons/fa";

const Services = () => {
  return (
    <div
      id="services"
      className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 p-8 md:p-12 xl:p-20 bg-grey">
      <div className="flex flex-col gap-4">
        <h1 className="text-[40px] font-bold text-black">¿Cómo podemos ayudarte?</h1>
        <p className="text-[20px] text-black">
          ¡Envíanos tus dudas! Estaremos encantados de ayudarte.
        </p>
        <form className="w-full">
          <div className="relative">
            <GrMail className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 text-xl" />
            <input
              type="text"
              className="w-full bg-white py-4 pl-10 pr-36 rounded-xl outline-none"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="absolute font-semibold py-2 px-6 bg-blue text-white rounded-xl top-1/2 -translate-y-1/2 right-2"
            >
            <GrSend className="inline" />
            </button>
          </div>
        </form>
      </div>
      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <FaSearchLocation className="text-4xl p-2 bg-gray-500 text-black box-content rounded-xl" />
          <h3 className="text-[20px] font-bold text-black">Eventos</h3>
          <p className="text-gray-500 text-black">
            Podrás buscar eventos a los cuales unirte y también puedes crear nuevos eventos.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <GiThreeFriends className="text-4xl p-2 bg-gray-500 text-black box-content rounded-xl" />
          <h3 className="text-[20px] font-bold text-black">Hacer amistades</h3>
          <p className="text-gray-500 text-black">
            Chatea con las personas interesadas en el evento y haz nuevas amistades.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;
