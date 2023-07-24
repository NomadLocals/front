import React, { useEffect, useState } from "react";
import { getUsersReviewsAdmin, deleteUser } from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import Remove from "../../iconos/Remove.jsx";
import Edit from "../../iconos/Edit.jsx";
import View from "../../iconos/View.jsx";
import swal from "sweetalert";

function usersReviews() {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allUsersReviews);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();
  console.log(allReviews);

  useEffect(() => {
    dispatch(getUsersReviewsAdmin(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleDelete = async (id) => {
    if (userActu.id === id) {
      swal("No puedes eliminarte a ti mismo");
    } else {
      if (
        window.confirm(
          "¿Estás seguro que quieres eliminar este usuario? Si lo eliminas, no podrás deshacer esta acción."
        ) === true
      ) {
        dispatch(deleteUser(id));
        swal("Usuario eliminado correctamente.");
      }
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
                  <th className="bg-blue-500  p-2">TIPO DE REPORTE</th>
                  <th className="bg-blue-500  p-2">EVENTO REPORTADO</th>

                  <th className="bg-blue-500  p-2">DETALLE</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    OPCIONES
                  </th>
                </tr>
              </thead>
              <tbody>
                {allReviews
                  ?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
                        <td className="p-2">{u.createdAt.split("T")[0]}</td>
                        <td className="p-2">{u.type}</td>
                        <td className="p-2">
                          {u.reportEvent?.name
                            ? u.reportEvent.name
                            : "Eliminado"}
                        </td>

                        <td className="p-2  max-w-[300px] overflow-ellipsis overflow-hidden">
                          {u.description}
                        </td>

                        <td>
                          <button className="text-blue-500 hover:text-blue-700 focus:outline-none">
                            <Link to={`/profile/${u.idUserReporter}`}>
                              <View />
                            </Link>
                          </button>

                          <button
                            onClick={(e) => handleDelete(u.idUserReporter)}
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

export default usersReviews;
