import MapSelect from "./Map";
import NavBar from "./NavBar";
import Footer from "./Footer";
import React, { useState, useEffect } from "react";
/* eslint no-unused-vars: "off" */
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  postEvent,
  getActivities,
  getUserActivities,
  deleteImage,
} from "../../Redux trad/actions.js";
import Images from "../Images.jsx";

export default function ActivityForm() {
  const location = useSelector((state) => state.eventLocation);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const place = useSelector((state) => state.placeName);
  const image = useSelector((state) => state.activityImage);
  const userId = user.id;
  const dispatch = useDispatch();

  const [activityData, setActivityData] = useState({
    userId: userId,
    name: "",
    description: "",
    eventDate: "",
    duration: "00:00",
    minCost: "0",
    location: location,
    place: place,
    minSizePeople: "0",
    active: true,
    activityType: "",
    image: "",
  });

  const [errors, setErrors] = useState("");

  useEffect(() => {
    dispatch(deleteImage());
  }, []);

  useEffect(() => {
    setActivityData({
      ...activityData,
      image: image,
    });
  }, [image]);

  useEffect(() => {
    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      place: place,
    }));
  }, [place]);

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (property === "eventDate") {
      const selectedDate = new Date(value);
      const currentDate = new Date();

      // Verificar si la fecha seleccionada es anterior a la fecha actual
      if (selectedDate < currentDate) {
        value = currentDate.toISOString().slice(0, 16); // Establecer la fecha actual
      }
    }

    setActivityData((prevActivityData) => ({
      ...prevActivityData,
      [property]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (activityData.name.trim() === "" || activityData.name.length < 2) {
      setErrors("Se requieren al menos 2 caracteres en el nombre");
      isValid = false;
    }
    if (activityData.eventDate === "") {
      setErrors("Se requiere la fecha y hora de inicio de la actividad");
      isValid = false;
    }
    if (activityData.description.trim() === "") {
      setErrors("Se requiere una descripción");
      isValid = false;
    }
    if (activityData.activityType.trim() === "") {
      setErrors("Se requiere seleccionar el tipo de actividad");
      isValid = false;
    }
    if (activityData.duration.trim() === "") {
      setErrors("Se requiere duracion de la actividad");
      isValid = false;
    }
    if (activityData.image === "") {
      setErrors("Se requiere imagen");
      isValid = false;
    }

    if (isValid) {
      try {
        dispatch(postEvent(activityData, user.userName, user.email));
        dispatch(getUserActivities(userId));
        setActivityData({
          userId: userId,
          name: "",
          description: "",
          eventDate: "",
          duration: "",
          minCost: "0",
          location: "",
          place: place,
          minSizePeople: "0",
          active: true,
          activityType: "",
          image: image,
        });
        setErrors("");
        dispatch(getActivities());
        navigate("/home");
      } catch (error) {
        console.log(error);
        setErrors("Error al crear la actividad");
      }
    }
  };
  //este codigo es para que traiga la zona horaria local
  const currentDate = new Date()
    .toLocaleString("es-ES", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour12: false,
    })
    .slice(0, 16);

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen from-teal-100 bg-grey font-quick">
        <div className="w-full max-w-lg px-10 py-8 my-10 mx-auto rounded-lg shadow-xl">
          <div className="max-w-md mx-auto space-y-6">
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-spartan">¡Crea tu actividad!</h2>
              <p className="my-4 opacity-70 font-quick">
                Publica tu actividad para reunirte con la comunidad.
              </p>
              <hr className="my-6" />
              <label className="uppercase text-sm font-bold opacity-70">
                Titulo
              </label>
              <input
                name="name"
                type="text"
                className="p-3 mt-2 mb-4 w-full text-black font-quick rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
                placeholder="¿Cómo llamaras a tu actividad?"
                value={activityData.name}
                onChange={handleChange}
              />
              <label className="uppercase text-sm font-spartan opacity-70">
                Descripción
              </label>
              <textarea
                name="description"
                type="text"
                className="p-3 mt-2 mb-4 w-full  text-black font-quick rounded  border border-slate-200 focus:border-slate-600 focus:outline-none"
                placeholder="Describe tu actividad: "
                value={activityData.description}
                onChange={handleChange}
              ></textarea>
              <label className="uppercase text-sm font-spartan opacity-70">
                Fecha
              </label>
              <input
                type="datetime-local"
                value={activityData.eventDate}
                id="released"
                name="eventDate"
                min={currentDate}
                onChange={handleChange}
                className="p-3 mt-2 mb-4 w-full text-black font-quick rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
              />
              <label className="uppercase text-sm font-bold opacity-70">
                Tipo de Actividad
              </label>
              <select
                value={activityData.activityType}
                name="activityType"
                onChange={handleChange}
                className="w-full p-3 mt-2 mb-4 w-full text-black font-quick rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
              >
                <option value="" defaultValue disabled>
                  Elige el tipo de actividad
                </option>
                <option value="teatro, cine, shows">
                  Teatro, cine y bares
                </option>

                <option value="conciertos">Conciertos</option>
                <option value="restaurates y cafes">Restaurates y cafés</option>
                <option value="deportes">Deportes</option>
                <option value="actividades outdoor">Al aire libre</option>

                <option value="deportes de equipo">Deportes de equipo</option>

                <option value="otros">Otros</option>
              </select>

              {/* <label className="uppercase text-sm font-spartan opacity-70">
                Duración
              </label>
              <input
                placeholder="ej: 2:00"
                name="duration"
                value={activityData.duration}
                onChange={handleChange}
                type="string"
                className="bg-grey text-black font-spartan p-3 mt-2 mb-4 w-full rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
              />
              <label className="uppercase text-sm font-spartan opacity-70">
                Cantidad de personas
              </label>
              <input
                placeholder="0"
                name="minSizePeople"
                value={activityData.minSizePeople}
                onChange={handleChange}
                type="number"
                min="0"
                max="99"
                className="bg-grey text-black font-quick p-3 mt-2 mb-4 w-full bg-slate-200 rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
              />
              <label className="uppercase text-sm font-spartan opacity-70">
                Presupuesto minimo
              </label>

              <input
                placeholder="0"
                name="minCost"
                value={activityData.minCost}
                onChange={handleChange}
                type="number"
                min="0"
                max="99999"
                className="bg-grey text-black font-quick p-3 mt-2 mb-4 w-full rounded border border-slate-200 focus:border-slate-600 focus:outline-none"
              /> */}

              {/* <label className="uppercase text-sm font-bold opacity-70">
                Imagen
              </label>
              <input
                placeholder="URL de imagen"
                type="text"
                name="image"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                value={activityData.image}
                onChange={handleChange}
              /> */}

              <label className="uppercase text-sm font-bold opacity-70">
                Duración
              </label>
              <input
                placeholder="ej: 2:00"
                name="duration"
                value={activityData.duration}
                onChange={handleChange}
                type="time"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
              />
              <label className="uppercase text-sm font-bold opacity-70">
                Cantidad de personas
              </label>
              <input
                placeholder="0"
                name="minSizePeople"
                value={activityData.minSizePeople}
                onChange={handleChange}
                type="number"
                min="0"
                max="99"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
              />
              <label className="uppercase text-sm font-bold opacity-70">
                Presupuesto minimo
              </label>

              <input
                placeholder="0"
                name="minCost"
                value={activityData.minCost}
                onChange={handleChange}
                type="number"
                min="0"
                max="99999"
                className="p-3 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
              />

              <label className="uppercase text-sm font-bold opacity-70">
                Imagen
              </label>
              <Images
                setImage={(url) =>
                  setActivityData({ ...activityData, image: url })
                }
              />

              <label className="uppercase text-sm font-spartan opacity-70">
                Lugar
              </label>
              <div>
                <MapSelect />
              </div>
              {errors && (
                <span className="text-blue bg-yellow"> {errors} </span>
              )}
              <div className="text-center mt-5 flex justify-center">
                <button
                  style={{ width: "80px", margin: "0" }}
                  className="paimon"
                >
                  Crear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
