import React, { useEffect } from "react";
import NavBar from "../../views/NavBar.jsx";
import Footer from "../../views/Footer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import RoleTest from './RoleTest'
import s from "./AdminHome.module.css";

function AdminHome() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);
  const adminState = !user.admin;

  // const adminState = true
  // const adminState = false

  useEffect(() => {
    if (!adminState) {
      navigate("/home");
    }
  }, [adminState]);

  return adminState ? (
    <div>
      <NavBar />
      <div className="flex justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
        <div className="flex-column">
          <h1>Bienvenido Administrador</h1>
          {/* //Opciones */}
          <div className="mt-3 flex flex-col md:flex-row justify-between pt-2 px-2 md:px-5 xl:px-10 xl:pt-10 bg-grey">
            <button className="text-white mt-3 mr-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/users">TODOS LOS USUARIOS</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/allOrders">TODOS LAS ÓRDENES DE COMPRA</Link>
            </button>
            <button className="text-white mr-3 mt-3 p-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
              <Link to="/admin/allReviews">TODOS LAS OPINIONES</Link>
            </button>
          </div>
          {/* Graficos: */}
          <div>
            <h1>Meter los graficos aca</h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : null;
}

export default AdminHome;
