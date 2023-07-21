import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.jsx";
import { getOthersById } from "../../Redux trad/actions.js";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const OthersDetail = () => {
  const { id } = useParams();

  const others = useSelector((state) => state.others);

  const { userName, image, bio } = others;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOthersById(id));
  }, []);

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
            className="text-center text-2xl font-semibold mt-3"
            style={{ color: "#000000" }}
          >
            {userName}
          </h2>

          <div className="flex justify-center mt-5">
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
          </div>
          <div className="mt-5">
            <h3
              className="text-xl font-semibold text-center"
              style={{ color: "#000000" }}
            >
              Bio:
            </h3>
            <p className="text-gray-600 mt-2" style={{ color: "#000000" }}>
              {bio}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OthersDetail;