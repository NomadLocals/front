import React, { useEffect, useState } from "react";
import {
  getEventsReviewsAdmin,
  deleteEvent,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import View from "../../iconos/View.jsx";
import swal from "sweetalert";

function EventsReviews() {
  const dispatch = useDispatch();
  const allReviews = useSelector((state) => state.allEventsReviews);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();
  console.log(allReviews);

  useEffect(() => {
    dispatch(getEventsReviewsAdmin(userActu.id));
  }, []);
  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);
  const handleViewDetail = (id, deleted) => {
    if (!deleted) {
      console.log(id);
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
                  <th className="bg-blue-500  p-2">TIPO DE REVIEW</th>
                  <th className="bg-blue-500  p-2">NOMBRE DEL EVENTO </th>

                  <th className="bg-blue-500  p-2">DETALLE</th>
                  <th className="bg-blue-500  p-2">VER EVENTO</th>
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
                          {u.reviewEvent?.name
                            ? u.reviewEvent.name
                            : "Eliminado"}
                        </td>

                        <td className="p-2  max-w-[300px] overflow-ellipsis overflow-hidden">
                          {u.description}
                        </td>

                        <td>
                          <button
                            title="Ver evento"
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                            onClick={() =>
                              handleViewDetail(
                                u.reviewEvent ? u.reviewEvent?.id : "",
                                u.reviewEvent ? u.reviewEvent?.deletedAt : true
                              )
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
        </div>
      ) : null}
    </div>
  );
}

export default EventsReviews;
