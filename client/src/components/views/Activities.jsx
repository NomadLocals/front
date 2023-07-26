import Activity from "./Activity.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getUserActivities } from "../../Redux trad/actions.js";
import Footer from "./Footer.jsx";

const Activities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  useEffect(() => {
    dispatch(getUserActivities(user.id));
  }, [dispatch]);

  const [renderedCards, setTotalCards] = useState(3);
  const user = useSelector((state) => state.user);
  const userLocation = user.geolocation;

  function calcularDistancia(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radio de la Tierra en kilómetros
    let dLat = (lat2 - lat1) * (Math.PI / 180);
    let dLon = (lon2 - lon1) * (Math.PI / 180);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distancia = R * c;
    return distancia;
  }

  // Coordenadas del userLocation
  let userLat = userLocation && userLocation.lat ? userLocation.lat : null;
  let userLon = userLocation && userLocation.lng ? userLocation.lng : null;

  // Calcular la distancia entre el userLocation y cada ubicación en eventLocations
  useEffect(() => {
    if (userLat !== null && userLon !== null) {
      activities.forEach(function (act) {
        let eventLat = act.location.lat;
        let eventLon = act.location.lng;
        let distancia = calcularDistancia(userLat, userLon, eventLat, eventLon);
        act.distancia = distancia;
      });
    }
  }, [userLat, userLon, activities]);

  const handlePages = () => {
    setTotalCards(renderedCards + 3);
  };

  return (
    <div className="grid items-center py-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-1 mr-1 min-h-[250px] md:min-h-[500px]">
      {activities.length > 0 ? (
        activities
          .sort(function (a, b) {
            return a.distancia - b.distancia;
          })
          .slice(0, renderedCards)
          .map(
            ({ id, name, eventDate, image, minCost, minSizePeople, place }) => {
              return (
                <Activity
                  key={id}
                  id={id}
                  name={name}
                  eventDate={eventDate.split("T")[0]}
                  image={image}
                  minCost={minCost}
                  minSizePeople={minSizePeople}
                  place={place}
                />
              );
            }
          )
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[250px]">
          <h2 className="font-quick text-center mb-4">
            No hay actividades cerca de tu zona
          </h2>
        </div>
      )}
      {renderedCards <= activities.length ? (
        <button className="font-quick" onClick={handlePages}>
          Mostrar más...
        </button>
      ) : null}
    </div>
  );
};

export default Activities;
