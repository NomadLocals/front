import { useSelector, useDispatch } from "react-redux";
import NavBar from "./NavBar.jsx";
import ChatPersonal from "./ChatPersonal.jsx";
import { getOthersById } from "../../Redux trad/actions.js";
import { useEffect,  } from "react";
import { Link } from "react-router-dom";

const OthersDetail = () => {

  const others = useSelector((state) => state.others);
  const { userName, image, bio, id } = others;
  
  // const user = useSelector((state) => state.user);
  // const [data, setData] = useState({senderId: "", receiverId : ""});
  const dispatch = useDispatch();
  // const receiverId = id
  // const senderId = user.id

  // console.log (receiverId)
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
              {bio}|
            </p>
          </div>

          <div className="flex flex-row mt-5 justify-center">
          <div> <Link to={"/reviewuser/" + id} > <button className="rounded-lg bg-yellow p-1 font-quick m-2 border border-black-500">Review</button> </Link> </div>
          <div> <Link to={"/reportuser/" + id} > <button className="rounded-lg bg-white p-1 font-quick m-2 border border-black-500">Report</button> </Link> </div>
          </div>
          <Link to="/chat/personal">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-5"
            >
            Iniciar Chat Personal
          </button>
            </Link>
        </div>
      </div>
    </>
  );
};

export default OthersDetail;
