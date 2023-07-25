import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./NavBar.jsx";
import Chat from "./Chat.jsx"; // Nuevo componente de chat
import StarRating from "./StarRating.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivityDetail,
  suscribeEvent,
  unsuscribeEvent,
  getHistorialMessages,
  clearChatHistory,
} from "../../Redux trad/actions.js";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  //Estados globales
  const user = useSelector((state) => state.user);
  const activityDetail = useSelector((state) => state.eventById);
  const [showUsers, setShowUsers] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState([{}]);
  const userId = user.id;
  const userName = user.userName;
  const userImage = user.image;
  const isAdmin = user.admin;
  const {
    name,
    activityType,
    image,
    description,
    eventDate,
    duration,
    minSizePeople,
    minCost,
    Users,
    place,
  } = activityDetail;

  useEffect(() => {
    dispatch(getActivityDetail(id));
    setJoinedUsers(Users);
  }, [id, joinedUsers, showChat]);

  //handlers para sumarse o salir de la actividad
  const handleJoinGroup = () => {
    setShowChat(true);
    setShowUsers(true);
    try {
      dispatch(suscribeEvent(id, userId));
      setJoinedUsers([...joinedUsers, { userName, userImage }]);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLeaveGroup = () => {
    setShowChat(false);
    setShowUsers(false);
    // Crear una copia del estado actual de joinedUsers
    try {
      dispatch(unsuscribeEvent(id, userId));
      setJoinedUsers(joinedUsers.filter((user) => user.userName !== userName));
      dispatch(clearChatHistory());
    } catch (error) {
      console.log(error);
    }
  };

  //para correcta renderizacion del chat->
  useEffect(() => {
    dispatch(getHistorialMessages(id));
    const joined = async () => {
      try {
        const isJoined = await Users.some((user) => user.id === userId);
        setShowChat(isJoined);
        setShowUsers(isJoined);
      } catch (error) {
        // console.error(error);
      }
    };
    joined();
  }, [Users]);

  //formateo de fecha:
  let formattedDate = "";
  let formattedTime = "";
  if (activityDetail.eventDate) {
    const parts = eventDate.split("T")[0].split("-");
    const date = new Date(activityDetail.eventDate);
    formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
  }

  return (
    <>
      <Navbar />
      <div className="bg-grey min-h-screen">
        <div className="max-w-md mx-auto bg-grey shadow-md rounded-lg overflow-hidden py-8 font-quick rounded-lg shadow-xl">
          <img
            src={image}
            alt={name}
            className="h-48 w-full object-cover rounded-lg"
          />
          <div>
            {isAdmin ? (
              <div className="flex justify-center px-2 md:pr-5 xl:pr-10 mt-4">
                <button className="text-white p-2 text-sm md:text-xl rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
                  <Link to="/admin/allEvents">Panel Eventos</Link>
                </button>
                <button className="text-white p-2 text-sm md:text-xl mx-2 rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
                  <Link to="/admin/eventsReports">Panel Reportes</Link>
                </button>
                <button className="text-white p-2 text-sm md:text-xl  rounded-lg bg-blue shadow-lg ring-1 ring-black ring-opacity-5 max-w-md">
                  <Link to="/admin/eventsReviews">Panel Reviews</Link>
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2 text-center font-quick">
              {name}
            </h2>
            <h2 className="text-center mb-2 font-semibold ">{activityType}</h2>

            <div className="flex flex-wrap">
              <div className="w-1/2">
                <p>
                  Fecha: <span className="font-semibold">{formattedDate}</span>
                </p>
                <p>
                  Hora:{" "}
                  <span className="font-semibold">{formattedTime}hs.</span>
                </p>
                <p>
                  Duración: <span className="font-semibold">{duration}hs.</span>
                </p>
              </div>
              <div className="w-1/2 text-center flex flex-col justify-center">
                <span>
                  {minCost === 0 ? (
                    <p>Coste: Free</p>
                  ) : (
                    <p>Coste: ${minCost}</p>
                  )}
                </span>
                <p>
                  Personas(min):{" "}
                  <span className="font-semibold">{minSizePeople}</span>
                </p>
              </div>
            </div>
            <p className="mb-4">
              Localidad: <span className="font-semibold">{place}</span>
            </p>
            <p className="mb-4 text-sm text-center">
              Descripción: {description}
            </p>
            {/* <StarRating /> */}

            <h3 className="text-lg font-semibold mb-2 text-center">Miembros</h3>
            {showUsers && (
              <div className="flex flex-wrap">
                {Users
                  ? Users?.map(({ userName, image, id }) => {
                      return (
                        <div
                          key={id}
                          className="flex flex-col items-center mb-4 mr-3 mt-2"
                        >
                          <Link
                            to={
                              userId === id ? `/profile/${id}` : `/others/${id}`
                            }
                          >
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                              <img
                                src={image}
                                alt="Imagen de miembro"
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </Link>
                          <p className="mt-2 text-center text-xs">{userName}</p>
                        </div>
                      );
                    })
                  : null}
              </div>
            )}

            {showChat && <Chat />}
            <div className="flex justify-center">
              {!showChat ? (
                <button
                  className="mt-2 bg-blue text-sm font-semibold leading-6 text-white bg-black rounded-md py-1.5 px-4 shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  onClick={handleJoinGroup}
                >
                  Entrar a la actividad
                </button>
              ) : (
                <button
                  className="mt-2 bg-blue text-sm font-semibold leading-6 text-white bg-black rounded-md py-1.5 px-4 shadow-sm ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  onClick={handleLeaveGroup}
                >
                  Salir de la actividad
                </button>
              )}
            </div>
            <div className="flex flex-row mt-5 justify-center">
              <div>
                {" "}
                <Link to={"/reviewevent/" + id}>
                  {" "}
                  <button className="rounded-lg bg-yellow p-1 font-quick m-2 border border-black-500">
                    Review
                  </button>{" "}
                </Link>{" "}
              </div>
              <div>
                {" "}
                <Link to={"/report/" + id}>
                  {" "}
                  <button className="rounded-lg bg-white p-1 font-quick m-2 border border-black-500">
                    Report
                  </button>{" "}
                </Link>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
