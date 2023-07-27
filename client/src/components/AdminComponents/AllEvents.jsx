import React, { useEffect } from "react";
import {
  deleteEvent,
  adminGetActivities,
  deleteEventEmail,
  resetPage,
  nextPage,
  previousPage,
  cleanComponent,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";

import Remove from "../../iconos/Remove.jsx";
import View from "../../iconos/View.jsx";

import swal from "sweetalert";

// la idea es que el lapiz permita ver los reportes de ese evento

function AllEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.allActivities);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  useEffect(() => {
    dispatch(adminGetActivities(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleDelete = async (id, deletedAt, eventName, users) => {
    if (deletedAt === null) {
      {
        swal({
          title: "Eliminar",
          text: `¿Estas seguro que deseas eliminar al evento?`,
          icon: "warning",
          dangerMode: true,
          buttons: true,
          closeModel: false,
        }).then(async (willDelete) => {
          if (willDelete) {
            await dispatch(deleteEvent(id)).then(
              swal({
                title: "Eliminando...",
                timer: 2000,
                buttons: false,
              })
            );
            sendEmail(eventName, users);
            location.reload(true);
          }
        });
      }
    } else {
      swal("El evento ya se encuentra eliminado");
    }
  };
  const sendEmail = (eventName, users) => {
    console.log(eventName);
    const emails = users.map((user) => user.email);
    console.log(emails);
    emails.forEach((email) => {
      dispatch(deleteEventEmail(email, eventName));
    });
  };

  const handleViewReports = (id, reports, user) => {
    navigate(`/admin/events/allReports/${id}`, { state: { reports, user } });
  };
  const handleViewReviews = (id, reviews, user) => {
    navigate(`/admin/events/allReviews/${id}`, { state: { reviews, user } });
  };
  const handleViewDetail = (id, deleted) => {
    console.log(deleted);
    if (!deleted) {
      navigate(`/home/detail/${id}`);
    } else {
      swal("El evento ya se encuentra eliminado");
    }
  };
  const leave = () => {
    dispatch(resetPage());
    dispatch(cleanComponent("allevents"));
    navigate("/admin");
  };
  //Manejo paginado
  const firstToShow = useSelector((state) => state.firstPage);
  console.log(firstToShow);
  const paginaActual =
    allActivities.length === 0 ? 0 : Math.ceil((firstToShow + 1) / 10);

  const pages = Math.ceil(allActivities.length / 10);
  const handlePrevious = () => {
    dispatch(previousPage());
  };

  const handleNext = () => {
    dispatch(nextPage());
  };
  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="p-4 rounded-lg bg-gray-100 shadow-md bg-grey">
          <button
            onClick={() => leave()}
            className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md"
          >
            Atrás
          </button>

          <div>
            <table className="mt-3 w-full table-auto border-collapse">
              <thead className="bg-blue text-white">
                <tr>
                  <th className="bg-blue-500  p-2">FECHA</th>
                  <th className="bg-blue-500  p-2">IMAGEN</th>
                  <th className="bg-blue-500  p-2">NOMBRE</th>
                  <th className="bg-blue-500  p-2">LUGAR</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    REPORTES
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    REVIEWS
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    ACTIVO?
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    VER DETALLE
                  </th>
                </tr>
              </thead>
              <tbody>
                {allActivities.length > 0 &&
                  allActivities
                    ?.sort((a, b) => a.eventDate - b.eventDate)
                    .slice(firstToShow, firstToShow + 10)
                    .map((u) => {
                      return (
                        <tr
                          key={u.id}
                          className="bg-white border-b text-center"
                        >
                          <td className="p-2">{u.eventDate.split("T")[0]}</td>
                          <td className="p-2">
                            <img
                              className="w-12 h-12 object-cover rounded-full"
                              src={u.image}
                              alt="No disponible"
                            />
                          </td>
                          <td className="p-2">{u.name}</td>
                          {/* falta hacer el blocked en el modelo */}
                          <td className="p-2">
                            {u.place.length > 15
                              ? `${u.place.substring(0, 15)}...`
                              : u.place}
                          </td>

                          <td className="p-2">{u.reportEvent.length}</td>
                          <td
                            className={`p-2 ${
                              u.reportEvent.length ? "cursor-pointer" : ""
                            }`}
                            title="Ver reportes del evento"
                            onClick={() =>
                              handleViewReports(u.id, u.reportEvent, u.name)
                            }
                          >
                            {u.reportEvent.length ? <View /> : ""}
                          </td>

                          <td className="p-2">{u.reviewEvent.length}</td>
                          <td
                            className="p-2 cursor-pointer"
                            title="Ver reviews del evento"
                            onClick={() =>
                              handleViewReviews(u.id, u.reviewEvent, u.name)
                            }
                          >
                            {u.reviewEvent.length ? <View /> : ""}
                          </td>
                          <td className="p-2">{u.deletedAt ? "NO" : "SI"}</td>
                          <td>
                            <button
                              title="eliminar evento"
                              onClick={(e) =>
                                handleDelete(u.id, u.deletedAt, u.name, u.Users)
                              }
                              className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                            >
                              <Remove />
                            </button>
                          </td>
                          <td>
                            <button
                              title="Ver detalle del evento"
                              className="text-blue-500 hover:text-blue-700 focus:outline-none"
                              onClick={() =>
                                handleViewDetail(u.id, u.deletedAt)
                              }
                            >
                              <View />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          {/* <Pagination /> */}
          <div className="flex flex-col items-center">
            <div className="flex">
              <button
                className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md"
                onClick={handlePrevious}
              >
                Previous
              </button>
              <button
                className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md"
                onClick={handleNext}
              >
                Next
              </button>
              <p className="mt-4">
                Page {paginaActual} of {pages}
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AllEvents;
