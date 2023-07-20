import React from "react";
/* eslint no-unused-vars: "off" */

const Events = () => {
  return (
    <div id="aboutUs" className="p-8 xl:p-20 bg-black">
      <div className="mb-8">
        <h1 className="text-[40px] font-black text-white">
          ¡Conviértete en una persona local y haz nuevas conexiones donde sea que estés! Haz de cada lugar tu hogar.
        </h1>
        <p className="text-xl text-gray-500 text-white">
          Descubre nuevas personas que compartan tus mismos intereses a través de eventos presenciales. ¡Regístrate ahora de forma gratuita y crea tu cuenta!
        </p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <img
            src="playapicnic.jpg"
            className="w-full h-[600px] object-cover rounded-3xl"
          />
          <p className="text-gray-500 text-white">Evento - Julio 11, 2023</p>
          <h3 className="text-2xl font-bold text-white">Tarde de picnic en la playa</h3>
          <p className="text-gray-500 text-white">
            Tarde de picnic en la playa Valparaíso
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <img
              src="karaoke.jpg"
              className="w-full h-56 object-cover rounded-3xl"
            />
            <p className="text-gray-500 text-white">Evento - Junio 20, 2023</p>
            <h3 className="text-2xl font-bold text-white">Noche de Karaoke</h3>
            <p className="text-gray-500 text-white">
              Karaoke en el bar nomad locals
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="fiesta.jpg"
              className="w-full h-56 object-cover rounded-3xl"
            />
            <p className="text-gray-500 text-white">Evento - Octubre 31, 2023</p>
            <h3 className="text-2xl font-bold text-white">Fiesta de disfraces</h3>
            <p className="text-gray-500 text-white">
              Te esperamos en la mejor fiesta del año
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="futsal.jpg"
              className="w-full h-56 object-cover rounded-3xl"
            />
            <p className="text-gray-500 text-white">Evento - Julio 12, 2023</p>
            <h3 className="text-2xl font-bold text-white">Partido de futsal</h3>
            <p className="text-gray-500 text-white">
              Partido de la semana
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <img
              src="cometa.jpg"
              className="w-full h-56 object-cover rounded-3xl"
            />
            <p className="text-gray-500 text-white">Evento - Agosto 18, 2023</p>
            <h3 className="text-2xl font-bold text-white">Concurso de cometas</h3>
            <p className="text-gray-500 text-white">
              Concurso de cometas en el parque central
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;