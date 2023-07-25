import React, { useEffect, useState } from "react";
import {
  getEventsReportsAdmin,
  deleteEvent,
} from "../../Redux trad/actions.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";
import swal from "sweetalert";
import { useLocation } from "react-router-dom";

function UserReviews() {
  const location = useLocation();
  const reviewsUser = location.state ? location.state.reviews : null;
  const user = location.state ? location.state.user : null;
  console.log(location.state);
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();

  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="mt-3 p-2 rounded-lg bg-gray-100 shadow-md">
          <Link to="/admin/users">
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
                </tr>
              </thead>
              <tbody>
                {reviewsUser
                  ?.sort((a, b) => a.createdAt.localeCompare(b.createdAt))
                  .map((u) => {
                    return (
                      <tr key={u.id} className="bg-white border-b text-center">
                        <td className="p-2">{u.createdAt.split("T")[0]}</td>
                        <td className="p-2">{u.type}</td>
                        <td className="p-2">{user}</td>

                        <td className="p-2  max-w-[300px] overflow-ellipsis overflow-hidden">
                          {u.description}
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

export default UserReviews;
