import React, { useEffect, useState } from "react";
import {
  deleteEvent,
  editUser,
  getActivities,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";

import Remove from "../../iconos/Remove.jsx";
import Edit from "../../iconos/Edit.jsx";
import View from "../../iconos/View.jsx";

import swal from "sweetalert";

// la idea es que el lapiz permita ver los reportes de ese evento

function AllEvents() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);
  const userActu = useSelector((state) => state.user);
  const adminState = !userActu.admin;

  useEffect(() => {
    dispatch(getActivities());
  }, []);

  const handleEdit = (e, userId, userEmail, userAdmin) => {
    // e.preventDefault();
    // if (userActu.id === userId) {
    //   swal("No puedes editarte a ti mismo!");
    // } else {
    //   if (userEmail === "nomad.locals01@gmail.com") {
    //     swal("No podes quitarle el permiso de administrador a este usuario");
    //   } else {
    //     if (userAdmin === false) {
    //       dispatch(editUser(userId, { admin: true }));
    //       swal(
    //         `Ahora el usuario ${userEmail} tiene permisos de administrador!`
    //       );
    //       // window.location.reload();
    //     } else {
    //       dispatch(editUser(userId, { admin: false }));
    //       swal(
    //         `Ahora el usuario ${userEmail} ya no tiene permisos de administrador!`
    //       );
    //     }
    //   }
    // }
  };

  const handleDelete = async (e, id, userEmail) => {
    e.preventDefault();

    if (
      window.confirm(
        "¿Estás seguro que quieres eliminar este evento? Si lo eliminas, no podrás deshacer esta acción."
      ) === true
    ) {
      dispatch(deleteEvent(id));
      swal("Evento eliminado correctamente.");
    }
  };

  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="mt-3 p-2 rounded-lg bg-gray-100 shadow-md">
          <Link to="/admin">
            <button className=" mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              Atrás
            </button>
          </Link>
          <div>
            <table className="mt-3 w-full table-auto border-collapse">
              <thead className="bg-blue text-white">
                <tr>
                  <th className="bg-blue-500  p-2">FECHA</th>
                  <th className="bg-blue-500  p-2">IMAGEN</th>
                  <th className="bg-blue-500  p-2">NOMBRE</th>
                  <th className="bg-blue-500  p-2">LUGAR</th>
                  <th className="bg-blue-500  p-2">EVENTO REPORTADO?</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    OPCIONES
                  </th>
                </tr>
              </thead>
              <tbody>
                {allActivities
                  ?.sort((a, b) => a.eventDate - b.eventDate)
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
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

                        <td className="p-2">{u.admin ? "SÍ" : "NO"}</td>

                        <td>
                          <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                            {" "}
                            <Link to={`/home/detail/${u.id}`}>
                              <View />
                            </Link>
                          </button>

                          <button
                            onClick={(e) => handleDelete(e, u.id, u.email)}
                            className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                          >
                            <Remove />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          {/* <Pagination /> */}
        </div>
      ) : null}
    </div>
  );
}

export default AllEvents;
