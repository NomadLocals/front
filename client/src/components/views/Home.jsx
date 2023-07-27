import NavBar from "./NavBar.jsx";
import OwnActivities from "./OwnActivities.jsx";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import SuggestionCarousel from "./SuggestionCarousel.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getUserActivities, resetFilters } from "../../Redux trad/actions.js";

import { useEffect, useState } from "react";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userPlace = user.place;
  const usuarioRegistrado = useSelector((state) => state.banned);
  // const usuarioRegistrado = useSelector((state) => state.initSesion);

  useEffect(() => {
    dispatch(getUserActivities(user.id));
    dispatch(resetFilters());
  }, []);

  //Evitar ingreso de usuarios banneados:
  const [isUserSuspended, setIsUserSuspended] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está suspendido al cargar el componente
    if (usuarioRegistrado === false) {
      setIsUserSuspended(true);
    }
  }, [usuarioRegistrado]);

  if (isUserSuspended) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-grey">
        <div className="text-white text-center p-8 rounded-lg bg-blue w-2/3">
          <h2 className="text-4xl font-quick">
            Tu cuenta está suspendida. Por favor, contacta al administrador via
            mail a nomad.locals01@gmail.com
          </h2>
        </div>
      </div>
    );
  }

  //Acomodar fecha:
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  //Invertir la logica para que funcione bien!
  const isAdmin = user.admin;

  return (
    <div className="bg-grey">
      <NavBar />
      <section className="flex flex-row justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          📍 {userPlace}
        </span>
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          📆 {formattedDate}
        </span>
      </section>
      <div className="flex justify-end pr-2 md:pr-5 xl:pr-10 mt-4">
        {isAdmin ? (
          <Link to="/admin">
            <button className="text-black border-2 font-spartan p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md hover:scale-110 ease-out duration-300">
              Admin Panel
            </button>
          </Link>
        ) : (
          ""
        )}
      </div>

      <h1 className="font-quick pt-1 text-lg font-bold text-center md:text-3xl bg-grey">
        Hoy vamos a:
      </h1>
      <div className="flex flex-col items-center text-white content-around py-5 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey font-spartan text-lg md:flex-row md:justify-around">
        <Link to="/activity-form">
          <button className="p-2 rounded-lg bg-black shadow-lg border border-2 border-blue ring-1 ring-black ring-opacity-5 md:w-56 lg:w-80 lg:h-20 lg:text-2xl hover:scale-110 ease-out duration-300">
            Crea tu actividad
          </button>
        </Link>
      </div>
      <section className="pt-1 px-4 lg:pt-[80px] pb-10 lg:pb-20 bg-grey">
        <OwnActivities />
      </section>
      <section className="flex flex-col items-center pt-5 px-4 lg:pt-[80px] pb-10 lg:pb-20 bg-grey">
        <h1 className="font-quick pt-1 text-lg font-bold text-center md:text-2xl bg-grey">
          Proximamente:
        </h1>
        <SuggestionCarousel />
        <Link to="/activities">
          <button className="p-2 rounded-lg bg-black border border-2 border-blue text-white my-4 shadow-lg ring-1 ring-black ring-opacity-5 font-spartan lg:w-80 lg:h-20 lg:text-2xl hover:scale-110 ease-out duration-300">
            Encuentra una actividad
          </button>
        </Link>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
