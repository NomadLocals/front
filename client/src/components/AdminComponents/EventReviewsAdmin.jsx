import React, { useEffect } from "react";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../views/NavBar.jsx";

import { useLocation } from "react-router-dom";

function EventReviewsAdmin() {
  const location = useLocation();
  const reviewsUser = location.state ? location.state.reviews : null;
  const user = location.state ? location.state.user : null;
  const userActu = useSelector((state) => state.user);
  const adminState = userActu.admin;

  const navigate = useNavigate();

  const average = (events) => {
    let scores = [];
    for (let i = 0; i < events.length; i++) {
      scores.push(events[i].score);
    }
    const suma = scores.reduce((total, num) => total + num, 0);
    return suma / scores.length;
  };

  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  return (
    <div>
      <NavBar />

      {adminState ? (
        <div className="p-4 rounded-lg bg-grey min-h-screen shadow-md">
          <div className="flex justify-between items-center">
            <Link to="/admin/allEvents">
              <button className=" mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md text-white font-bold">
                Atrás
              </button>
            </Link>
            <div className=" mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <h3 className="text-white font-bold text-xl">Score Promedio</h3>
              <h3 className="text-white text-3xl text-center">
                ⭐{average(reviewsUser)}
              </h3>
            </div>
          </div>
          <div>
            <table className="mt-3 w-full table-auto border-collapse">
              <thead className="bg-blue text-white">
                <tr>
                  <th className="bg-blue-500  p-2">FECHA</th>
                  <th className="bg-blue-500  p-2">TIPO DE REVIEW</th>
                  <th className="bg-blue-500  p-2">EVENTO</th>

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

export default EventReviewsAdmin;
