import React from "react";
/* eslint no-unused-vars: "off" */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


const Recomend = () => {
  return (
    <div className="bg-black p-8 flex flex-col items-center justify-center gap-8 mt-20 xl:mt-0">
      <h1 className="text-2xl font-medium text-black text-center">
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
  <img src="cine.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="baloncesto.jpeg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="estudio.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="paracaidismo.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="restaurante.jpeg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="museos.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="fogata.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="futbol11.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="picnic.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="paintBall.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="piscina.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="videojuegos.jpg" className="w-40 rounded-lg shadow-lg p-3 min h-40" />
  <img src="playa.png" className="w-40 rounded-lg p-3 min h-40" />
</Carousel>

    </div>
  );
};

export default Recomend;
