import Activity from "./Activity.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserActivities } from "../../Redux trad/actions.js";

const OwnActivities = () => {
  const events = useSelector((state) => state.user.Events);
  const user = useSelector((state) => state.user);
  const userId = user.id;
  const [renderedCards, setTotalCards] = useState(3);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserActivities(userId));
  }, [events]);
  const [displayText, setDisplayText] = useState("buscar...");
  const texts = ["planear...", "crear...", "buscar..."];
  const [textIndex, setTextIndex] = useState(0);

  const handlePages = () => {
    setTotalCards(renderedCards + 3);
  };

  useEffect(() => {
    // Loop infinito para cambiar el texto cada 2 segundos
    const interval = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Mostrar progresivamente el texto
    let currentText = texts[textIndex];
    let currentLength = 0;

    const textInterval = setInterval(() => {
      setDisplayText(currentText.substring(0, currentLength));
      currentLength++;

      if (currentLength > currentText.length) {
        clearInterval(textInterval);
      }
    }, 100);

    return () => {
      clearInterval(textInterval);
    };
  }, [textIndex]);

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-1 mr-1 min-h-[250px]">
      {events && events.length > 0 ? (
        events
          .slice(0, renderedCards)
          .map(
            ({
              id,
              name,
              eventDate,
              image,
              location,
              minCost,
              minSizePeople,
              place,
            }) => {
              return (
                <Activity
                  key={id}
                  id={id}
                  name={name}
                  eventDate={eventDate.split("T")[0]}
                  image={image}
                  location={location}
                  minCost={minCost}
                  minSizePeople={minSizePeople}
                  place={place}
                />
              );
            }
          )
      ) : (
        <div className="text-center">
          <h2 className="font-quick -mb-8">
            ¡Aún no has agendado ninguna actividad! Comienza a {displayText}
          </h2>
        </div>
      )}

      {events ? (
        renderedCards < events.length ? (
          <button className="font-quick" onClick={handlePages}>
            Mostrar más...
          </button>
        ) : null
      ) : null}
    </div>
  );
};

export default OwnActivities;
