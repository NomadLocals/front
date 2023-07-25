import NavBar from "./NavBar.jsx";
import OwnActivities from "./OwnActivities.jsx";
import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import SuggestionCarousel from "./SuggestionCarousel.jsx";
import { useSelector, useDispatch } from "react-redux";
import { getUserActivities, getUserById } from "../../Redux trad/actions.js";
import { useEffect } from "react";

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userPlace = user.place;

  useEffect(() => {
    dispatch(getUserActivities(user.id));
  }, []);

  //Acomodar fecha:
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div>
      <NavBar />

      <section className="flex flex-row justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          🚩 {userPlace}
        </span>
        <span className="text-xs md:text-sm xl:text-xl bg-grey font-quick">
          📆 {formattedDate}
        </span>
      </section>
      <h1 className="font-spartan pt-5 text-lg font-bold text-center md:text-3xl bg-grey">
        Tus Actividades:
      </h1>
      <div className="flex flex-col text-white content-around py-5 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey font-spartan text-lg md:flex-row md:justify-around">
        <button className="p-2 rounded-lg bg-black shadow-lg ring-1 ring-black ring-opacity-5 md:w-56 lg:w-80 lg:h-20 lg:text-2xl">
          <Link to="/activity-form">Crea tu actividad</Link>
        </button>
      </div>
      <section className="pt-5 px-4 lg:pt-[80px] pb-10 lg:pb-20 bg-grey">
        <OwnActivities />
      </section>
      <section className="flex flex-col items-center pt-5 px-4 lg:pt-[80px] pb-10 lg:pb-20 bg-grey">
        <h1 className="font-spartan pt-5 text-lg font-bold text-center md:text-2xl bg-grey">
          Lo que se viene:
        </h1>
        <SuggestionCarousel />
        <button className="p-2 rounded-lg bg-black text-white my-4 shadow-lg ring-1 ring-black ring-opacity-5 font-spartan lg:w-80 lg:h-20 lg:text-2xl">
          <Link to="/activities">Encuentra una actividad</Link>
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
