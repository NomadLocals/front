import React, { useEffect } from "react";
import {
  getAllUsers,
  deleteUser,
  editUser,
  adminRetrieveUsers,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import Remove from "../../iconos/Remove.jsx";
import Edit from "../../iconos/Edit.jsx";
import View from "../../iconos/View.jsx";

import swal from "sweetalert";

function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;
  const navigate = useNavigate();
  console.log(userActu);

  useEffect(() => {
    dispatch(getAllUsers(userActu.id));
  }, []);

  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleEdit = (userId, userEmail, userAdmin) => {
    if (userActu.id === userId) {
      swal("No puedes editarte a ti mismo!");
    } else {
      if (userEmail === "nomad.locals01@gmail.com") {
        swal("No podes quitarle el permiso de administrador a este usuario");
      } else {
        if (!userAdmin) {
          swal({
            title: "Crear administrador",
            text: `¿Estas seguro que deseas que el usuario ${userEmail} sea administrador?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#008000",
            buttons: true,          
            closeOnConfirm: false,
            closeOnCancel: false,
          })
          .then(willDelete => {
            if (willDelete) {
              dispatch(editUser(userId, { admin: true }))
              .then(swal({
                title: "Creando administrador...",
                timer: 2000,
              }))
              location.reload(true)
            }
          })
        } else {
          swal({
            title: "Quitar administrador",
            text: `¿Estas seguro que deseas que el usuario ${userEmail} ya no sea administrador?`,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            dangerMode: true,
            buttons: true,          
            closeOnConfirm: false,
            closeOnCancel: false,
          })
          .then(async(willDelete) => {
            if (willDelete) {
              await dispatch(editUser(userId, { admin: false }))
              .then(swal({
                title: "Quitando administrador...",
                timer: 2000,
              }))
              location.reload(true)
            }
          })
        }
      }
    }
  };

  const handleDelete = async (id, userEmail, deleted, adminId) => {
    if (userActu.id === id) {
      swal("No puedes eliminarte a ti mismo");
    } else {
      if (userEmail === "nomad.locals01@gmail.com") {
        swal("No podes quitarle el permiso de administrador a este usuario");
      } else {
        if (!deleted){
        swal({
          title: "Eliminar",
          text: `¿Estas seguro que deseas eliminar al usuario ${userEmail}?`,
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          dangerMode: true,
          buttons: true,          
          closeOnConfirm: false,
          closeOnCancel: false,
        })
        .then(async(willDelete) => {
          if (willDelete) {
            await dispatch(deleteUser(id))
            .then(swal({
              title: "Eliminando...",
              timer: 2000,
            }))
            location.reload(true);
          }
        })}
          else {
            swal({
              title: "Reestablecer",
              text: `¿Estas seguro que deseas reestablecer al usuario ${userEmail}?`,
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",
              buttons: true,          
              closeOnConfirm: false,
              closeOnCancel: false,
            })
            .then(async(willDelete) => {
              if (willDelete) {
                await dispatch(adminRetrieveUsers(id, adminId))
                .then(swal({
                  title: "Reestableciendo...",
                  timer: 2000,
                }))
                window.location.reload()
              }
            })
            
          }
      }
    }
  };
  const handleViewReports = (id, reports, user) => {
    navigate(`/admin/users/reports/${id}`, { state: { reports, user } });
  };
  const handleViewReviews = (id, reviews, user) => {
    navigate(`/admin/users/reviews/${id}`, { state: { reviews, user } });
  };


  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="p-4 rounded-lg bg-gray-100 shadow-md bg-grey min-h-screen">
          <Link to="/admin">
            <button className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              Atrás
            </button>
          </Link>
          <div>
            <table className="mt-3 w-full table-auto border-collapse">
              <thead className="bg-blue text-white">
                <tr>
                  <th className="bg-blue-500  p-2">EMAIL</th>
                  <th className="bg-blue-500  p-2">IMAGEN</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    REPORTES
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    REVIEWS
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    BLOQUEADO
                  </th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    ADMINISTRADOR
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  ?.sort((a, b) => a.userName.localeCompare(b.userName))
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
                        <td className="p-2">
                          {u.email.length > 15
                            ? u.email.substring(0, 15) + "..."
                            : u.email}
                        </td>
                        <td className="p-2">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={u.image}
                            alt="No disponible"
                          />
                        </td>

                        <td className="p-2">{u.reportUser.length}</td>
                        <td
                          className={`p-2 ${
                            u.reportUser.length ? "cursor-pointer" : ""
                          }`}
                          title="Ver reportes del usuario"
                          onClick={() =>
                            handleViewReports(u.id, u.reportUser, u.email)
                          }
                        >
                          {u.reportUser.length ? <View /> : ""}
                        </td>

                        <td className="p-2 ">{u.reviewUser.length}</td>
                        <td
                          className="p-2 cursor-pointer"
                          title="Ver reviews del usuario"
                          onClick={() =>
                            handleViewReviews(u.id, u.reviewUser, u.email)
                          }
                        >
                          {u.reviewUser.length ? <View /> : ""}
                        </td>

                        <td className="p-2">
                          {u.deletedAt === null ? "NO" : "SI"}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              handleDelete(
                                u.id,
                                u.email,
                                u.deletedAt,
                                userActu.id
                              )
                            }
                            className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                            title="Eliminar usuario"
                          >
                            <Remove />
                          </button>
                        </td>
                        <td className="p-2">{u.admin ? "SÍ" : "NO"}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(u.id, u.email, u.admin)}
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                            title="Editar permisos de administrador"
                          >
                            <Edit />
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

export default AllUsers;
