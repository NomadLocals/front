import Activity from "./Activity.jsx";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";


const CreatedActivities = () => {
  const {id} = useParams()
  const events = useSelector((state) => state.activities);
  const activities = events.filter((event) => event.userId === id);
  
  //crear estado global alternativo para renderizar actividades totales.
  return (
    <div className="bg-grey grid grid-cols-1 sm:grid-cols-2 md:flex md:justify-center gap-4 ml-1 mr-1 mt-3 " >
      <Carousel
        showThumbs={false}
        showStatus={false}
        showArrows={true}
        infiniteLoop={true}
        autoPlay={true}
        interval={6000}
        transitionTime={600}
        centerMode={true}
        centerSlidePercentage={100}
        showIndicators={false}
        className="md:m-auto md:max-w-[500px]"
      >
        {activities.length > 0 ? (
          activities
            .map(
              ({
                id,
                name,
                eventDate,
                image,
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
                    minCost={minCost}
                    minSizePeople={minSizePeople}
                    place={place}
                  />
                );
              }
            )
        ) : (
          <div>
            <h2 className="font-quick">El usuario no tiene actividades creadas</h2>
          </div>
        )}
      </Carousel>
    </div>
  );
};

export default CreatedActivities;
