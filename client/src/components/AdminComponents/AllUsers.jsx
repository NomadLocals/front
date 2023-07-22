import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser, editUser } from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";

// import { cleanData} from "../../../redux/actions/actionBooks";
// import profile from "../../../assets/images/avatar2.png";
// import Pagination from "../../CommonComponents/Pagination/Pagination";
import Remove from "../../iconos/Remove.jsx";
import Edit from "../../iconos/Edit.jsx";

import swal from "sweetalert";

function AllUsers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const userActu = useSelector((state) => state.user);
  const adminState = !userActu.admin;

  console.log(allUsers);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleEdit = (e, userId, userEmail, userAdmin) => {
    // e.preventDefault();

    if (userActu.id === userId) {
      swal("No puedes editarte a ti mismo!");
    } else {
      if (userEmail === "nomad.locals01@gmail.com") {
        swal("No podes quitarle el permiso de administrador a este usuario");
      } else {
        if (userAdmin === false) {
          dispatch(editUser(userId, { admin: true }));
          swal(
            `Ahora el usuario ${userEmail} tiene permisos de administrador!`
          );
          // window.location.reload();
        } else {
          dispatch(editUser(userId, { admin: false }));

          swal(
            `Ahora el usuario ${userEmail} ya no tiene permisos de administrador!`
          );
        }
      }
    }
  };

  const handleDelete = async (e, id, userEmail) => {
    e.preventDefault();

    if (userActu.id === id) {
      swal("No puedes eliminarte a ti mismo");
    } else {
      if (userEmail === "nomad.locals01@gmail.com") {
        swal("No podes quitarle el permiso de administrador a este usuario");
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
                  <th className="bg-blue-500  p-2">NOMBRE</th>
                  <th className="bg-blue-500  p-2">IMAGEN</th>
                  <th className="bg-blue-500  p-2">EMAIL</th>
                  <th className="bg-blue-500  p-2">BLOQUEADO</th>
                  <th className="bg-blue-500  p-2">ADMINISTRADOR</th>
                  <th className="bg-blue-500  p-2" colSpan="2">
                    OPCIONES
                  </th>
                </tr>
              </thead>
              <tbody>
                {allUsers
                  ?.sort((a, b) => a.userName.localeCompare(b.userName))
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
                        <td className="p-2">{u.userName}</td>
                        <td className="p-2">
                          <img
                            className="w-12 h-12 object-cover rounded-full"
                            src={u.image}
                            alt="No disponible"
                          />
                        </td>
                        <td className="p-2">{u.email}</td>
                        {/* falta hacer el blocked en el modelo */}
                        <td className="p-2">
                          {u.deletedAt === null ? "NO" : "SI"}
                        </td>
                        <td className="p-2">{u.admin ? "SÍ" : "NO"}</td>

                        <td>
                          <button
                            onClick={(e) =>
                              handleEdit(e, u.id, u.email, u.admin)
                            }
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          >
                            <Edit />
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

export default AllUsers;
