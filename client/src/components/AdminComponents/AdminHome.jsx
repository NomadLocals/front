import React, { useEffect } from "react";
import NavBar from "../views/NavBar.jsx";
import Footer from "../views/Footer.jsx";
import EventsChart from "./Graphics/EventsChart.jsx";
import UsersChart from "./Graphics/UsersChart.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const adminState = user.admin;

  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  return adminState ? (
    <div className="">
      <NavBar />
      <div className="flex justify-center pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey font-quick">
        <div className="flex-column">
          <h1 className="text-center font-spartan text-2xl">Bienvenido Administrador</h1>
          {/* //Opciones */}
          <div className="mt-3 flex flex-col md:flex-row justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
            <button className="text-white mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/users">TODOS LOS USUARIOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/allEvents">TODOS LOS EVENTOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/eventsReports">REPORTES DE EVENTOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/usersReports">REPORTES DE USUARIOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/eventsReviews">REVIEWS DE EVENTOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/usersReviews">REVIEWS DE USUARIOS</Link>
            </button>
          </div>

          {/* Graficos: */}
          <div>
            <div>
              <h1 className="text-xl my-5">Graficos</h1>
            </div>
            <div>
              <h1>Events Chart</h1>
              <EventsChart />
            </div>
            <div>
              <h1>User Chart</h1>
              <UsersChart />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : null;
}

export default AdminHome;
