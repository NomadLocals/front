import React, { useEffect } from "react";
import {
  getEventsReportsAdmin,
  deleteEvent,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import Remove from "../../iconos/Remove.jsx";

import View from "../../iconos/View.jsx";
import swal from "sweetalert";

function EventsReports() {
  const dispatch = useDispatch();
  const allReports = useSelector((state) => state.allEventsReports);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();
  console.log(allReports);

  useEffect(() => {
    dispatch(getEventsReportsAdmin(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  const handleDelete = async (id, deleted) => {
    if (!deleted) {
      if (
        window.confirm(
          "¿Estás seguro que quieres eliminar este evento? Si lo eliminas, no podrás deshacer esta acción."
        ) === true
      ) {
        dispatch(deleteEvent(id));
        swal("El evento eliminado correctamente.");
      }
    } else {
      swal("Evento ya se encuentra eliminado");
    }
  };

  const handleViewDetail = (id, deleted) => {
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
                  <th className="bg-blue-500  p-2">EVENTO REPORTADO</th>

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
                          {u.reportEvent?.name
                            ? u.reportEvent.name
                            : "Evento eliminado"}
                        </td>

                        <td className="p-2  max-w-[300px] overflow-ellipsis overflow-hidden">
                          {u.description}
                        </td>

                        <td>
                          <button
                            title="Ver detalle del evento"
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() =>
                              handleViewDetail(
                                u.reportEvent ? u.reportEvent?.id : "",
                                u.reportEvent ? u.reportEvent?.deletedAt : true
                              )
                            }
                          >
                            <View />
                          </button>

                          <button
                            title="Borrar evento"
                            onClick={(e) =>
                              handleDelete(
                                u.reportEvent ? u.reportEvent?.id : "",
                                u.reportEvent ? u.reportEvent?.deletedAt : true
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

export default EventsReports;
