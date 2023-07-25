import React, { useEffect } from "react";
import { deleteEvent, adminGetActivities } from "../../Redux trad/actions.js";
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
  console.log(allActivities);
  useEffect(() => {
    dispatch(adminGetActivities(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleDelete = async (id, deletedAt) => {
    if (deletedAt === null) {
      {
        swal({
          title: "Eliminar",
          text: `¿Estas seguro que deseas eliminar al evento?`,
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
            await dispatch(deleteEvent(id))
            .then(swal({
              title: "Eliminando...",
              timer: 2000,
              buttons: false,
            }))
            location.reload(true);
          }
        })}
    } else {
      swal("El evento ya se encuentra eliminado");
    }
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

  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="p-4 rounded-lg bg-gray-100 shadow-md bg-grey">
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
                            onClick={(e) => handleDelete(u.id, u.deletedAt)}
                            className="text-red-500 hover:text-red-700 focus:outline-none ml-2"
                          >
                            <Remove />
                          </button>
                        </td>
                        <td>
                          <button
                            title="Ver detalle del evento"
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() => handleViewDetail(u.id, u.deletedAt)}
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
        </div>
      ) : null}
    </div>
  );
}

export default AllEvents;
