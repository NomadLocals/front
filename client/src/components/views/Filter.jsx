import { useState, useEffect } from "react";
import NavBar from "./NavBar.jsx";
import Activities from "./Activities.jsx";
import Footer from "./Footer.jsx";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import {
  getActivities,
  getFilteredActivities,
  setFilters,
  resetFilters,
} from "../../Redux trad/actions.js";

const FilterActivities = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const handleFilterChange = (filterName, value) => {
    dispatch(setFilters({ [filterName]: value }));
  };

  useEffect(() => {
    dispatch(getFilteredActivities(filters));
  }, [filters]);

  //Fecha actual:
  const currentDate = new Date().toISOString().split("T")[0];
  const reset = () => {
    dispatch(resetFilters());
  };
  return (
    <>
      <div className="bg-grey ">
        <NavBar />
        <div className="flex flex-col justify-center items-center mt-6 gap-2 md:flex-row font-quick">
          {/* Filtro 1 */}
          <div className="relative">
            <select
              id="activityType"
              className="border border-gray-300 rounded px-2 py-1  text-xs  w-[15em]"
              defaultValue=""
              onChange={(e) =>
                handleFilterChange("activityType", e.target.value)
              }
            >
              {/* Opciones del filtro 1 */}
              <option value="" disabled hidden>
                Tipo de Actividad
              </option>
              <option value="all">Todas las actividades</option>
              <option value="teatro, cine, shows">Teatro, cine y bares</option>
              <option value="conciertos">Conciertos</option>
              <option value="restaurates y cafes">Gastronomía</option>
              <option value="deportes">Deportes</option>
              <option value="actividades outdoor">Al aire libre</option>

              <option value="deportes de equipo">Deportes de equipo</option>
              <option value="otros">Otros</option>
            </select>
          </div>
          {/* Filtro 2 */}
          <div className="relative">
            <select
              id="minCost"
              className="border border-gray-300 rounded px-2 py-1  text-xs w-[15em]"
              defaultValue=""
              onChange={(e) => handleFilterChange("minCost", e.target.value)}
            >
              {/* Opciones del filtro 2 */}
              <option value="" disabled hidden>
                Costo
              </option>
              <option value="all">Todas las actividades</option>
              <option value="free">Gratis</option>
              <option value="notFree">Con costo</option>
            </select>
          </div>
          {/* Filtro 3 */}
          <div className="relative ">
            <input
              type="date"
              id="eventDate"
              className="border border-gray-300 rounded px-2 py-1 text-xs w-[15em]"
              defaultValue=""
              onChange={(e) => handleFilterChange("eventDate", e.target.value)}
              min={currentDate}
            />
          </div>
          {/* Botón "Reset Filters"*/}

          <button
            onClick={reset}
            className="text-white font-bold p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md"
          >
            Reset Filters
          </button>
        </div>

        <Activities />
      </div>
      <Footer />
    </>
  );
};

export default FilterActivities;
