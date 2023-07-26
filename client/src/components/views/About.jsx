import React from "react";
/* eslint no-unused-vars: "off" */
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
    <NavBar />
    <div className="bg-grey 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-spartan leading-9 text-gray-800 pb-4">Nuestra historia</h1>
                <p className="font-quick text-base leading-6 text-black">¡Bienvenidos a Nomad Locals! Nuestro objetivo es transformar la manera en que interactuamos con el mundo digital. Desde nuestro inicio, nos hemos dedicado a construir soluciones innovadoras que inspiren y eleven la experiencia de nuestros usuarios locales. <br /> <br />
                Nuestro equipo está formado por expertos apasionados y talentosos que comparten una visión común: liderar la innovación y trascender los límites establecidos. Nos enorgullecemos de nuestro enfoque centrado en el usuario local y nuestra capacidad para entregar proyectos de alta calidad en tiempo y forma. <br /> <br />
                Únete a nosotros en este emocionante viaje mientras continuamos explorando nuevos horizontes, impulsando la innovación y cambiando el mundo, un proyecto a la vez. <br /> <br />
                  ¡Gracias por ser parte de nuestra historia!
                </p>
            </div>
            <div className="w-full lg:w-8/12 ">
                <img className="w-full h-full" src="https://i.ibb.co/FhgPJt8/Rectangle-116.png" alt="A group of People" />
            </div>
        </div>

        <div className="bg-grey flex lg:flex-row flex-col justify-between gap-8 pt-12">
            <div className="w-full lg:w-5/12 flex flex-col justify-center">
                <h1 className="text-3xl lg:text-4xl font-spartan leading-9 text-gray-800 pb-4">¿Quiénes somos?</h1>
                <p className="font-quick text-base leading-6 text-black">Somos Nomad Locals, donde la pasión y el espíritu emprendedor se unen para dar forma a una emocionante travesía empresarial. Nuestra historia comienza en el corazón de la grandeza, donde un grupo de mentes creativas y visionarias se reunió con un objetivo común: crear algo único y significativo.
                
                </p>
            </div>
            <div className="font-spartan text-xl text-black text-center w-full lg:w-8/12 lg:pt-8">
              <span className="font-quick">Our </span><span className="font-spartan">Team</span>
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 lg:gap-4 md:shadow-lg md:rounded-md">
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                        <Link to="/developer" className="shadow-xl rounded-lg">
                        <img className="rounded hover:scale-110 ease-out duration-300 md:h-[110px] h-[150px] w-[250px] md:w-[300px]" src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690356478/Nomadlocals/DeveloperTeam/top-developers_vxjc4t.jpg" alt="Developer Team" />
                        <button className="font-spartan text-xl leading-5 md:text-black text-blue mt-4">Developer team</button>
                        </Link>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                     <Link to="/developer" className="shadow-xl rounded-lg">
                        <img className="rounded hover:scale-110 ease-out duration-300 md:h-[110px] h-[150px] w-[250px] md:w-[300px]" src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690356445/Nomadlocals/DeveloperTeam/lluvia-ideas-personas-reunion-trabajo_23-2148985493_v34uqn.avif" alt="Marketing Team" />
                        <p className="font-spartan text-xl leading-5 md:text-black text-blue mt-4">Marketing team</p>
                      </Link>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                    <Link to="/developer" className="shadow-xl rounded-lg">
                        <img className="rounded hover:scale-110 ease-out duration-300 md:h-[110px] h-[150px] w-[250px] md:w-[300px]" src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690356414/Nomadlocals/DeveloperTeam/hombre-elegante-traje-mostrando-dos-companeras-papel_1262-811_dljvhb.avif" alt="Administrative Team" />
                        <p className="font-spartan text-xl leading-5 md:text-black text-blue mt-4">Administrative team</p>
                    </Link>
                    </div>
                    <div className="p-4 pb-6 flex justify-center flex-col items-center">
                    <Link to="/developer" className="shadow-xl rounded-lg">
                        <img className="rounded hover:scale-110 ease-out duration-300 md:h-[110px] h-[150px] w-[250px] md:w-[300px]" src="https://res.cloudinary.com/dwit2djhy/image/upload/v1690356395/Nomadlocals/DeveloperTeam/gente-negocios-feliz-cerrando-trato_13339-12330_utajsf.avif" alt="Business relations Team" />
                        <p className="font-spartan text-xl leading-5 md:text-black text-blue mt-4">Business relations team</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer />
    </>
);
};

export default About;
