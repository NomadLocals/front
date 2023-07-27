import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.jsx";
import { getUserById } from "../../Redux trad/actions.js";
import { useEffect } from "react";
import { FcSettings } from "react-icons/fc";
import CreatedActivities from "./CreatedActivities.jsx";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { userName, image, bio } = user;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserById(user.id));
  }, [userName, bio, image]);
  return (
    <>
      <NavBar />
      <div className="bg-grey h-screen">
        <div className="max-w-lg mx-auto py-5 bg-grey rounded-lg md:shadow-md p-5 font-quick">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src={image}
            alt="Profile picture"
          />
          <h2
            className="text-center text-3xl font-semibold mt-3 font-spartan"
            style={{ color: "#000000" }}
          >
            {userName}
          </h2>

          {/* <div className="flex justify-center mt-5">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mx-3"
              style={{ color: "#5271FF" }}
            >
              Instagram
            </a>
            <a
              href="https://www.gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mx-3"
              style={{ color: "#5271FF" }}
            >
              Gmail
            </a>
            <a
              href="https://www.reddit.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 mx-3"
              style={{ color: "#5271FF" }}
            >
              Reddit
            </a>
          </div> */}
          <div className="mt-5">
            <h3
              className="text-xl font-semibold text-center"
              style={{ color: "#000000" }}
            >
              Bio:
            </h3>
            <p className="text-gray-600 mt-2 text-center" style={{ color: "#000000" }}>
            {bio}
            </p>
          </div>
          <hr className="mt-5 border-t border-gray-400" />
          <div className="mt-5 text-center">
            <h3
              className="text-xl font-semibold text-center"
              style={{ color: "#000000" }}
            >
              Tus Actividades:
            </h3>
            <CreatedActivities />
            <hr className="mt-5 mb-5 border-t border-gray-400" />
            <Link to="/settings">
              Editar perfil
            <button className="p-2">
              <FcSettings />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
