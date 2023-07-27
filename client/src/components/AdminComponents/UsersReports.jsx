import React, { useEffect } from "react";
import { getUsersReportsAdmin, deleteUser } from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import Remove from "../../iconos/Remove.jsx";

import View from "../../iconos/View.jsx";
import swal from "sweetalert";

function UsersReports() {
  const dispatch = useDispatch();
  const allReports = useSelector((state) => state.allUsersReports);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersReportsAdmin(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleDelete = async (id, deleted) => {
    if (userActu.id === id) {
      swal("No puedes eliminarte a ti mismo");
    } else {
      if (!deleted) {
        if (
          window.confirm(
            "¿Estás seguro que quieres eliminar este usuario? Si lo eliminas, no podrás deshacer esta acción."
          ) === true
        ) {
          dispatch(deleteUser(id));
          swal("Usuario eliminado correctamente.");
        }
      } else {
        swal(
          "El usuario ya se encuentra eliminado, puedes restaurarlo desde el panel de Usuarios"
        );
      }
    }
  };

  const handleViewDetail = (id, deleted) => {
    console.log(id);
    if (!deleted) {
      navigate(`/others/${id}`);
    } else {
      swal(
        "El usuario se encuentra eliminado, puedes restaurarlo desde el panel de Usuarios"
      );
    }
  };

  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="p-4 rounded-lg bg-grey min-h-screen shadow-md">
          <Link to="/admin">
            <button className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              Atrás
            </button>
          </Link>
          <div>
            <table className="mt-3 w-full table-auto border-collapse">
              <thead className="bg-blue text-white">
                <tr>
                  <th className="bg-blue-500  p-2">FECHA</th>
                  <th className="bg-blue-500  p-2">TIPO DE REPORTE</th>
                  <th className="bg-blue-500  p-2">USUARIO REPORTADO</th>
                  <th className="bg-blue-500  p-2">DETALLE</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    OPCIONES
                  </th>
                </tr>
              </thead>
              <tbody>
                {allReports
                  ?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
                        <td className="p-2">{u.createdAt.split("T")[0]}</td>
                        <td className="p-2">{u.type}</td>
                        <td className="p-2">
                          {u.reportUser ? u.reportUser.email : "Eliminado"}
                        </td>

                        <td className="p-2  max-w-[300px] overflow-ellipsis overflow-hidden">
                          {u.description}
                        </td>

                        <td>
                          <button
                            title="Ver perfil del usuario"
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() =>
                              handleViewDetail(
                                u.reportUser ? u.reportUser?.id : "",
                                u.reportUser ? u.reportUser?.deletedAt : true
                              )
                            }
                          >
                            <View />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                u.idUserReporter,
                                u.reportEvent ? u.reportUser?.deletedAt : true
                              )
                            }
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

export default UsersReports;
