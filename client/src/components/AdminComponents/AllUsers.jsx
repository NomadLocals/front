import React, { useEffect } from "react";
import {
  getAllUsers,
  deleteUser,
  editUser,
  adminRetrieveUsers,
  resetPage,
  nextPage,
  previousPage,
  cleanComponent,
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
            icon: "warning",
            buttons: true,
            closeModel: false,
          }).then((willDelete) => {
            if (willDelete) {
              dispatch(editUser(userId, { admin: true }))
                .then(
                  swal({
                    title: "Creando administrador...",
                    timer: 2000,
                    buttons: false,
                  })
                )
                .then(() => {
                  location.reload(true);
                });
            }
          });
        } else {
          swal({
            title: "Quitar administrador",
            text: `¿Estas seguro que deseas que el usuario ${userEmail} ya no sea administrador?`,
            icon: "warning",
            dangerMode: true,
            buttons: true,
            closeModel: false,
          }).then(async (willDelete) => {
            if (willDelete) {
              await dispatch(editUser(userId, { admin: false }))
                .then(
                  swal({
                    title: "Quitando administrador...",
                    timer: 2000,
                    buttons: false,
                  })
                )
                .then(() => {
                  location.reload(true);
                });
            }
          });
        }
      }
    }
  };

  const handleDelete = async (id, userEmail, deleted, adminId) => {
    try {
      if (userActu.id === id) {
        swal("No puedes eliminarte a ti mismo");
      } else {
        if (userEmail === "nomad.locals01@gmail.com") {
          swal("No podes quitarle el permiso de administrador a este usuario");
        } else {
          if (!deleted) {
            swal({
              title: "Eliminar",
              text: `¿Estas seguro que deseas eliminar al usuario ${userEmail}?`,
              icon: "warning",
              dangerMode: true,
              buttons: true,
              closeModel: false,
            }).then(async (willDelete) => {
              if (willDelete) {
                await dispatch(deleteUser(id))
                  .then(
                    swal({
                      title: "Eliminando...",
                      timer: 1000,
                      buttons: false,
                    })
                  )
                  .then(() => {
                    location.reload(true);
                  });
              }
            });
          } else {
            swal({
              title: "Reestablecer",
              text: `¿Estas seguro que deseas reestablecer al usuario ${userEmail}?`,
              icon: "warning",
              buttons: true,
              closeModel: false,
            }).then(async (willDelete) => {
              if (willDelete) {
                await dispatch(adminRetrieveUsers(id, adminId))
                  .then(
                    swal({
                      title: "Reestableciendo...",
                      buttons: false,
                      timer: 2000,
                    })
                  )
                  .then(() => {
                    console.log("recupera");
                    location.reload(true);
                  });
              }
            });
          }
        }
      }
    } catch (error) {}
  };
  const handleViewReports = (id, reports, user) => {
    navigate(`/admin/users/reports/${id}`, { state: { reports, user } });
  };
  const handleViewReviews = (id, reviews, user) => {
    navigate(`/admin/users/reviews/${id}`, { state: { reviews, user } });
  };

  const leave = () => {
    dispatch(resetPage());
    navigate("/admin");
    dispatch(cleanComponent("allusers"));
  };
  //Manejo paginado
  const firstToShow = useSelector((state) => state.firstPage);
  const paginaActual =
    allUsers.length === 0 ? 0 : Math.ceil((firstToShow + 1) / 10);

  const pages = Math.ceil(allUsers.length / 10);
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
        <div className="p-4 rounded-lg bg-gray-100 shadow-md bg-grey min-h-screen">
          {/* <Link to="/admin"> */}
          <button
            onClick={() => leave()}
            className="text-white font-bold mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md"
          >
            Atrás
          </button>
          {/* </Link> */}

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
                {allUsers.length > 0 &&
                  allUsers
                    ?.sort((a, b) => a.userName.localeCompare(b.userName))
                    .slice(firstToShow, firstToShow + 10)
                    .map((u) => {
                      return (
                        <tr
                          key={u.id}
                          className="bg-white border-b text-center"
                        >
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
                              title="Eliminar/Recuperar usuario"
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

export default AllUsers;
