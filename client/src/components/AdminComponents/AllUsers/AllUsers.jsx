import React, { useEffect } from "react";
import { getAllUsers } from "../../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "../../views/NavBar.jsx";
import s from "./AllUsers.module.css";

// import { cleanData} from "../../../redux/actions/actionBooks";
// import profile from "../../../assets/images/avatar2.png";
// import Pagination from "../../CommonComponents/Pagination/Pagination";
import Remove from "../../../iconos/Remove.jsx";
import Edit from "../../../iconos/Edit.jsx";

// import swal from "sweetalert";

function AllUsers() {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const userActu = useSelector((state) => state.user);
  const adminState = !userActu.admin;
  console.log(allUsers);
  useEffect(() => {
    dispatch(getAllUsers());

    // return () => {
    //   dispatch(cleanData());
    // };
  }, []);

  const handleEdit = (e, id, administrador) => {
    e.preventDefault();
    // console.log("id es ", id, administrador);

    // if (userActu._id === id) {
    //   swal("No puedes editarte a ti mismo!");
    // } else {
    //   if (administrador !== false) {
    //     swal("No podes quitarle el permiso de administrador a este usuario");
    //   } else {
    //     dispatch(adminAnUser({ id: id, administrador: true }));
    //     swal("Ahora el usuario tiene permisos de administrador!");
    //   }
    // }
  };

  const handleDelete = async (e, id) => {
    e.preventDefault();
    // if (userActu._id === id) {
    //   swal("No puedes eliminarte a ti mismo");
    // } else {
    //   if (
    //     window.confirm(
    //       "¿Estás seguro que quieres eliminar este usuario? Si lo eliminas, no podrás deshacer esta acción."
    //     ) === true
    //   ) {
    //     dispatch(deleteUser(id));
    //     swal("Usuario eliminado correctamente.");

    //     window.location.reload();
    //   }
    // }
  };
  return (
    <div>
      <NavBar />

      {adminState ? (
        <div>
          <Link to="/admin">
            <button className="btnAtras">Atrás</button>
          </Link>
          <div className={s.container}>
            <table className="listado">
              <thead className="tituloTabla">
                <tr>
                  <th>NOMBRE</th>
                  <th>IMAGEN</th>
                  <th>EMAIL</th>
                  <th>BLOQUEADO</th>
                  <th>ADMINISTRADOR</th>
                  <th colSpan="2">OPCIONES</th>
                </tr>
              </thead>
              <tbody>
                {allUsers?.map((u) => {
                  return (
                    <tr key={u.id}>
                      <td>{u.userName}</td>
                      <td>
                        <img
                          className="image-e"
                          src={u.image}
                          alt="No disponible"
                        />
                      </td>
                      <td>{u.email}</td>
                      {/* falta hacer el blocked en el modelo */}
                      <td>{u.blocked}</td>
                      <td>{u.admin ? "SÍ" : "NO"}</td>

                      <td>
                        <button
                          onClick={(e) => handleEdit(e, u.id, u.admin)}
                          className="btn-edita"
                        >
                          {/* <Edit /> */}
                        </button>

                        <button
                          onClick={(e) => handleDelete(e, u.id)}
                          // className={s.deleteBtn}
                        >
                          {/* <Remove /> */}
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
