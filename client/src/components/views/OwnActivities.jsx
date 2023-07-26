import Activity from "./Activity.jsx";
import { useSelector } from "react-redux";
import { useState } from "react";

const OwnActivities = () => {
  const events = useSelector((state) => state.user.Events);
  const [renderedCards, setTotalCards] = useState(3);

  const handlePages = () => {
    setTotalCards(renderedCards + 3);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-1 mr-1 min-h-[250px]">
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
        <div>
          <h2 className="text-center font-quick">
            ¡Aún no has agendado ninguna actividad! Comienza a buscar...
          </h2>
        </div>
      )}

      {events ? (
        renderedCards < events.length ? (
          <button className="font-quick" onClick={handlePages}>Mostrar más...</button>
        ) : null
      ) : null}
    </div>
  );
};

export default OwnActivities;
