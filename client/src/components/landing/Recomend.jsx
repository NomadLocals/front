import React from "react";
/* eslint no-unused-vars: "off" */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Recomend = () => {
  return (
    <div className="bg-grey p-8 flex flex-col items-center justify-center gap-8 mt-20 xl:mt-0">
      <h1 className="text-2xl font-spartan text-black text-center">
        ¡Eventos para todos los gustos!
      </h1>
      <Carousel
  showThumbs={false}
  showStatus={false}
  showArrows={false}
  infiniteLoop={true}
  autoPlay={true}
  interval={3000}
  transitionTime={600}
  centerMode={true}
  centerSlidePercentage={25}
  showIndicators={false}
>
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951923/Nomadlocals/Landing/cine_mhcjjd.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="cine" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951923/Nomadlocals/Landing/baloncesto_yivlo2.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="baloncesto" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951923/Nomadlocals/Landing/Estudio_tqil81.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="estudio" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951925/Nomadlocals/Landing/paracaidismo_liey90.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="paracaidismo" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951926/Nomadlocals/Landing/restaurante_dhls56.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="restaurante" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951925/Nomadlocals/Landing/museos_g1qtaj.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="museos" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951923/Nomadlocals/Landing/fogata_vcdm7u.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="fogata" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951924/Nomadlocals/Landing/futbol11_faabet.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="futbol11" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951925/Nomadlocals/Landing/picnic_fg5dk8.webp" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="picnic" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951925/Nomadlocals/Landing/paintBall_qoguuy.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="paintball" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951925/Nomadlocals/Landing/piscina_asphew.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="piscina" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951926/Nomadlocals/Landing/videojuegos_mc6nax.jpg" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="videojuegos" />
  <img src="https://res.cloudinary.com/dwit2djhy/image/upload/v1689951926/Nomadlocals/Landing/playa_aa1hf8.png" className="w-full h-auto rounded-lg shadow-lg p-3 min-h-40 sm:w-40" alt="playa" />
</Carousel>

    </div>
  );
};

export default Recomend;
