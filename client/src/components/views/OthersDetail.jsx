import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
// import ChatPersonal from "./ChatPersonal.jsx";
import { cleanComponent, getOthersById } from "../../Redux trad/actions.js";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CreatedActivities from "./CreatedActivities.jsx";

const OthersDetail = () => {
  const others = useSelector((state) => state.others);
  const { userName, image, bio } = others;
  const { id } = useParams();
  // const user = useSelector((state) => state.user);
  // const [data, setData] = useState({senderId: "", receiverId : ""});
  const dispatch = useDispatch();
  // const receiverId = id
  // const senderId = user.id

  // console.log (receiverId)
  useEffect(() => {
    dispatch(getOthersById(id));
    dispatch(cleanComponent("others"));
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
            className="text-center text-3xl font-semibold mt-3 font-spartan"
            style={{ color: "#000000" }}
          >
            {userName}
          </h2>
          <div className="mt-5">
            <h3
              className="text-xl font-semibold text-center"
              style={{ color: "#000000" }}
            >
              Bio:
            </h3>
            <p
              className="text-gray-600 mt-2 text-center"
              style={{ color: "#000000" }}
            >
              {bio}
            </p>
          </div>
          <hr className="mt-5 mb-5 border-t border-gray-400" />
          <h3
            className="text-xl font-semibold text-center"
            style={{ color: "#000000" }}
          >
            Actividades del usuario:
          </h3>
          <CreatedActivities />
          <hr className="mt-5 mb-5 border-t border-gray-400" />
          <div className="flex flex-row mt-5 justify-center">
            <div>
              {" "}
              <Link to={"/reviewuser/" + id}>
                {" "}
                <button className="rounded-lg bg-yellow p-1 font-quick m-2 border border-black-500">
                  Review
                </button>{" "}
              </Link>{" "}
            </div>
            <div>
              {" "}
              <Link to={"/reportuser/" + id}>
                {" "}
                <button className="rounded-lg bg-white p-1 font-quick m-2 border border-black-500">
                  Report
                </button>{" "}
              </Link>{" "}
            </div>
          </div>
          <Link to="/chat/personal">
            <button className="paimon mt-5">Iniciar Chat Personal</button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default OthersDetail;
