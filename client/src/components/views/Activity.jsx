import { Link } from "react-router-dom";

const Activity = ({
  id,
  name,
  eventDate,
  image,
  location,
  minCost,
  minSizePeople,
  place
}) => {
  return (
    <Link to={`detail/${id}`}>
      <div className="flex items-center bg-white shadow-lg rounded-lg max-h-28 mt-3 mb-1 font-quick md:min-h-[150px]">
        <div className="w-1/2 h-full">
          <img
            style={{height: "100px"}}
            src={image}
            alt="Imagen de la actividad"
            className="h-full w-full object-cover rounded-l-lg md:min-h-[150px]"
          />
        </div>
        <div className="w-1/2 h-full p-2">
          <h2 className="text-sm font-semibold mb-2">{name}</h2>
          <p className="text-xs text-gray-500 mb-2">Fecha: {eventDate}</p>
          <p className="text-xs text-gray-500">Localidad: {place} </p>
        </div>
      </div>
    </Link>
  );
};

export default Activity;
